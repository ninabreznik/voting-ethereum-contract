var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')
var backToHomePage = require('./src/backToHomePage.js')

module.exports = voteConfirmation

function voteConfirmation (proposal) {
  var current = document.querySelector("#proposalsMain")
  var explanationBox = document.querySelector("#explanationBox")
  explanationBox.parentNode.removeChild(explanationBox)
  var parent = current.parentNode
  parent.removeChild(current)
  var el = bel`
    <div class=${css.transparentLayer} id="transparentLayer">
      <i class="fa fa-close ${css.close}" onclick=${()=>backToHomePage()}></div>
      <div class=${css.confirmationMain}>
        <div class=${css.confirmationHead}>
          <div class=${css.confirmationTitle}>Confirm vote?</div>
          <div class=${css.submitContainer}>
            <div class=${css.submitButton}>Submit</div>
            <div class=${css.submitText}>By clicking submit you confirm that your selection is correct!</div>
          </div>
        </div>
        <div class=${css.confirmationBox}>
          <div class=${css.confirmationTitle}>${proposal.title}</div>
          <div class=${css.confirmationDesc}>${proposal.description}</div>
        </div>
      </div>
    </div>
  `
  parent.appendChild(el)
}

var css = csjs`
  .transparentLayer {
    animation: fadeIn 2s;
    position: relative;
    background-color: transparent;
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .confirmationMain {
    margin-top: 125px;
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 77%;
  }
  .close {
    font-size: 14px;
    display: flex;
    z-index: 999;
    position: absolute;
    right: 5%;
    top: 15%;
    color: #fcfbec;
    cursor: pointer;
  }
  .close:hover {
    color: #b61114;
  }
  .confirmationHead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .confirmationTitle {
    font-size: 45px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
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
  .confirmationBox  {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 85%;
    margin: 30px 0 10px 0;
    padding: 5%;
  }
  .confirmationDesc {
    font-size: 26px;
    color: #b61114;
  }
`
