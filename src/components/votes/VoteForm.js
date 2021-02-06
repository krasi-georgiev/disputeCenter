import React, { useState, useContext, useEffect } from 'react';
import Loader from '../shared/Loader';
import { Button, Modal } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { UserContext } from 'contexts/User';
import EtherscanLink from 'components/shared/EtherscanlLnk';

const VoteForm = ({ dispute }) => {
  const [visible, setVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [currentTx, setCurrentTx] = useState();
  const [hasVoted, setHasVoted] = useState();
  const [error, setError] = useState();
  const [currentUser] = useContext(UserContext);

  useEffect(() => {
    const getHasVoted = async () => {
      const res = await currentUser.contract.service.didVote(
        dispute.disputeId,
        currentUser.address,
      );

      setHasVoted(res);
    };

    if (currentUser && currentUser.contract) {
      getHasVoted();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentUser.contract]);

  const getTx = (tx) => {
    setCurrentTx(tx);
  };

  const getError = (err) => {
    setError(err);
  };

  const handleSubmit = async (supportsDispute) => {
    setProcessing(true);

    try {
      await currentUser.contract.service.vote(
        currentUser.address,
        dispute.disputeId,
        supportsDispute,
        getTx,
        getError,
      );
    } catch (e) {
      console.error(`Error submitting vote: ${e.toString()}`);
      setError(e);
    } finally {
      setProcessing(false);
      setProcessed(true);
    }
  };

  const handleCancel = () => {
    setProcessed(false);
    setProcessing(false);
    setError();
    setCurrentTx();
    setVisible(false);
  };

  const renderTitle = () => {
    if (error) {
      return 'Transaction Error';
    } else if (processing) {
      return 'Sending Vote';
    } else if (processed) {
      return 'Sent Vote';
    } else {
      return 'Vote';
    }
  };

  const canVote = currentUser && +currentUser.balance > 0 && !hasVoted;
  // const canVote = true;

  return (
    <>
      <Button type="default" onClick={() => setVisible(true)}>
        Vote
      </Button>
      <Modal
        visible={visible}
        title={renderTitle()}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        {error && <p className="ErrorMsg">Error Submitting Transaction</p>}

        {!processing && !processed ? (
          <>
            <p>Stake some TRB to dispute a value</p>
            <h6>Symbol</h6>
            <p>{dispute.requestSymbol}</p>
            <h6>Value</h6>
            <p>{dispute.value}</p>
            {currentUser ? (
              <>
                <h6>Your Voting Power</h6>
                <p className="BalanceStatus">
                  {canVote ? (
                    <CheckCircleOutlined />
                  ) : (
                      <CloseCircleOutlined style={{ color: '#dd5858' }} />
                    )}
                  {currentUser.balance &&
                    currentUser.contract.service.fromWei(
                      currentUser.balance.toString(),
                    )}{' '}
                  TRB
                </p>

                {!canVote && !hasVoted ? (
                  <p className="ErrorMsg">You need TRB to vote</p>
                ) : null}
                {!canVote && hasVoted ? (
                  <p className="ErrorMsg">You already voted on this dispute</p>
                ) : null}
              </>
            ) : (
                <p className="ErrorMsg">
                  You need to sign in with MetaMask to vote
                </p>
              )}
            <Button
              key="support"
              type="primary"
              size="large"
              onClick={() => handleSubmit(true)}
              disabled={!canVote}
              style={{ marginRight: '15px' }}
            >
              Support
            </Button>
            <Button
              key="challenge"
              type="danger"
              size="large"
              onClick={() => handleSubmit(false)}
              disabled={!canVote}
            >
              Challenge
            </Button>
          </>
        ) : null}

        {processing && !error ? (
          <>
            <Loader />
            {currentTx && <EtherscanLink txHash={currentTx} />}
          </>
        ) : null}

        {processed && !error ? (
          <>
            <CheckCircleOutlined />
            {currentTx && <EtherscanLink txHash={currentTx} />}
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default VoteForm;
