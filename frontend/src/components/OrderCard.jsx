import React from 'react';
import { Clock, Tag, ChevronRight, AlertCircle, Laptop } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const OrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'new': return 'status-new';
      case 'in_progress': return 'status-progress';
      case 'completed': return 'status-completed';
      case 'waiting_parts': return 'status-waiting';
      default: return 'status-new';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'Новий';
      case 'in_progress': return 'В роботі';
      case 'completed': return 'Виконано';
      case 'waiting_parts': return 'Очікує запчастин';
      case 'diagnostics': return 'Діагностика';
      default: return status;
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high' || priority === 'urgent') {
      return <AlertCircle className="text-rose-500" size={14} />;
    }
    return <Tag className="text-slate-400" size={14} />;
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 border-slate-100 hover:border-violet-300 transition-all cursor-pointer group shadow-xl shadow-slate-200/40 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Laptop size={80} />
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">
            ID: {order.order_number}
          </span>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
            {order.device_name}
          </h3>
        </div>
        <span className={clsx("status-badge whitespace-nowrap shadow-sm", getStatusClass(order.status))}>
          {getStatusLabel(order.status)}
        </span>
      </div>

      <p className="text-slate-600 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
        {order.problem_description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <div className="flex items-center gap-5 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span className="uppercase">3 дні</span>
          </div>
          <div className="flex items-center gap-1.5">
            {getPriorityIcon(order.priority)}
            <span className="uppercase tracking-wider">{order.priority}</span>
          </div>
        </div>
        <button className="p-2.5 bg-slate-50 group-hover:bg-violet-600 text-slate-400 group-hover:text-white rounded-xl transition-all shadow-sm">
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default OrderCard;
