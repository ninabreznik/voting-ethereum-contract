const web3 = require('_web3')
const Ballot = require('_contracts/Ballot')
const AwardToken = require('_contracts/AwardToken')
const dapp = require('_dapp')
const log = require('_logger')('index')

getMyAddress({
  wallet: null,
  winners: null,
  proposals: null,
  address: null,
  contract: { ballot: null, awardToken: null }
}) // => Step 1

/******************************************************************************
  Step 1
******************************************************************************/
function getMyAddress (result) {
  log(null, 'loading (1/7) - getMyAddress')
  web3.eth.getAccounts((err, localAddresses) => {
    if (err) return done(err)
    result.wallet = localAddresses[0]
    getAwardTokenContract(result) // => Step 2
  })
}
/******************************************************************************
  Step 2
******************************************************************************/
function getAwardTokenContract (result) {
  log(null, 'loading (2/7) - getAwardTokenContract')
  AwardToken({}, (err, AwardTokenContract) => {
    if (err) return done(err)
    result.contract.awardToken = AwardTokenContract
    getCurrentBallot(result) // => Step 3
  })
}
/******************************************************************************
  Step 3
******************************************************************************/
function getCurrentBallot (result) {
  log(null, 'loading (3/7) - getCurrentBallot')
  // Calling currBallot method will return a Ballot address
  // that was created when we minted tokens in the Award Token contract
  const { awardToken } = result.contract
  awardToken.methods.getPreviousWinners().call({}, (err, list) => {
    if (err) return done(err)
    result.winners = list
    finish(result) // => Step 7
  })
  awardToken.methods.currBallot().call({}, (err, address) => {
    if (err) return done(err)
    result.address = address
    getBallotContract(result) // => Step 4
  })
}
/******************************************************************************
  Step 4
******************************************************************************/
function getBallotContract (result) {
  log(null, 'loading (4/7) - getBallotContract')
  Ballot({ address: result.address }, (err, BallotContract) => {
    if (err) return done(err)
    result.contract.ballot = BallotContract
    getCurrentProposalAddresses(result) // => Step 5
  })
}
/******************************************************************************
  Step 5
******************************************************************************/
function getCurrentProposalAddresses (result) {
  log(null, 'loading (5/7) - getCurrentProposalAddresses')
  const { ballot } = result.contract
  ballot.methods.getProposals().call((err, list) => {
    if (err) return done(err)
    result.proposals = list
    getProposals(result) // => Step 6
  })
}
/******************************************************************************
  Step 6
******************************************************************************/
function getProposals (result) {
  log(null, 'loading (6/7) - getProposals')
  var counter = 0
  const addresses = result.proposals
  result.proposals = []
  console.warn('@TODO: test and maybe fix case where proposals are present')
  if (!addresses.length) finish(result) // => Step 7
  else addresses.forEach(address => {
    BallotContract.methods.proposals(address).call({}, (err, proposal) => {
      if (err) return done(err)
      console.log(proposal.address)
      proposal.address = address
      console.log(proposal.address)
      console.log('======================')
      proposals.push(proposal)
      counter += 1
      if (counter === addresses.length) finish(result) // => Step 7
    })
  })
}
/******************************************************************************
  Step 7
******************************************************************************/
function finish (result) {
  const { winners, proposals } = result
  if (winners && proposals) {
    log(null, 'loading (7/7) - finish')
    done(null, result)
  } else if (winners || proposals) log(null, 'loading (4-6/7) - waiting')
  else log(new Error('...error'))
}
/******************************************************************************
  DONE
******************************************************************************/
function done (err, result) {
  if (err) return log(new Error(err))
  const { wallet, winners, proposals, address } = result
  const { ballot, awardToken } = result.contract
  if (wallet && winners && proposals && address && ballot && awardToken) {
    log(null, 'success')
    var el = dapp(result)
    document.body.appendChild(el)
  } else log(new Error('fail'))
}
