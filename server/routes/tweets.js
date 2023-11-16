"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    //req.body.text(name of textarea) = tweetString
    console.log("Server side received tweet:", req.body.text);
    //If req.body.text is falsy
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      //terminate post request immediately
      return;
    }
    //Extract user name, if no user name, generateRandomUser()
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    //Create tweet object
    const tweet = {
      //Assign user to user
      user: user,
      content: {
        //assign tweet to text
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

 
  return tweetsRoutes;
}
