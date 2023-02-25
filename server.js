var express = require("express")
var https = require('https')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
  var name_1 = req.body.Name1
  var name_2 = req.body.Name2

  function flames(yourName, partnerName) {
    // Convert both names to lowercase and remove any spaces
    yourName = yourName.toLowerCase().replace(/\s+/g, '');
    partnerName = partnerName.toLowerCase().replace(/\s+/g, '');

    // Store the letters that remain after "FLAMES" is counted
    var letters = ['f', 'l', 'a', 'm', 'e', 's'];

    // Iterate over each letter in your name
    for (var i = 0; i < yourName.length; i++) {
      var letter = yourName.charAt(i);
      // Check if the letter is also in your partner's name
      if (partnerName.includes(letter)) {
        // If so, remove the corresponding letter from the "letters" array
        var index = letters.indexOf(letter);
        if (index !== -1) {
          letters.splice(index, 1);
        }
      }
    }

    // Return the result based on the number of letters left
    switch (letters.length) {
      case 0:
        return "Siblings";
      case 1:
        return "Friendship";
      case 2:
        return "Love";
      case 3:
        return "Affection";
      case 4:
        return "Marriage";
      default:
        return "Enemies";
    }
  }

  var ans = flames(name_1, name_2)
  res.render("result",{relation:ans})


})


app.listen(process.env.PORT || 3000, function () {
  console.log('Server is up and running')
})

