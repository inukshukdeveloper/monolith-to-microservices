/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const { exec } = require("child_process");

// Spike1: try executing shell command "ls"
exec("ls -la", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// Spike2: here is the code to start running S4TF models
// change the clone to the pix2pix branch off
// the forked swift-models repository to try
// the pix2pix model
//
// git clone https://github.com/tensorflow/swift-models.git
// cd swift-models
// swift run

// const { execFile } = require("child_process");
// const child = execFile("run-s4tf-script", (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });

// const { exec } = require('child_process');
var yourscript = exec('sh ./src/frontend/run-s4tf-script.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });

//Serve website
app.use(express.static(path.join(__dirname, "public")));

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//Start the server
app.listen(port, () => console.log(`Frontend microservice listening on port ${port}!`));
