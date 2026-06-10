import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import OrderDetail from './pages/OrderDetail';
import { orders, statusMap, type Order } from './data/orders';

const columns: ColumnsType<typeof orders[number]> = [
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
    render: (_, record) => (
      <Link to={`/order/${record.orderId}`}>查看详情</Link>
    ),
  },
];

function OrderList() {
  return (
    <div className="app-shell">
      <Typography.Title level={2}>订单列表</Typography.Title>
      <Table columns={columns} dataSource={orders} pagination={{ pageSize: 8 }} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Routes>
  );
}
