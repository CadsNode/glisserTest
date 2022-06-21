const { json } = require('express');
const express = require('express');
const router = express.Router();
require('dotenv').config();
var Twit = require('twit')
//////// credentials
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  
  strictSSL:            true,     
})
/////////

var params = {
    q: 'banana since:2011-07-11',
    count: 100
};


router.get('/', function (req, res, next) {

    T.get('search/tweets', params, function(error, tweets, response){
        if(!error){
            var statuses = tweets.statuses;
            var tweetId = [];
            var text = [];
            var userName = [];
            var userScreenName = [];
            var userImage = [];
            var date = [];
            var likes = []
            var retweetCount = [];
            for(var i=0 ; i<statuses.length ; i++){
                tweetId.push(statuses[i].id)
                text.push(statuses[i].text)
                userName.push(statuses[i].user.name)
                userScreenName.push(statuses[i].user.screen_name)
                userImage.push(statuses[i].user.profile_image_url)
                date.push(statuses[i].user.created_at)
                likes.push(statuses[i].favorite_count)
                retweetCount.push(statuses[i].retweet_count)
            }

            var data = {tweetId, text, userName, userScreenName, userImage, date, likes, retweetCount }
            res.json(data);

        }
    });
});



module.exports = router;



