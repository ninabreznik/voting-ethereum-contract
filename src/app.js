var bel = require('bel')
var csjs = require('csjs-inject')

var winningProposals = require('./src/winningProposals.js')
var newProposals = require('./src/newProposals.js')
var ExplanationBox = require('./src/explanationBox.js')
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

module.exports = landingPage

function landingPage (opts, data) {
  var allProposals = data.allProposals
  var BallotContract = data.BallotContract
  var text = 'Vote for proposal and help us reward the projects that benefit the community!'
  var explanationBox = ExplanationBox(text)
  var switchViewButton = switchView()
  var centralEl = newProposals(allProposals)

  return bel`
    <div class=${css.indexMain}>
      ${switchViewButton}
      ${winningProposals()}
      ${explanationBox}
      ${centralEl}
    </div>
  `

  function switchView () {
    return bel`<div class=${css.switchView} onclick=${()=>addNewProposal()}>Create new proposal</div>`
  }

  function addNewProposal () {
    explanationBox.innerText = 'Create new proposal and compete for the crypto funds!'
    switchViewButton.innerText = 'Vote for proposal'
    newCentralEl = applicationForm(BallotContract)
    var parent = centralEl.parentNode
    parent.removeChild(centralEl)
    parent.appendChild(newCentralEl)
    switchViewButton.onclick = null
    switchViewButton.onclick = ()=>voteView(newCentralEl)

  }

  function voteView (newCentralEl) {
    explanationBox.innerText = text
    switchViewButton.innerText = 'Create new proposal'
    var parent = newCentralEl.parentNode
    parent.removeChild(newCentralEl)
    parent.appendChild(centralEl)
    switchViewButton.onclick = null
    switchViewButton.onclick = ()=>addNewProposal()
  }

}
