const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const projectData = {};
app.use(express.static("website"));
const port = 8000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
app.get("/getAll", (req, res) => {
  res.send(projectData).status(200).end();
});
app.post("/postData", (res, req) => {
  projectData = {
    temp: req.temp,
    date: req.date,
    content: req.content,
  };
  res.send(projectData).status(200).end();
});
