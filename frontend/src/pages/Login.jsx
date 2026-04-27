import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('admin@aether.com');
  const [password, setPassword] = useState('admin123');
  const { login, showNotification } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      // Use the new notification system once integrated
      if (showNotification) {
        showNotification('Помилка входу', 'Невірний email або пароль. Спробуйте admin@aether.com / admin123', 'error');
      } else {
        alert('Помилка входу. Спробуйте admin@aether.com / admin123');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/50 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100/50 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-white rounded-3xl mb-6 shadow-xl shadow-violet-100 animate-float">
            <Cpu className="text-violet-600 w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold font-aether mb-2 tracking-tight text-slate-900">
            AETHER<span className="text-violet-600">LOGISTICS</span>
          </h1>
          <p className="text-slate-500 font-medium">Система управління сервісним центром</p>
        </div>

        <div className="glass-card p-8 border-white/50 shadow-2xl shadow-violet-200/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Електронна пошта</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all placeholder:text-slate-300"
                  placeholder="admin@aether.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 outline-none transition-all placeholder:text-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full aether-btn flex items-center justify-center gap-2 group py-4 shadow-lg shadow-violet-200">
              <span className="text-lg">Увійти в систему</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
              <ShieldCheck size={14} />
              <span>Захищене з'єднання</span>
            </div>
            <p className="text-sm text-slate-500">
              Маєте проблеми з доступом? <a href="#" className="text-violet-600 font-semibold hover:underline">IT-підтримка</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Secure Access Terminal v1.1.0</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
