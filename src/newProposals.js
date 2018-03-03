var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = newProposals

function newProposals () {
  return bel`
    <div class=${css.proposalsMain} id="proposalsMain">
      <div class=${css.title}>Proposals</div>
      <div class=${css.subtitle}>Proposal title/description</div>
      <div class=${css.tip}>Choose only one</div>
      ${proposalContainer(el)}
      ${proposalContainer(el)}
      ${proposalContainer(el)}
      ${proposalContainer(el)}
      ${proposalContainer(el)}
      ${proposalContainer(el)}
    </div>
  `
}

function proposalContainer (el) {
  return bel`
    <div class=${css.proposalContainer}>
      <div class=${css.proposalBox}>
        <i class="fa fa-angle-double-right ${css.proposalIcon}"></i>
        <div class=${css.proposalText}>
          <div class=${css.proposalTitle}>My proposal</div>
          <div class=${css.proposalDesc}>This is my proposal, check it out and vote for me</div>
        </div>
        <input type="radio" class=${css.radioButton} name="proposal" onclick=${()=>voteConfirmation()}>
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
  `
  parent.appendChild(el)
}

var css = csjs`
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
`
