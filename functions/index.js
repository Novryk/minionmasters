const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const fs = require("fs");
exports.mm = functions.https.onRequest((request, response) => {
  //const file = fs.readFileSync(path.join(__dirname, "./index.html"), "utf8");

  const file = fs.readFileSync("./index.html");

  const query = `?master=${request.query.master}&iD=${request.query.iD.join("&iD=")}`;

  const previewUrl = `https://minionmastersmanager.web.app/${query}`;

  const queryEncoded = encodeURIComponent(previewUrl + "&isPreview");

  const dimensions = "?width=917&height=190";

  const buildMeta = (property) =>
    `<meta property="${property}" content="https://minionmastersmanager-286215.ew.r.appspot.com/screenshot/${queryEncoded}${dimensions}"/>`;

  const newHtmlFile = file
    .toString()
    .replace(/<meta property="og:image" content=".*?"\/>/, buildMeta("og:image"))
    .replace(/<meta property="twitter:image" content=".*?"\/>/, buildMeta("twitter:image"));
  response.status(200).send(`<!-- preview -->${newHtmlFile}`);
});
