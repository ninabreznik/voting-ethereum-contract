var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

module.exports = winningProposals

function winningProposals () {
  return bel`
    <div class=${css.main}>
      <div class=${css.proposalContainer}>
        <div class=${css.proposalInner}><div class=${css.proposalTitle}>Round 1 winner</div></div>
      </div>
      <div class=${css.proposalContainer}>
        <div class=${css.proposalInner}><div class=${css.proposalTitle}>Round 2 winner</div></div>
      </div>
      <div class=${css.proposalContainer}>
        <div class=${css.proposalInner}><div class=${css.proposalTitle}>Round 3 winner</div></div>
      </div>
      <div class=${css.proposalContainer}>
        <div class=${css.proposalInner}><div class=${css.proposalTitle}>Round 4 winner</div></div>
      </div>
    </div>
  `
}

var css = csjs`
  .main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10vh;
    width: 80%;
  }
  .proposalContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 170px;
    width: 22%;
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
