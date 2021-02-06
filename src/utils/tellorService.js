import abis from './contracts';

export default class TellorService {
  contractAddr;
  web3;
  abis;
  contract;

  constructor(web3, contractAddr) {
    this.contractAddr = contractAddr
    this.web3 = web3;
    this.abis = abis;
    this.contractInst = async () => { await new web3.eth.Contract(abis, contractAddr) };
  }

  async getCurrentVariables() {
    await this.initContract();
    return await this.contractInst.methods.getCurrentVariables().call();
  }

  async getBalance(address) {
    let balance = await this.contractInst.methods.balanceOf(address).call();
    return balance;
  }

  async getDisputeFee() {
    let disputeFee = await this.contractInst.methods
      .getUintVar(this.web3.utils.soliditySha3('disputeFee'))
      .call();
    return disputeFee;
  }

  async didVote(disputeId, address) {
    let didVote = await this.contractInst.methods
      .didVote(disputeId, address)
      .call();
    return didVote;
  }

  async getMiners(requestId, timestamp) {
    let miners = await this.contractInst.methods
      .getMinersByRequestIdAndTimestamp(requestId, timestamp)
      .call();
    return miners;
  }

  async beginDispute(
    from,
    requestId,
    timestamp,
    minerAddress,
    setTx,
    setError,
  ) {
    // uint256 _requestId, uint256 _timestamp, uint256 _minerIndex
    const miners = await this.getMiners(requestId, timestamp);
    const lcMiners = miners.map((m) => m.toLowerCase());
    const minerIndex = lcMiners.indexOf(minerAddress.toLowerCase());

    let dispute = this.contractInst.methods
      .beginDispute(requestId, timestamp, minerIndex)
      .send({ from })
      .once('transactionHash', (txHash) => {
        console.log('txHash', txHash);
        setTx(txHash);
      })
      .then((resp) => {
        console.log('resp', resp);
        return resp;
      })
      .catch((err) => {
        console.log('err', err);
        setError({ error: 'rejected transaction', message: err });
      });

    return dispute;
  }

  async vote(from, disputeId, supportsDispute, setTx, setError) {
    // uint256 _disputeId, bool _supportsDispute
    let vote = this.contractInst.methods
      .vote(disputeId, supportsDispute)
      .send({ from })
      .once('transactionHash', (txHash) => {
        setTx(txHash);
      })
      .then((resp) => {
        console.log('resp', resp);
        return resp;
      })
      .catch((err) => {
        console.log('err', err);
        setError({ error: 'rejected transaction', message: err });
      });

    return vote;
  }

  fromWei(value) {
    return this.web3.utils.fromWei(value);
  }
}
