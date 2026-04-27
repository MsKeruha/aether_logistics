import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ClipboardList, LogOut, Cpu, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 px-6 py-4 border-slate-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-violet-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-violet-200">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-aether tracking-tight text-slate-900">
            AETHER<span className="text-violet-600">LOGISTICS</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 font-semibold transition-all">
            <LayoutDashboard size={18} />
            <span>Панель</span>
          </Link>
          <Link to="/orders" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 font-semibold transition-all">
            <ClipboardList size={18} />
            <span>Замовлення</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-2 text-slate-500 hover:text-violet-600 font-semibold transition-all">
            <Settings size={18} />
            <span>Налаштування</span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 px-3.5 py-1.5 glass-card !rounded-full border-slate-200 shadow-none">
            <img 
              src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Aether"} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            />
            <span className="text-sm font-bold text-slate-700 hidden lg:block">
              {user?.full_name?.split(' ')[0] || 'Адмін'}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2.5 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
            title="Вийти"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
