import { Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import OrderDetail from './pages/detail/OrderDetail';
import OrderList from './pages/list/OrderList';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Routes>
  );
}
