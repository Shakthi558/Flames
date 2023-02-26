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
    // Convert names to lowercase and remove spaces
    yourName = yourName.toLowerCase().replace(/ /g, '');
    partnerName = partnerName.toLowerCase().replace(/ /g, '');

    // Define the FLAMES acronym
    const flames = ['friends', 'lovers', 'admirers', 'marriage', 'enemies', 'siblings'];

    // Calculate the number of common characters
    let common = 0;
    for (let i = 0; i < yourName.length; i++) {
      if (partnerName.includes(yourName[i])) {
        common++;
        partnerName = partnerName.replace(yourName[i], '');
      }
    }

    // Calculate the result by using the FLAMES acronym
    let result = flames[(yourName.length + partnerName.length - common) % flames.length];

    return result;
  }

  // Example usage:
  console.log(flames('John Doe', 'Jane Smith')); // Output: lovers


  var ans = flames(name_1, name_2)
  var image="/images/"+ans+".gif"
  res.render("result", { relation: ans,pic :image})


})


app.listen(process.env.PORT || 3000, function () {
  console.log('Server is up and running')
})

