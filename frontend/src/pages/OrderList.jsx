import React, { useState, useEffect } from 'react';
import { Filter, Search, SlidersHorizontal, ArrowUpDown, Plus } from 'lucide-react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import CreateOrderModal from '../components/CreateOrderModal';
import { useAuth } from '../context/AuthContext';

const OrderList = () => {
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || '/api';
  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('aether_token');
      const response = await axios.get(`${API_URL}/orders/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (data) => {
    try {
      const token = localStorage.getItem('aether_token');
      await axios.post(`${API_URL}/orders/`, {
        ...data,
        customer_id: 1 // Default for MVP
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification('Успіх', `Замовлення для ${data.device_name} успішно додано!`, 'success');
      fetchOrders();
    } catch (error) {
      showNotification('Помилка', 'Не вдалося створити замовлення. Перевірте сервер.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-aether text-slate-900 tracking-tight">Управління замовленнями</h1>
          <p className="text-slate-500 font-medium">Всього в системі: {orders.length} записів</p>
        </div>
        <button 
          onClick={() => setOrderModalOpen(true)}
          className="aether-btn flex items-center gap-2 px-6"
        >
          <Plus size={20} />
          <span>Створити замовлення</span>
        </button>
      </header>

      <div className="glass-card p-5 flex flex-wrap gap-4 items-center justify-between border-white shadow-lg shadow-slate-200/50">
        <div className="flex gap-4 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Пошук за номером, пристроєм або клієнтом..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 transition-all font-bold text-slate-600 shadow-sm">
            <Filter size={18} />
            <span>Фільтри</span>
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 border border-transparent hover:border-slate-100 transition-all"><ArrowUpDown size={20} /></button>
          <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 border border-transparent hover:border-slate-100 transition-all"><SlidersHorizontal size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400">Завантаження...</div>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-400">Замовлень не знайдено</div>
        )}
      </div>

      <CreateOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setOrderModalOpen(false)} 
        onSubmit={handleCreateOrder}
      />
    </div>
  );
};

export default OrderList;
