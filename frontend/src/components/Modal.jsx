import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error': return { icon: <AlertCircle className="text-rose-500" />, bg: 'bg-rose-50' };
      case 'success': return { icon: <CheckCircle2 className="text-emerald-500" />, bg: 'bg-emerald-50' };
      default: return { icon: <Info className="text-violet-500" />, bg: 'bg-violet-50' };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass-card w-full max-w-md overflow-hidden bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${styles.bg}`}>
                {styles.icon}
              </div>
              <h3 className="text-xl font-bold font-aether text-slate-800">{title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-8">
            {children}
          </div>
          <div className="p-6 bg-slate-50/50 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
            >
              Зрозуміло
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
