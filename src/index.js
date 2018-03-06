var getData = require('./src/data.js')
var app = require('./src/app.js')
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
web3.eth.defaultAccount = web3.eth.accounts[0];
var opts = { web3 }

getData(opts, (err, data) => {
  console.log(data)
  if (err) return console.error(err)
  var el = app(opts, data)
  document.body.appendChild(el)
})
