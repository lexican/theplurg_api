import fs from "fs";
import appRoot from "app-root-path";

export const imageExtention = ["png", "jpg", "jpeg", "gif"];
export const videoExtention = [
  "mp4",
  "mov",
  "wmv",
  "flv",
  "avi",
  "mkv",
  "webm"
];
export const audioExtention = ["mp3", "aac", "ogg", "wma"];

export const streamToBuffer = stream => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on("data", function(data) {
      buffers.push(data);
    });

    stream.on("end", function() {
      resolve(Buffer.concat(buffers));
    });
  });
};

export const removeUndefined = dimensions => {
  Object.keys(dimensions).forEach(
    key => dimensions[key] === undefined && delete dimensions[key]
  );
  return dimensions;
};

export const upload = {
  UPLOAD: "/uploads",
  IMAGE: "/image/",
  VIDEO: "/video/",
  AUDIO: "/audio/",
  FILE: "/file/",
  MAXFILESIZE: 200 * 1024 * 1024 //Upload file size
};

// Create a file directory
export const mkdirFile = path => {
  let fullpath = appRoot + path;
  if (!fs.existsSync(fullpath)) {
    fs.mkdir(fullpath, { recursive: true }, err => {
      if (err) console.log("Create failure", err);
      return true;
    });
  } else {
    return true;
  }
};

//Save file
export const saveFile = (file, path) => {
  let fullpath = appRoot + path;
  return new Promise((resolve, reject) => {
    let render = fs.createReadStream(file);
    // Create a write stream
    let upStream = fs.createWriteStream(fullpath);
    render.pipe(upStream);
    upStream.on("finish", () => {
      resolve(path);
    });
    upStream.on("error", err => {
      reject(err);
    });
  });
};


export const profileImageSlipt = data => {
  if(JSON.parse(data)) return JSON.parse(data)
}