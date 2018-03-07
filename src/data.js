var AwardTokenABI = require('./AwardTokenABI.json')
var BallotABI = require('./BallotABI.json')

module.exports = getData

function getData (opts, done) {
  var web3 = opts.web3
  var fromAddress = opts.fromAddress
  /* ----------------------------
  AwardToken.sol CONTRACT
  ------------------------------ */
  // ADDRESS (in Remix:  create contract/copy instance address)
  var AwardTokenAddress = '0xd11858fbbded508f6edc976dae08bd201136fe2b'
  var AwardTokenContract = new web3.eth.Contract(AwardTokenABI, AwardTokenAddress, {})


// ASYNC CALLS TO WEB3
  var result = {}
  var status = {}

  function finish () {

    if (status.callCurrBallot && status.callGetPreviousWinner) {
      done(null, result, fromAddress)

    }
  }

  callCurrBallot()
  callGetPreviousWinner()

  function callCurrBallot () {
    // Calling currBallot method will return a Ballot address that was created when we monted tokens in Award Token contract
    AwardTokenContract.methods.currBallot().call({}, callback)

    /* ----------------------------
    Ballot.sol CONTRACT
    ------------------------------ */
    // Having a Current Ballot address, we can now connect to existing BallotContract and get access to Ballot.sol functions
    var BallotContract
    function callback (err, BallotAddress) {
      BallotContract = new web3.eth.Contract(BallotABI, BallotAddress, {})
      getProposals(null)
    }

    var allProposals = []
    counter = 0

    function getProposals (err) {
      BallotContract.methods.getProposals().call({}, function (error, arrayOfAddresses) { // get addresses of all proposal creators
        if (error) return done(error)
        if (arrayOfAddresses.length) {
          arrayOfAddresses.forEach(function (address) {
            BallotContract.methods.proposals(address).call({}, function (error, proposal) {  // get each proposal based on the creator's address
            if (error) return done(error)
            allProposals.push(proposal)
            counter += 1
            if (counter === arrayOfAddresses.length) {
              status.callCurrBallot = true;
              result.BallotContract = BallotContract
              result.allProposals = allProposals
              finish()
            }
          })
        })
        } else {
          status.callCurrBallot = true;
          result.BallotContract = BallotContract
          result.allProposals = []
          finish()
        }
      })
    }
  }

  function callGetPreviousWinner () {
    AwardTokenContract.methods.getPreviousWinners().call({}, allWinners)

    function allWinners (err, list) {
      if (err) console.error(err)
      status.callGetPreviousWinner = true;
      result.previousWinners = list
      finish()
    }
  }

}
