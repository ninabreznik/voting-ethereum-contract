var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')
var getData = require('./src/data.js')

module.exports = newProposals

function newProposals () {
  return bel`
    <div class=${css.proposalsMain} id="proposalsMain">
      <div class=${css.title}>Proposals</div>
      <div class=${css.subtitle}>Proposal title/description</div>
      <div class=${css.tip}>Choose only one</div>
      ${loadProposals()}
    </div>
  `
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
  return bel`
    <div class=${css.proposalContainer}>
      <div class=${css.proposalBox}>
        <i class="fa fa-angle-double-right ${css.proposalIcon}"></i>
        <div class=${css.proposalText}>
          <div class=${css.proposalTitle}>${proposal.title}</div>
          <div class=${css.proposalDesc}>${proposal.description}</div>
        </div>
        <input type="radio" class=${css.radioButton} name=${proposal.id} onclick=${()=>voteConfirmation()}>
      </div>
    </div>`
}

function voteConfirmation () {
  var current = document.querySelector("#proposalsMain")
  var explanationBox = document.querySelector("#explanationBox")
  explanationBox.parentNode.removeChild(explanationBox)
  var parent = current.parentNode
  parent.removeChild(current)
  var el = bel`
    <div class=${css.transparentLayer} id="transparentLayer">
      <i class="fa fa-close ${css.close}" onclick=${()=>backToProposals()}></div>
      <div class=${css.confirmationMain}>
        <div class=${css.confirmationHead}>
          <div class=${css.confirmationTitle}>Confirm vote?</div>
          <div class=${css.submitContainer}>
            <div class=${css.submitButton}>Submit</div>
            <div class=${css.submitText}>By clicking submit you confirm that your selection is correct!</div>
          </div>
        </div>
        <div class=${css.confirmationBox}>
          <div class=${css.confirmationTitle}>Title</div>
          <div class=${css.confirmationDesc}>Description of this proposal goes here</div>
        </div>
      </div>
    </div>
  `
  parent.appendChild(el)
}

function backToProposals () {
  var explanationBox = bel`
      <div class=${css.explanationBox} id="explanationBox">
        <div class=${css.text}>Vote for best proposal in this round!
        </div>
      </div>
    `
  var confirmationView = document.querySelector("#transparentLayer")
  var parent = confirmationView.parentNode
  parent.removeChild(confirmationView)
  var el = bel`
    <div class=${css.proposalsMain} id="proposalsMain">
      <div class=${css.title}>Proposals</div>
      <div class=${css.subtitle}>Proposal title/description</div>
      <div class=${css.tip}>Choose only one</div>
      ${loadProposals()}
    </div>
  `
  parent.appendChild(explanationBox)
  parent.appendChild(el)
}

var css = csjs`
  .transparentLayer {
    position: relative;
    background-color: transparent;
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .proposalsMain,
  .confirmationMain {
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 70%;
  }
  .confirmationMain {
    margin-top: 125px;
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
  }
  .proposalBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid black;
    width: 85%;
    height: 70px;
    margin: 5px 0 10px 0;
  }
  .confirmationBox  {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 85%;
    margin: 30px 0 10px 0;
    padding: 5%;
  }
  .confirmationTitle {
    font-size: 45px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
  }
  .confirmationDesc {
    font-size: 26px;
    color: #b61114;
  }
  .proposalIcon {
    margin: 0 10% 0 5%;
    color: #b61114;
  }
  .proposalText {

  }
  .proposalTitle {
    font-size: 30px;
    margin: 0 20% 0 0;
    text-transform: uppercase;
  }
  .proposalDesc {
    font-size: 18px;
    color: #b61114;
  }
  .radioButton {
    margin-left: 20%;
  }
  .confirmationHead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .submitContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #b61114;
  }
  .submitButton {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    padding: 5%;
    width: 20%;
  }
  .submitButton:hover {
    background-color: #e2e1dc;
    cursor: pointer;
  }
  .submitText {
    font-size: 16px;
    width: 60%;
  }
  .close {
    font-size: 14px;
    display: flex;
    z-index: 999;
    position: absolute;
    right: 10%;
    top: 20%;
    color: #b61114;
    cursor: pointer;
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
