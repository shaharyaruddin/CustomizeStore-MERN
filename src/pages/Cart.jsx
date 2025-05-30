import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSnapshot } from 'valtio';
import { IoArrowBack } from 'react-icons/io5';
import state from '../store';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(state);

  // Function to update item quantity
  const updateQuantity = (id, delta) => {
    state.cartItems = state.cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    state.cartItems = state.cartItems.filter((item) => item.id !== id);
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl p-6 sm:p-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 relative"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 left-4 text-white text-2xl p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
              onClick={() => navigate('/')}
            >
              <IoArrowBack />
            </motion.button>

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 120 }}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center tracking-tight"
            >
              Your Cart
            </motion.h1>

            {snap.cartItems.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-white text-center"
              >
                Your cart is empty.
              </motion.p>
            ) : (
              <div className="space-y-4">
                {snap.cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/10 rounded-xl transition-all duration-300"
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      initial={{ rotate: -10, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md mb-4 sm:mb-0"
                    />
                    <div className="flex-1 ml-0 sm:ml-4 text-center sm:text-left">
                      <h2 className="text-lg sm:text-xl font-semibold text-white">{item.name}</h2>
                      <p className="text-sm text-gray-200">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                    </div>
                    <motion.div
                      className="flex items-center space-x-4 mt-4 sm:0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gray-800/50 text-white rounded-full flex items-center justify-center shadow-md"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </motion.button>
                      <span className="text-white font-medium">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gray-800/50 text-white rounded-full flex items-center justify-center shadow-md"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, color: '#f87171' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-300 text-sm font-medium"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <p className="text-xl sm:text-2xl font-bold text-white">
                Total: ${snap.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <motion.button
                onClick={() => navigate('/checkout')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto"
                disabled={snap.cartItems.length === 0}
              >
                Checkout
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;