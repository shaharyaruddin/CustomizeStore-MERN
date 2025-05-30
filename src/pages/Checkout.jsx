import React, { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Checkout = () => {
  const snap = useSnapshot(state);
  const receiptRef = useRef(null);
  const navigate = useNavigate();
  const [orderId] = useState(() => 'ORD' + Date.now());

  const handleDownloadReceipt = async () => {
    const element = receiptRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${orderId}_receipt.pdf`);
  };

  const total = snap.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 relative text-white"
        >
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-white text-2xl p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
          >
            <IoArrowBack />
          </motion.button>

          {/* Heading */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extrabold text-center mb-6"
          >
            Checkout Summary
          </motion.h1>

          {/* Order Receipt Section */}
          <motion.div
            ref={receiptRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white text-black rounded-xl p-6 shadow-lg w-full"
          >
            <h2 className="text-2xl font-bold mb-2">Order Receipt</h2>
            <p className="text-sm text-gray-700 mb-4">Order ID: {orderId}</p>

            <div className="space-y-4">
              {snap.cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </motion.div>

          {/* Download Button */}
          <motion.button
            onClick={handleDownloadReceipt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Download Receipt (PDF)
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Checkout;
