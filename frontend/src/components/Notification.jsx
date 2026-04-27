import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const Notification = ({ message, type = 'info', onClose, title }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle2 className="text-emerald-500" />,
    error: <AlertCircle className="text-rose-500" />,
    info: <Info className="text-violet-500" />
  };

  const bgColors = {
    success: 'border-emerald-100 bg-emerald-50/50',
    error: 'border-rose-100 bg-rose-50/50',
    info: 'border-violet-100 bg-violet-50/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`fixed top-6 right-6 z-[200] flex items-start gap-4 p-4 min-w-[320px] max-w-md backdrop-blur-md border rounded-2xl shadow-xl ${bgColors[type]}`}
    >
      <div className="mt-1">{icons[type]}</div>
      <div className="flex-grow">
        {title && <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>}
        <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Notification;
