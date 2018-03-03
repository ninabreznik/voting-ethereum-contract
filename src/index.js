var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

var winningProposals = require('./src/winningProposals.js')
var addNewProposal = require('./src/addNewProposal.js')
var newProposals = require('./src/newProposals.js')


var fontAwesome = bel`<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>`
var font = [
  bel`<link href="https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz" rel="stylesheet">`
]
document.head.appendChild(font[0])
document.head.appendChild(fontAwesome)

function landingPage() {

  return bel`
    <div class=${css.main}>
      ${winningProposals()}
      ${explanationBox}
      ${newProposals()}
    </div>
  `

}

var css = csjs`
  body {
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
    justify-content: center;
    margin: 0;
    background-color: #39456b;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .explanationBox {
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
`

var explanationBox = bel`
    <div class=${css.explanationBox} id="explanationBox">
      <div class=${css.text}>Vote for best proposal in this round!
      </div>
    </div>
  `

/******************************
    LAUNCH THE PAGE
*******************************/
var el = landingPage()
document.body.appendChild(el)
