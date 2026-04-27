import React from 'react';
import { User, Bell, Shield, Palette, Database, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const sections = [
    { title: 'Профіль', icon: <User size={20} />, description: 'Управління персональними даними та аватаром' },
    { title: 'Сповіщення', icon: <Bell size={20} />, description: 'Налаштування системних та email повідомлень' },
    { title: 'Безпека', icon: <Shield size={20} />, description: 'Зміна паролю та двофакторна автентифікація' },
    { title: 'Інтерфейс', icon: <Palette size={20} />, description: 'Налаштування кольорової схеми та шрифтів' },
    { title: 'Дані', icon: <Database size={20} />, description: 'Резервне копіювання та експорт замовлень' },
    { title: 'Пристрої', icon: <Smartphone size={20} />, description: 'Керування підключеним обладнанням' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold font-aether mb-2 text-slate-900">Налаштування системи</h1>
        <p className="text-slate-500">Персоналізуйте Aether Logistics під ваші потреби.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card p-6 border-white shadow-xl shadow-slate-200/50 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
            </div>
            <p className="text-slate-500 text-sm">{section.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 bg-white border-white shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-slate-900">
          <Shield size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Системна інформація</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-black mb-1.5 tracking-wider">Версія</p>
              <p className="font-mono text-slate-700 font-bold">v1.1.0-stable</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-black mb-1.5 tracking-wider">Середовище</p>
              <p className="font-mono text-emerald-600 font-bold">Production</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-black mb-1.5 tracking-wider">БД</p>
              <p className="font-mono text-slate-700 font-bold">SQLite (Active)</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-black mb-1.5 tracking-wider">Node</p>
              <p className="font-mono text-slate-700 font-bold">v20.20.2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
