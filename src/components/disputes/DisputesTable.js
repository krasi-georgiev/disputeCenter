import React from 'react';
import { Table } from 'antd';
import VoteForm from 'components/votes/VoteForm';
import Web3 from 'web3';

const DisputesTable = ({ disputes, pagination }) => {

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Symbol',
      dataIndex: 'requestSymbol',
      key: 'requestSymbol',
    },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    {
      title: 'Result (TRB)',
      dataIndex: 'tally',
      key: 'tally',
      render: (text) => {
        if (text) {
          return Web3.utils.fromWei(text)
        } else {
          return 'Pending';
        }
      },
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      render: (record) => {
        const openDispute = record.inVoteWindow;
        return <>{openDispute ? <VoteForm dispute={record} /> : null}</>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={'id'}
      dataSource={disputes}
      pagination={pagination}
    />
  );
};

export default DisputesTable;
