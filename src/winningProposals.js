var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = winningProposals

function winningProposals (data) {
  return bel`
    <div class=${css.oldWinnersGallery}>
    ${data.map(proposal)}
    </div>
  `
}

function proposal (x, i) {
  return bel`
    <div class=${css.proposalContainer}>
      <div class=${css.proposalInner}><div class=${css.proposalTitle}>Proposal: ${x}</div></div>
    </div>
  `
}

var css = csjs`
  .oldWinnersGallery {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 3%;
    width: 80%;
  }
  .proposalContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 170px;
    width: 64%;
    background-color: #e2e1dc;
  }
  .proposalContainer:hover {
    background-color: #fcfbec;
    cursor: pointer;
  }
  .proposalInner {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dotted #b61114;
    height: 90%;
    width: 90%;
  }
  .proposalTitle {
    text-transform: uppercase;
    color: #39456b;
    font-weight: 1000;
    font-size: 35px;
  }
`
