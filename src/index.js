var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

var winningProposals = require('./src/winningProposals.js')
var newProposals = require('./src/newProposals.js')
var explanationBox = require('./src/explanationBox.js')
var applicationForm = require('./src/applicationForm.js')

var fontAwesome = bel`<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>`
var font = [bel`<link href="https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz" rel="stylesheet">`]
document.head.appendChild(font[0])
document.head.appendChild(fontAwesome)

var css = csjs`
  body {
    font-family: 'Yanone Kaffeesatz', sans-serif;
    display: flex;
    justify-content: center;
    margin: 0;
    background-color: #39456b;
  }
  .indexMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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

var text = 'Vote for proposal and help us give the green light to projects that benefit the community!'
var explanationBox = explanationBox(text)
var switchViewButton = switchView()
var centralEl = newProposals()

function landingPage() {

  return bel`
    <div class=${css.indexMain}>
      ${switchViewButton}
      ${winningProposals()}
      ${explanationBox}
      ${centralEl}
    </div>
  `

}

function switchView () {
  return bel`<div class=${css.switchView} onclick=${()=>applyForGrant()}>Apply for grant</div>`
}

function applyForGrant () {
  switchViewButton.innerText = 'Vote for proposal'
  newCentralEl = applicationForm()
  var parent = centralEl.parentNode
  parent.removeChild(centralEl)
  parent.appendChild(newCentralEl)
  switchViewButton.onclick = null
  switchViewButton.onclick = ()=>voteView(newCentralEl)

}

function voteView (newCentralEl) {
  switchViewButton.innerText = 'Apply for grant'
  var parent = newCentralEl.parentNode
  parent.removeChild(newCentralEl)
  parent.appendChild(centralEl)
  switchViewButton.onclick = null
  switchViewButton.onclick = ()=>applyForGrant()
}

/******************************
    LAUNCH THE PAGE
*******************************/
var el = landingPage()
document.body.appendChild(el)
