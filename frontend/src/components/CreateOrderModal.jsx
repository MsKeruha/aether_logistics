import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Laptop, Hash, AlertTriangle, User, Phone, MapPin } from 'lucide-react';

const CreateOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    device_name: '',
    device_serial: '',
    problem_description: '',
    priority: 'medium',
    client_name: '',
    client_phone: '',
    client_address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass-card w-full max-w-2xl bg-white shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-2xl font-bold font-aether text-slate-800">Реєстрація нового замовлення</h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 transition-all shadow-sm">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Device Info */}
              <div className="space-y-6">
                <h4 className="text-sm font-black text-violet-600 uppercase tracking-widest">Інформація про пристрій</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Модель пристрою</label>
                  <div className="relative">
                    <Laptop className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="напр. MacBook Pro 14 M3"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all"
                      value={formData.device_name}
                      onChange={(e) => setFormData({...formData, device_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Серійний номер</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text"
                      placeholder="S/N 123456789"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all"
                      value={formData.device_serial}
                      onChange={(e) => setFormData({...formData, device_serial: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Пріоритет</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Низький</option>
                    <option value="medium">Середній</option>
                    <option value="high">Високий</option>
                    <option value="urgent">Терміново</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-6">
                <h4 className="text-sm font-black text-pink-600 uppercase tracking-widest">Дані клієнта</h4>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">ПІБ Клієнта</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="Іван Іванов"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all"
                      value={formData.client_name}
                      onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="tel"
                      placeholder="+380..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all"
                      value={formData.client_phone}
                      onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Адреса</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text"
                      placeholder="Київ, вул..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all"
                      value={formData.client_address}
                      onChange={(e) => setFormData({...formData, client_address: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1">Опис проблеми</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Детально опишіть несправність..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-violet-500 outline-none transition-all resize-none"
                  value={formData.problem_description}
                  onChange={(e) => setFormData({...formData, problem_description: e.target.value})}
                ></textarea>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Скасувати
              </button>
              <button 
                type="submit"
                className="flex-1 aether-btn py-4 shadow-xl shadow-violet-200"
              >
                Створити замовлення
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateOrderModal;
