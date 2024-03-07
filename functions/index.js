/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebae-functions");
const next = require("next");
const logger = require("firebase-functions/logger");

var dev = process.env.NODE_ENV !== "production";
var app = next({ dev, conf: { distDir: "next"}});
var handle = app.gerRequestHandler();

exports.nextApp = functions.https.onRequest((req, res) => {
    console.log("File" + req.originalUrl);
    return app.prepare().then(() => handle(req, res));
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
