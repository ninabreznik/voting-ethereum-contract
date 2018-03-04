var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = backToHomePage

function backToHomePage () {
  var explanationBox = bel`
      <div class=${css.explanationBox} id="explanationBox">
        <div class=${css.text}>Vote for best proposal in this round!</div>
      </div>
    `
  var confirmationView = document.querySelector("#transparentLayer")
  var parent = confirmationView.parentNode
  parent.removeChild(confirmationView)
  parent.appendChild(explanationBox)
  parent.appendChild(newProposals())
}

var css = csjs`
  .explanationBox {
    animation: fadeIn 2s;
    font-weight: 1000;
    letter-spacing: 1px;
    background-color: #fcfbec;
    width: 70%;
    padding: 20px 0 15px 10px;
    margin: 30px 0;
  }
  .text {
    font-weight: 1000;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .switchView {
    display: flex;
    align-self: flex-end;
    margin: 3% 2% 0 0;
    color: #b61114;
    font-size: 20px;
    padding: 1%;
    text-transform: uppercase;
    background-color: #e2e1dc;
  }
  .switchView:hover {
    cursor: pointer;
    background-color: #fcfbec;
  }
`
