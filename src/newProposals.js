var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')
var getData = require('./src/data.js')
var voteConfirmation = require('./src/voteConfirmation.js')
var main

module.exports = newProposals

function newProposals () {
  main = bel`
    <div class=${css.proposalsMain} id="proposalsMain">
      <div class=${css.title}>Proposals</div>
      <div class=${css.subtitle}>Proposal title/description</div>
      <div class=${css.tip}>Choose only one</div>
      ${loadProposals()}
    </div>
  `
  return main
}

function loadProposals () {
  var data = getData()
  var el = bel`<div></div>`
  data.map(proposal => {
    el.appendChild(proposalContainer(proposal))
  })
  return el
}

function proposalContainer (proposal) {
  var caret = bel`<i class="fa fa-angle-double-right ${css.proposalIcon}" id="caret"></i>`
  var description = bel`<div class=${css.proposalDesc} id="proposalDesc">${(proposal.description).substring(0, 49) + "..."}</div>`
  return bel`
    <div class=${css.proposalContainer} onclick=${()=>showHideDetails(proposal, caret, description)}>
      <div class=${css.proposalBox}>
        ${caret}
        <div class=${css.proposalText}>
          <div class=${css.proposalTitle}>${proposal.title}</div>
          ${description}
        </div>
        <input type="radio" class=${css.radioButton} name="vote" onclick=${(e)=>confirmVote(proposal, e)}>
      </div>
    </div>`
}

function confirmVote (proposal, e) {
  e.stopPropagation()
  document.querySelector("#explanationBox").style.opacity = 0
  var parent = main.parentNode
  var newEl = voteConfirmation(proposal, main)
  parent.replaceChild(newEl, main)
}

function showHideDetails (proposal, caret, el) {
  if (el.innerText.length < 54) {
    caret.classList.remove("fa-angle-double-right")
    caret.classList.add("fa-angle-double-down")
    el.innerText = proposal.description
  } else {
    caret.classList.remove("fa-angle-double-down")
    caret.classList.add("fa-angle-double-right")
    el.innerText = (proposal.description).substring(0, 49) + "..."
  }
}

var css = csjs`
  .proposalsMain {
    animation: fadeIn 2s;
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 70%;
  }
  .title {
    font-size: 60px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
  }
  .subtitle {
    text-transform: uppercase;
    font-size: 30px;
    padding: 0 0 5px 0;
  }
  .tip {
    color: #b61114;
    font-size: 16px;
  }
  .proposalContainer {
    display: flex;
    cursor: pointer;
  }
  .proposalBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    width: 85%;
    margin: 5px 0 10px 0;
    padding: 2%;
  }
  .proposalIcon {
    margin: 0 0 0 5%;
    color: #b61114;
    width: 10%;
  }
  .proposalText {
    width: 70%;
  }
  .proposalTitle {
    font-size: 30px;
    text-transform: uppercase;
  }
  .proposalDesc {
    font-size: 18px;
    color: #b61114;
  }
  .radioButton {
    margin-left: 10%;
    cursor: pointer;
    font-size: 50px;
  }
  .text {
    font-weight: 1000;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
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
