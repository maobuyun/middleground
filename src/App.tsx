import { Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import OrderDetail from './pages/OrderDetail';
import OrderList from './pages/OrderList';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Routes>
  );
}
