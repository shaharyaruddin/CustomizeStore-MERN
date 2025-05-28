import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';

const Hero = () => {

    const snap = useSnapshot(state)


  const products = [
    {
      id: 1,
      name: 'Classic White Tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop',
      description: 'Timeless white shirt with a modern fit.',
    },
    {
      id: 2,
      name: 'Teal Graphic Tee',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop',
      description: 'Bold graphic shirt in our signature teal.',
    },
    {
      id: 3,
      name: 'Casual Black Tee',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop',
      description: 'Sleek black tee for everyday style.',
    },
  ];

  // Split headline into characters for animation
  const headline = "Discover Your Style";
  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotate: -10 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  };

  return (
            <AnimatePresence>
            {snap.intro && (

    <motion.div
      className="bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-white"
      animate={{
        background: [
          'linear-gradient(to top right, #0f2027, #203a43, #2c5364)',
          'linear-gradient(to top right, #2c5364, #203a43, #0f2027)',
          'linear-gradient(to top right, #0f2027, #203a43, #2c5364)',
        ],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    >
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          {headline.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          Premium shirts crafted for comfort and elegance.
        </motion.p>
        <motion.button
          className="bg-white text-[#274856] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          whileTap={{ scale: 0.9 }}
        >
          Shop Now
        </motion.button>
      </motion.section>

      {/* Product Cards Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white text-[#274856] rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 80 }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.3 }}
              />
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.4 }}
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-semibold mb-4">${product.price}</p>
                <motion.button
                  className="bg-[#274856] text-white px-4 py-2 rounded-full hover:bg-[#1e3a44] transition"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
            )}

            </AnimatePresence>

  );
};

export default Hero;