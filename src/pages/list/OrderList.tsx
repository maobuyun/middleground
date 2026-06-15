import { Button, Input, Popconfirm, Select, Space, Table, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { orders as initialOrders, statusMap, type Order, type OrderStatus } from '../../data/orders';
import './index.less';

/* 清透色板 */
const refinedStatus: Record<OrderStatus, { color: string; bg: string }> = {
  '待处理': { color: '#7c8c9e', bg: '#f0f4f8' },
  '已完成': { color: '#6aa58f', bg: '#eef7f3' },
  '进行中': { color: '#6b8ec9', bg: '#eef3fb' },
  '已取消': { color: '#b0a0a0', bg: '#f6f3f3' },
};

const products = [
  '智能手表', '蓝牙耳机', '机械键盘', '无线充电器', '便携显示器',
  '高清摄像头', '电竞鼠标', '商务背包', '空气净化器', '笔记本支架',
];
const owners = ['张三', '李四', '王五', '赵六', '钱七'];

let idCounter = initialOrders.length + 1;
const generateOrder = (): Order => {
  const idx = idCounter++;
  const statuses: OrderStatus[] = ['待处理', '已完成', '进行中', '已取消'];
  const price = (Math.random() * 900 + 100).toFixed(2);
  const time = new Date().toLocaleString();
  return {
    key: `order-${idx}`,
    orderId: `ORD-${1000 + idx}`,
    product: products[idx % products.length],
    price: `¥${price}`,
    owner: owners[idx % owners.length],
    time,
    status: statuses[idx % statuses.length],
    description: `该订单包含 ${Math.ceil(Math.random() * 3)} 件优质电子商品，预计配送时效为 2-4 个工作日。`,
    totalItems: 1 + (idx % 4),
    shippingAddress: '上海市徐汇区漕溪北路88号',
  };
};

const statusOptions: { value: OrderStatus | ''; label: string }[] = [
  { value: '', label: '全部状态' },
  ...Object.keys(statusMap).map((key) => ({
    value: key as OrderStatus,
    label: key,
  })),
];

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
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
    [filters, orders],
  );

  const handleReset = () => {
    setFilters({ orderId: '', product: '', owner: '', status: '' });
  };

  const handleAdd = () => {
    const newOrder = generateOrder();
    setOrders((prev) => [newOrder, ...prev]);
    message.success(`订单 ${newOrder.orderId} 已新增`);
  };

  const handleDelete = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    message.success(`订单 ${orderId} 已删除`);
  };

  const hasFilter = filters.orderId || filters.product || filters.owner || filters.status;

  const columns: ColumnsType<Order> = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 130,
    },
    {
      title: '产品名称',
      dataIndex: 'product',
      key: 'product',
      width: 140,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 90,
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
      width: 90,
      render: (status: Order['status']) => {
        const s = refinedStatus[status];
        return (
          <Tag
            style={{
              color: s.color,
              background: s.bg,
              border: `1px solid ${s.color}20`,
              borderRadius: 4,
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size={8}>
          <Link to={`/order/${record.orderId}`} className="detail-link">
            查看详情 <span className="link-arrow">→</span>
          </Link>
          <Popconfirm
            title="确认删除"
            description={`确定要删除订单 ${record.orderId} 吗？`}
            onConfirm={() => handleDelete(record.orderId)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="app-shell">
      {/* 页头 */}
      <div className="page-header">
        <div className="page-header-left">
          <Typography.Title level={2} className="page-title">
            订单列表
          </Typography.Title>
          <span className="page-subtitle">
            共 {filteredOrders.length} 笔订单
          </span>
        </div>
        <div className="page-header-right">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增订单
          </Button>
        </div>
      </div>

      {/* 筛选栏 — 毛玻璃 */}
      <div className="filter-bar">
        <Space size={16} wrap>
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
            allowClear
            className="filter-select"
            value={filters.status || undefined}
            onChange={(value) => setFilters((prev) => ({ ...prev, status: value || '' }))}
            options={statusOptions}
          />
          {hasFilter && (
            <Button icon={<ReloadOutlined />} onClick={handleReset} className="filter-reset">
              重置
            </Button>
          )}
        </Space>
      </div>

      {/* 表格 */}
      <Table
        className="order-table"
        columns={columns}
        dataSource={filteredOrders}
        pagination={{
          pageSize: 8,
          showTotal: (total) => `共 ${total} 条`,
          className: 'order-pagination',
        }}
        locale={{
          emptyText: (
            <div className="empty-state">
              <span className="empty-icon">☕</span>
              <p>暂无匹配的订单</p>
              <span className="empty-hint">试试调整筛选条件</span>
            </div>
          ),
        }}
      />
    </div>
  );
}
