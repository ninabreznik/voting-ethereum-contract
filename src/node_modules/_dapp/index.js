var bel = require('bel')
var csjs = require('csjs-inject')

var winningProposals = require('./winningProposals.js')
var newProposals = require('./newProposals.js')
var ExplanationBox = require('./explanationBox.js')
var applicationForm = require('./applicationForm.js')

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

module.exports = app

function app (opts, data, fromAddress) {
  debugger
  var allProposals = data.allProposals
  var BallotContract = data.BallotContract
  var prevWinners = data.previousWinners

  var switchViewsButton = bel`<div class=${css.switchView} onclick=${()=>switchView()}>Create new proposal</div>`
  var newProposalForm = applicationForm(BallotContract, fromAddress)
  var listOfProposals = newProposals(allProposals, BallotContract, fromAddress, switchViewsButton)
  var oldWinnersGallery = winningProposals(prevWinners)

  var text = 'Vote for proposal and help us reward the projects that benefit the community!'
  var explanationBox = ExplanationBox(text)

  return bel`
    <div class=${css.indexMain}>
      ${switchViewsButton}
      ${oldWinnersGallery}
      ${explanationBox}
      ${listOfProposals}
    </div>
  `

  function switchView () {
    var allProposalsView = document.querySelector('[class^="proposalsMain"]')
    var addNewProposalView = document.querySelector('[class^="formMain"]')
    if (allProposalsView) {
      switchViewsButton.style.opacity = 1;
      var newView = newProposalForm
      var parent = allProposalsView.parentNode
      parent.replaceChild(newView, allProposalsView )
      explanationBox.innerText = 'Create new proposal and compete for the crypto funds!'
      switchViewsButton.innerText = 'Vote for proposal'
    } else if (addNewProposalView) {
      switchViewsButton.style.opacity = 1;
      var newView = listOfProposals
      var parent = addNewProposalView.parentNode
      parent.replaceChild(newView, addNewProposalView )
      explanationBox.innerText = text
      switchViewsButton.innerText = 'Create new proposal'
    }
  }

}
