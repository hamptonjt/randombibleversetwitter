/**
* @param context {WebtaskContext}
*/
module.exports = function (context, cb) {
  var axios = require('axios')

  var Twitter = require('twitter')
  var client = new Twitter(context.secrets)

  var url = 'https://labs.bible.org/api/?passage=random&type=json'
  var tweet = ''

  axios.get(url).then(response => {
    // console.log(response.data)
    var verseInfo = response.data[0] // returns an array for one verse...Ok?
    var where = verseInfo.bookname + ' ' + verseInfo.chapter + ':' + verseInfo.verse
    var verse = verseInfo.text

    tweet = where + '\n' + verse

    var status = {
      status: tweet
    }

    client.post('statuses/update', status, function (err, tweet, resp) {
      if (!err) {
        console.log('Tweeted ok...')
      } else {
        cb(err)
      }
    })
  }).catch(e => {
    console.error(e)
    cb(e)
  })

  cb(null, { verse: tweet });
};