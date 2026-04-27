import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search,
  Settings2,
  ArrowRight,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import CreateOrderModal from '../components/CreateOrderModal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('aether_token');
      const response = await axios.get(`${API_URL}/orders/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.slice(0, 4)); // Show only top 4 on dashboard
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders', error);
      // Fallback to static data if API fails
      setOrders([
        { id: 1, order_number: 'AE-7F3A21BC', device_name: 'MacBook Pro 16 M2', problem_description: 'Мерехтіння екрану та проблеми з АКБ', status: 'in_progress', priority: 'high' },
        { id: 2, order_number: 'AE-9B2C4D5E', device_name: 'iPhone 15 Pro', problem_description: 'Розбите скло та заміна модуля камери', status: 'waiting_parts', priority: 'medium' },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = [
    { label: 'Активні замовлення', value: '24', icon: <Clock className="text-violet-600" />, trend: '+12%', color: 'bg-violet-50' },
    { label: 'Нові клієнти', value: '156', icon: <Users className="text-pink-600" />, trend: '+5%', color: 'bg-pink-50' },
    { label: 'Завершено за тиждень', value: '42', icon: <TrendingUp className="text-emerald-600" />, trend: '+18%', color: 'bg-emerald-50' },
    { label: 'Ефективність', value: '94%', icon: <BarChart3 className="text-blue-600" />, trend: '+2%', color: 'bg-blue-50' },
  ];

  const handleCreateOrder = async (data) => {
    try {
      const token = localStorage.getItem('aether_token');
      await axios.post(`${API_URL}/orders/`, {
        ...data,
        customer_id: 1 // For MVP, we assign to first customer
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification('Успіх', `Замовлення для ${data.device_name} успішно створено!`, 'success');
      fetchOrders(); // Refresh list
    } catch (error) {
      showNotification('Помилка', 'Не вдалося створити замовлення. Перевірте з\'єднання з сервером.', 'error');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-aether mb-2 text-slate-900 tracking-tight">Панель управління 🌌</h1>
          <p className="text-slate-500 font-medium">Огляд активності та розподілених замовлень сервісного центру.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Швидкий пошук..." 
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setOrderModalOpen(true)}
            className="aether-btn flex items-center gap-2 px-6"
          >
            <Plus size={20} />
            <span>Нове замовлення</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="glass-card p-6 flex items-center justify-between border-white shadow-xl shadow-slate-200/50"
          >
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-emerald-600 text-xs font-bold">{stat.trend}</span>
                <span className="text-slate-400 text-[10px] uppercase font-bold">vs last month</span>
              </div>
            </div>
            <div className={`p-4 ${stat.color} rounded-2xl shadow-inner`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-bold font-aether text-slate-800">Активні замовлення</h2>
            <Link to="/orders" className="flex items-center gap-1 text-violet-600 hover:text-violet-700 text-sm font-bold transition-colors group">
              <span>Дивитись всі</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 py-20 text-center text-slate-400 font-medium">Завантаження замовлень...</div>
            ) : orders.length > 0 ? (
              orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="col-span-2 py-20 text-center text-slate-400 font-medium">Замовлень поки немає</div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <div className="glass-card p-7 border-white shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg text-slate-800">Навантаження майстрів</h3>
              <Settings2 size={18} className="text-slate-400" />
            </div>
            <div className="space-y-6">
              {[
                { name: 'Ivan Tech', load: 85, color: 'bg-violet-500' },
                { name: 'Maria Repair', load: 60, color: 'bg-pink-500' },
                { name: 'Alex Fix', load: 30, color: 'bg-sky-500' },
              ].map((tech, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 font-semibold">{tech.name}</span>
                    <span className="text-slate-400 font-bold">{tech.load}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.load}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${tech.color} rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-7 relative overflow-hidden group border-white shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-violet-50">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-400/10 blur-3xl group-hover:bg-violet-400/20 transition-all"></div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-violet-600 rounded-lg text-white">
                <FileText size={18} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Звітність</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Генерація щомісячних звітів по успішності ремонту та закупівлі запчастин.
            </p>
            <button className="text-xs font-black text-violet-600 uppercase tracking-widest hover:text-violet-800 transition-colors">
              СФОРМУВАТИ ЗВІТ →
            </button>
          </div>
        </div>
      </div>

      <CreateOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setOrderModalOpen(false)} 
        onSubmit={handleCreateOrder}
      />
    </div>
  );
};

export default Home;
