import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Lottie from 'react-lottie';
import { ThemeContext } from '../../contexts/Theme';
import MiningEvents from './MiningEvents';
import CurrentMiningEvents from './CurrentMiningEvents';

const MiningEventsTable = ({ events, pagination, current }) => {
  const [mode] = useContext(ThemeContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: mode,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const columns = [
    {
      title: 'Block',
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      render: (text) => {
        if (current) {
          return <p>-</p>;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: 'Symbols',
      render: (text) => {
        let symbols;
        if (current) {
          symbols = text.minerValues[0].requestSymbols.join(', ');
        } else {
          symbols = text.requestSymbols.join(', ');
        }
        return <p>{symbols}</p>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (current) {
          return (
            <span className="LoaderSmall">
              {text} <Lottie options={defaultOptions} height={36} width={36} />
            </span>
          );
        } else {
          return <p>{text === 'Completed' ? 'Mined' : text}</p>;
        }
      },
    },
  ];

  if (current) {
    columns.splice(3, 1);
  }

  const [expandedKeys, setExpandedKeys] = useState([]);
  const onRow = ({ id }) =>
    expandedKeys.includes(id) && { className: 'expanded' };
  const onExpand = (expanded, record) => {
    const keys = expandedKeys;
    const moreKeys = expanded
      ? keys.concat(record.id)
      : keys.filter((k) => k !== record.id);

    setExpandedKeys(moreKeys);
  };

  return (
    <Table
      columns={columns}
      rowKey={current ? '0' : 'id'}
      dataSource={events}
      onRow={onRow}
      onExpand={onExpand}
      expandedRowRender={(record, index) => {
        if (current) {
          return (
            <CurrentMiningEvents miningEvent={record} valueIndex={index} />
          );
        } else {
          return <MiningEvents miningEvent={record} valueIndex={index} />;
        }
      }}
      expandIconColumnIndex={current ? 5 : 6}
      expandIcon={({ expanded, onExpand, record }) =>
        expanded ? (
          <span>
            <MinusOutlined />
          </span>
        ) : (
            <span>
              <PlusOutlined />
            </span>
          )
      }
      expandRowByClick={true}
      pagination={pagination}
    />
  );
};

export default MiningEventsTable;
