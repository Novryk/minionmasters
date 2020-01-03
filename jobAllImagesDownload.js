const fetch = require("node-fetch");

var http = require('http');
var fs = require('fs');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const download = (url, path) => new Promise((resolve, reject) => {
    http.get(url, response => {
        const statusCode = response.statusCode;

        if (statusCode !== 200) {
            return reject('Download error!');
        }

        const writeStream = fs.createWriteStream(path);
        response.pipe(writeStream);

        writeStream.on('error', () => reject('Error writing to file!'));
        writeStream.on('finish', () => writeStream.close(resolve));
    });
}).catch(err => console.error(err));

async function fetchImageData() {
    // let url = "https://minionmasters.gamepedia.com/api.php?action=query&list=allimages&aiprop=url&ailimit=max&format=json";
    let url = "https://minionmasters.gamepedia.com/api.php?action=query&list=allimages&ailimit=max&aiprop=timestamp|url&aisort=timestamp&aidir=older&format=json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let GENERATED_FOLDER = './generated';
let IMG_FOLDER = '/img/';
let generatedImFolder = GENERATED_FOLDER + IMG_FOLDER;

if (!fs.existsSync(generatedImFolder)) {
    fs.mkdirSync(generatedImFolder);
}
(async () => {
    const allImageData = await fetchImageData();
    allImageData.query.allimages.forEach(imageData => {
        download(imageData.url.replace("https", "http"), generatedImFolder + imageData.name);
        console.log(imageData.timestamp + imageData.name);
    });
})();

module.exports.generatedImFolder = generatedImFolder;