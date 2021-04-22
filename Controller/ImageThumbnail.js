import resizer from 'node-image-resizer';
import appRoot from 'app-root-path';

export default async (imagPath, generatePath, fileNameConcat, tail) => {
    const setup = {
        all: {
            path: appRoot + '/public' + generatePath + 'resize/',
            quality: 50,
        },
        versions: [
            {
                prefix: 'big_',
                width: 768,
                height: 768,
            },
            {
                prefix: 'medium_',
                width: 512,
                height: 256,
            },
            {
                quality: 100,
                prefix: 'small_',
                width: 128,
                height: 64,
            },
        ],
    };

    // create thumbnails
    await resizer(imagPath, setup);

    return {
        big: generatePath + 'resize/big_' + fileNameConcat + '.' + tail,
        medium: generatePath + 'resize/medium_' + fileNameConcat + '.' + tail,
        small: generatePath + 'resize/small_' + fileNameConcat + '.' + tail,
    };
};
