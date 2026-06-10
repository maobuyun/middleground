export type OrderStatus = '待处理' | '已完成' | '进行中' | '已取消';

export interface Order {
  key: string;
  orderId: string;
  product: string;
  price: string;
  owner: string;
  time: string;
  status: OrderStatus;
  description: string;
  totalItems: number;
  shippingAddress: string;
}

export const statusMap = {
  '待处理': { color: 'orange', text: '待处理' },
  '已完成': { color: 'green', text: '已完成' },
  '进行中': { color: 'blue', text: '进行中' },
  '已取消': { color: 'red', text: '已取消' },
} as const;

export const orders: Order[] = Array.from({ length: 20 }, (_, index) => {
  const statuses: OrderStatus[] = ['待处理', '已完成', '进行中', '已取消'];
  const products = [
    '智能手表',
    '蓝牙耳机',
    '机械键盘',
    '无线充电器',
    '便携显示器',
    '高清摄像头',
    '电竞鼠标',
    '商务背包',
    '空气净化器',
    '笔记本支架',
  ];
  const owners = ['张三', '李四', '王五', '赵六', '钱七'];
  const addresses = [
    '上海市徐汇区漕溪北路88号',
    '北京市朝阳区建国路99号',
    '广州市天河区体育东路20号',
    '深圳市南山区科技园北区7号',
    '成都市高新区天府大道中段1200号',
  ];
  const price = (Math.random() * 900 + 100).toFixed(2);
  const time = new Date(Date.now() - index * 1000 * 60 * 60 * 6).toLocaleString();

  return {
    key: `order-${index + 1}`,
    orderId: `ORD-${1000 + index}`,
    product: products[index % products.length],
    price: `¥${price}`,
    owner: owners[index % owners.length],
    time,
    status: statuses[index % statuses.length],
    description: `该订单包含 ${Math.ceil(Math.random() * 3)} 件优质电子商品，预计配送时效为 2-4 个工作日。`,
    totalItems: 1 + (index % 4),
    shippingAddress: addresses[index % addresses.length],
  };
});
