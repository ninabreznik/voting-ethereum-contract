var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = explanationBox

function explanationBox (text) {
  return bel`<div class=${css.explanationBox} id="explanationBox">${text}</div>`
}

var css = csjs`
  .explanationBox {
    animation: fadeIn 2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 1000;
    font-size: 25px;
    letter-spacing: 1px;
    background-color: #fcfbec;
    width: 70%;
    padding: 20px 0 15px 10px;
    margin: 30px 0;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
