import FfmpegCommand from "fluent-ffmpeg";
import ffprobe from "ffprobe-static";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import Promise from "bluebird";
import _ from "lodash";
import del from "del";

export default class VideoThumbnail {

  constructor(opts) {
    FfmpegCommand.setFfmpegPath(ffmpegInstaller.path);
    FfmpegCommand.setFfprobePath(ffprobe.path);

    this.sourcePath = opts.sourcePath;
    this.thumbnailPath = opts.thumbnailPath;
    this.percent = `${opts.percent}%` || "90%";
    this.logger = opts.logger || null;
    this.size = opts.size || "320x240";
    this.fileNameFormat = "%b-thumbnail-%r-%000i";
    this.tmpDir = opts.tmpDir || "/tmp";

    // by include deps here, it is easier to mock them out
    this.FfmpegCommand = FfmpegCommand;
    this.del = del;
  }


  getFfmpegInstance() {
    return new this.FfmpegCommand({
      source: this.sourcePath,
      logger: this.logger
    });
  }

  /**
   * Method to generate one thumbnail by being given a percentage value.
   */
  generateOneByPercent(percent, opts) {
    if (percent < 0 || percent > 100) {
      return Promise.reject(new Error("Percent must be a value from 0-100"));
    }

    return this.generate(
      _.assignIn(opts, {
        count: 1,
        timestamps: [`${percent}%`]
      })
    ).then(result => result.pop());
  }

  /**
   * Method to generate one thumbnail by being given a percentage value.
   *
   */
  generateOneByPercentCb(percent, opts, cb) {
    const callback = cb || opts;

    this.generateOneByPercent(percent, opts)
      .then(result => callback(null, result))
      .catch(callback);
  }

  /**
   * Method to generate thumbnails
   *
   */
  generate(opts) {
    const defaultSettings = {
      folder: this.thumbnailPath,
      count: 10,
      size: this.size,
      filename: this.fileNameFormat,
      logger: this.logger
    };

    const ffmpeg = this.getFfmpegInstance();
    const settings = _.assignIn(defaultSettings, opts);
    let filenameArray = [];

    return new Promise((resolve, reject) => {
      function complete() {
        resolve(filenameArray);
      }

      function filenames(fns) {
        filenameArray = fns;
      }

      ffmpeg
        .on("filenames", filenames)
        .on("end", complete)
        .on("error", reject)
        .screenshots(settings);
    });
  }

  /**
   * Method to generate thumbnails
   *
   */
  generateCb(opts, cb) {
    const callback = cb || opts;

    this.generate(opts)
      .then(result => callback(null, result))
      .catch(callback);
  }

  /**
   * Method to generate the palette from a video (required for creating gifs)
   *
   */
  generatePalette(opts) {
    const ffmpeg = this.getFfmpegInstance();
    const defaultOpts = {
      videoFilters: "fps=10,scale=320:-1:flags=lanczos,palettegen"
    };
    const conf = _.assignIn(defaultOpts, opts);
    const inputOptions = ["-y"];
    const outputOptions = [`-vf ${conf.videoFilters}`];
    const output = `${this.tmpDir}/palette-${Date.now()}.png`;

    return new Promise((resolve, reject) => {
      function complete() {
        resolve(output);
      }

      if (conf.offset) {
        inputOptions.push(`-ss ${conf.offset}`);
      }

      if (conf.duration) {
        inputOptions.push(`-t ${conf.duration}`);
      }

      ffmpeg
        .inputOptions(inputOptions)
        .outputOptions(outputOptions)
        .on("end", complete)
        .on("error", reject)
        .output(output)
        .run();
    });
  }
  /**
   * Method to generate the palette from a video (required for creating gifs)
   */
  generatePaletteCb(opts, cb) {
    const callback = cb || opts;

    this.generatePalette(opts)
      .then(result => callback(null, result))
      .catch(callback);
  }

  /**
   * Method to create a short gif thumbnail from an mp4 video
   */
  generateGif(opts) {
    const ffmpeg = this.getFfmpegInstance();
    const defaultOpts = {
      fps: 0.75,
      scale: 180,
      speedMultiplier: 4,
      deletePalette: true
    };
    const conf = _.assignIn(defaultOpts, opts);
    const inputOptions = [];
    const outputOptions = [
      `-filter_complex fps=${conf.fps},setpts=(1/${conf.speedMultiplier})*PTS,scale=${conf.scale}:-1:flags=lanczos[x];[x][1:v]paletteuse`
    ];
    const outputFileName = conf.fileName || `video-${Date.now()}.gif`;
    const output = `${this.thumbnailPath}/${outputFileName}`;
    const d = this.del;

    function createGif(paletteFilePath) {
      if (conf.offset) {
        inputOptions.push(`-ss ${conf.offset}`);
      }

      if (conf.duration) {
        inputOptions.push(`-t ${conf.duration}`);
      }

      return new Promise((resolve, reject) => {
        outputOptions.unshift(`-i ${paletteFilePath}`);

        function complete() {
          if (conf.deletePalette === true) {
            d.sync([paletteFilePath], {
              force: true
            });
          }
          resolve(output);
        }

        ffmpeg
          .inputOptions(inputOptions)
          .outputOptions(outputOptions)
          .on("end", complete)
          .on("error", reject)
          .output(output)
          .run();
      });
    }

    return this.generatePalette().then(createGif);
  }

  /**
   * Method to create a short gif thumbnail from an mp4 video
   *
   */
  generateGifCb(opts, cb) {
    const callback = cb || opts;

    this.generateGif(opts)
      .then(result => callback(null, result))
      .catch(callback);
  }
}
