import { Input, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { orders, statusMap, type Order } from '../../data/orders';
import './index.less';

const { Search } = Input;

const columns: ColumnsType<Order> = [
  {
    title: '订单号',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: '产品名称',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '负责人',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: Order['status']) => {
      const item = statusMap[status];
      return <Tag color={item.color}>{item.text}</Tag>;
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => <Link to={`/order/${record.orderId}`}>查看详情</Link>,
  },
];

export default function OrderList() {
  const [keyword, setKeyword] = useState('');

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const normalized = keyword.trim().toLowerCase();
        if (!normalized) return true;

        return [order.orderId, order.product, order.owner, order.status]
          .some((value) => value.toLowerCase().includes(normalized));
      }),
    [keyword],
  );

  return (
    <div className="app-shell">
      <Typography.Title level={2}>订单列表</Typography.Title>
      <Space direction="vertical" className="order-list-search">
        <Search
          placeholder="搜索订单号、产品名称、负责人或状态"
          allowClear
          enterButton="搜索"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(value) => setKeyword(value)}
        />
      </Space>
      <Table columns={columns} dataSource={filteredOrders} pagination={{ pageSize: 8 }} />
    </div>
  );
}
