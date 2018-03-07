var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = applicationForm

function applicationForm (BallotContract, fromAddress) {
  var formTitle = bel`<div class=${css.formTitle}>Application form</div>`
  var formSubtitle = bel`<div class=${css.formSubtitle}>Proposal title/description/address</div>`
  var formTip = bel`<div class=${css.formTip}>Fill out the form and click submit!</div>`
  var formContainer = bel`
    <div class=${css.formContainer}>
      <div class=${css.formField}>
        <div class=${css.formFieldText}>Proposal title</div>
        <input class=${css.formFieldInput} id="title">
      </div>
      <div class=${css.formField}>
        <div class=${css.formFieldText}>Description</div>
        <textarea class=${css.formFieldInput} id="description"></textarea>
      </div>
      <div class=${css.submitContainer}>
        <div class=${css.submitText} id="text">By clicking submit your proposal will be immediatelly sent!</div>
        <div class=${css.submitButton} id="submit" onclick=${()=>submit()}>Submit</div>
      </div>
    </div>
  `
  var el = bel`
  <div class=${css.formMain}>
    ${formTitle}
    ${formSubtitle}
    ${formTip}
    ${formContainer}
  </div>
  `

  function submit () {

    var t = document.getElementById("title")
    var d = document.getElementById("description")
    var title = t.value
    var description = d.value
    t.style.borderColor = 'black'
    d.style.borderColor = 'black'
    if (!title) {t.style.borderColor = '#b61114'}
    if (!description) {d.style.borderColor = '#b61114'}
    var address = fromAddress
    if (title && description && address) {
      // CREATE NEW PROPOSAL
      BallotContract.methods.addProposal(description, title, address).send({ from: address}, function (error, txHash) {
        if (error) return console.error(error)
        var url = 'https://ropsten.etherscan.io/tx/' + txHash
        formTitle.style.color = 'green'
        formTitle.innerText = 'Proposal sent'
        formSubtitle.innerHTML = `Click <a href=${url} target="_blank">here</a> to get your transaction receipt.`
        formTip.innerText = ''
        formContainer.parentNode.removeChild(formContainer)
      })
    }
  }

  return el
}


var css = csjs`
  .formMain {
    animation: fadeIn 2s;
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 70%;
  }
  .formTitle {
    font-size: 60px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
    color: #b61114;
  }
  .formSubtitle {
    text-transform: uppercase;
    font-size: 30px;
    padding: 0 0 5px 0;
  }
  .formTip {
    color: #b61114;
    font-size: 16px;
  }
  .formContainer {
    margin-top: 30px 0;
  }
  .formField {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25px 0 10px 0;
  }
  .formFieldInput {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    padding: 3%;
    width: 30%;
    font-size: 14px;
  }
  .formFieldText {
    color: #b61114;
    font-size: 20px;
    min-width: 175px;
    width: 20%;
  }
  .submitContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25px 0 10px 0;
  }
  .submitButton {
    color: #b61114;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #b61114;
    padding: 2.5%;
    width: 31%;
  }
  .submitButton:hover {
    background-color: #e2e1dc;
    cursor: pointer;
  }
  .submitText {
    font-size: 16px;
    min-width: 175px;
    width: 20%;
    margin-right: 0%;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
    color: green;
  }
  a:hover {
    text-decoration: underline;
  }
`
