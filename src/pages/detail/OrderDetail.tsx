import { Button, Card, Descriptions, Tag, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { orders, statusMap } from '../../data/orders';
import './index.less';

export default function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const order = orders.find((item) => item.orderId === orderId);

  if (!order) {
    return (
      <div className="app-shell">
        <Typography.Title level={3}>订单未找到</Typography.Title>
        <Typography.Paragraph>请返回订单列表查看有效订单号。</Typography.Paragraph>
        <Button type="primary" onClick={() => navigate('/')}>返回列表</Button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Typography.Title level={2}>订单详情</Typography.Title>
      <Card className="order-detail-card">
        <Typography.Title level={4}>{order.product}</Typography.Title>
        <Typography.Paragraph type="secondary">订单号：{order.orderId}</Typography.Paragraph>
        <Typography.Paragraph>{order.description}</Typography.Paragraph>
      </Card>

      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="订单号">{order.orderId}</Descriptions.Item>
          <Descriptions.Item label="产品名称">{order.product}</Descriptions.Item>
          <Descriptions.Item label="价格">{order.price}</Descriptions.Item>
          <Descriptions.Item label="负责人">{order.owner}</Descriptions.Item>
          <Descriptions.Item label="时间">{order.time}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={statusMap[order.status].color}>{order.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="商品数量">{order.totalItems} 件</Descriptions.Item>
          <Descriptions.Item label="配送地址">{order.shippingAddress}</Descriptions.Item>
        </Descriptions>
      </Card>

      <div className="order-detail-actions">
        <Button onClick={() => navigate(-1)}>返回列表</Button>
      </div>
    </div>
  );
}
