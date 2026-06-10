# Middleground

这是一个基于 React + Ant Design 的中台测试项目。该项目包含一个订单列表页和订单详情页，支持路由跳转与数据展示。

## 功能

- 订单列表展示
- 订单状态高亮显示
- 查看订单详情
- 支持 React Router 路由导航
- 使用 Ant Design UI 组件

## 运行方式

```bash
npm install
npm run dev
```

然后打开浏览器访问 `http://localhost:5173`。

## 构建

```bash
npm run build
```

## 项目结构

- `src/App.tsx`：路由与首页列表
- `src/pages/OrderDetail.tsx`：订单详情页
- `src/data/orders.ts`：订单 mock 数据
- `src/main.tsx`：应用入口
