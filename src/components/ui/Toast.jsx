import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const toastContainerStyle = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  pointerEvents: 'none',
};

const toastVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.95 },
};

const icons = {
  success: <FiCheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <FiXCircle className="h-5 w-5 text-red-500" />,
  warning: <FiAlertCircle className="h-5 w-5 text-amber-500" />,
  info: <FiInfo className="h-5 w-5 text-cyan-500" />,
};

const backgrounds = {
  success: 'bg-emerald-50 border-emerald-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-cyan-50 border-cyan-200',
};

const Toast = ({ toasts = [], removeToast }) => {
  return (
    <div style={toastContainerStyle} pointerEvents="auto" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`flex items-start gap-3 rounded-xl border px-5 py-4 shadow-lg min-w-[300px] max-w-[420px] ${backgrounds[toast.type]}`}
            pointerEvents="auto"
            role="alert"
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="font-semibold text-slate-900">{toast.title}</p>
              )}
              {toast.message && (
                <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Dismiss"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

let toastId = 0;
const listeners = new Set();
const state = { toasts: [] };

const notify = (type, title, message) => {
  const id = ++toastId;
  const newToast = { id, type, title, message };
  state.toasts = [...state.toasts, newToast];
  listeners.forEach((fn) => fn(state.toasts));

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    remove(id);
  }, 5000);
};

const remove = (id) => {
  state.toasts = state.toasts.filter((t) => t.id !== id);
  listeners.forEach((fn) => fn(state.toasts));
};

const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const useToast = () => {
  const [toasts, setToasts] = useState(state.toasts);

  useEffect(() => subscribe(setToasts), []);

  return {
    toasts,
    success: (title, message) => notify('success', title, message),
    error: (title, message) => notify('error', title, message),
    warning: (title, message) => notify('warning', title, message),
    info: (title, message) => notify('info', title, message),
    remove,
  };
};

export const ToastProvider = ({ children }) => {
  const { toasts, remove } = useToast();
  return (
    <>
      {children}
      <Toast toasts={toasts} removeToast={remove} />
    </>
  );
};

export default Toast;