const express = require("express");
const fs = require("fs");

const log = (req, res, next) => {
  const { method, url, route, hostname, rawHeaders } = req;

  res.on("finish", async () => {

    let now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth();
    if (month < 10) month = "0" + (month + 1);
    let date = now.getDate();
    if (date < 10) date = "0" + (date + 1);
    let hour = now.getHours();
    if (hour < 10) hour = "0" + (hour + 1);
    let min = now.getMinutes();
    if (min < 10) min = "0" + (min + 1);
    let sec = now.getSeconds();
    if (sec < 10) sec = "0" + (sec + 1);
    const timeStamp = `${year}-${month}-${date} ${hour}:${min}:${sec}`;

    let logRow =
      "Metod: " +
      method +
      " | statuscode: " +
      res.statusCode +
      " | endpoint: " +
      url +
      " " +
      timeStamp +
      " " +
      rawHeaders[1] +
      "\n";
    console.log(logRow);

    fs.writeFile("./log.txt", logRow, { flag: "a+" }, (err) => {
      if (err) throw err;
      console.log("Log updated");
    });
  });
  next();
};

module.exports = log;
