var getData = require('./data.js')
var app = require('./app.js')
var Web3 = require('web3')
/* ----------------------------
      WEB3 CONFIG
------------------------------ */

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var fromAddress
web3.eth.getAccounts((err,result) => {

  if (err) return console.error(err)
  fromAddress = result[0]
  var opts = { web3, fromAddress }
  getData(opts, done)

  function done (err, data, fromAddress) {
    if (err) return console.error(err)
    var el = app(opts, data, fromAddress)
    document.body.appendChild(el)
  }
})
