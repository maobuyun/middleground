import { Button, Input, Select, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { orders, statusMap, type Order, type OrderStatus } from '../../data/orders';
import './index.less';

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

const statusOptions: { value: OrderStatus | ''; label: string }[] = [
  { value: '', label: '全部' },
  ...Object.keys(statusMap).map((key) => ({
    value: key as OrderStatus,
    label: key,
  })),
];

export default function OrderList() {
  const [filters, setFilters] = useState({
    orderId: '',
    product: '',
    owner: '',
    status: '' as OrderStatus | '',
  });

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const orderIdMatch = !filters.orderId.trim() || order.orderId.toLowerCase().includes(filters.orderId.trim().toLowerCase());
        const productMatch = !filters.product.trim() || order.product.toLowerCase().includes(filters.product.trim().toLowerCase());
        const ownerMatch = !filters.owner.trim() || order.owner.toLowerCase().includes(filters.owner.trim().toLowerCase());
        const statusMatch = !filters.status || order.status === filters.status;

        return orderIdMatch && productMatch && ownerMatch && statusMatch;
      }),
    [filters],
  );

  const handleReset = () => {
    setFilters({ orderId: '', product: '', owner: '', status: '' });
  };

  const hasFilter = filters.orderId || filters.product || filters.owner || filters.status;

  return (
    <div className="app-shell">
      <Typography.Title level={2}>订单列表</Typography.Title>

      <div className="filter-bar">
        <Space size={12} wrap>
          <Input
            placeholder="订单号"
            allowClear
            prefix={<SearchOutlined />}
            className="filter-input"
            value={filters.orderId}
            onChange={(e) => setFilters((prev) => ({ ...prev, orderId: e.target.value }))}
          />
          <Input
            placeholder="产品名称"
            allowClear
            prefix={<SearchOutlined />}
            className="filter-input"
            value={filters.product}
            onChange={(e) => setFilters((prev) => ({ ...prev, product: e.target.value }))}
          />
          <Input
            placeholder="负责人"
            allowClear
            prefix={<SearchOutlined />}
            className="filter-input"
            value={filters.owner}
            onChange={(e) => setFilters((prev) => ({ ...prev, owner: e.target.value }))}
          />
          <Select
            placeholder="全部状态"
            allowClear
            className="filter-select"
            value={filters.status || undefined}
            onChange={(value) => setFilters((prev) => ({ ...prev, status: value || '' }))}
            options={statusOptions}
          />
          {hasFilter && (
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          )}
        </Space>
      </div>

      <Table columns={columns} dataSource={filteredOrders} pagination={{ pageSize: 8 }} />
    </div>
  );
}
