import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ShopNow = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(state);

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
    {
      id: 4,
      name: 'Vintage Denim Shirt',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=500&auto=format&fit=crop',
      description: 'Rugged denim with a retro vibe.',
    },
    {
      id: 5,
      name: 'Red Striped Tee',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop',
      description: 'Vibrant striped tee for a bold look.',
    },
    {
      id: 6,
      name: 'Navy Polo Shirt',
      price: 39.99,
      image: 'https://img.joomcdn.net/03b09d587518817aaa1eaf675ec2721e8b8ecb10_1024_1024.jpeg',
      description: 'Classic polo for casual elegance.',
    },
    {
      id: 7,
      name: 'Grey Hoodie Tee',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop',
      description: 'Cozy hoodie-style tee for cool days.',
    },
    {
      id: 8,
      name: 'Olive Green Tee',
      price: 30.99,
      image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=500&auto=format&fit=crop',
      description: 'Earthy green tee with a relaxed fit.',
    },
    {
      id: 9,
      name: 'Printed Floral Shirt',
      price: 37.99,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop',
      description: 'Stylish floral print for a standout look.',
    },
  ];

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.div
          className="bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-white relative"
          animate={{
            background: [
              'linear-gradient(to top right, #0f2027, #203a43, #2c5364)',
              'linear-gradient(to top right, #2c5364, #203a43, #0f2027)',
              'linear-gradient(to top right, #0f2027, #203a43, #2c5364)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 left-4 text-white text-2xl p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
            onClick={() => {
              state.intro = false;
              navigate('/');
            }}
          >
            <IoArrowBack />
          </motion.button>

          {/* Product Cards Section */}
          <section className="max-w-7xl mx-auto px-4 py-12 pt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-center mb-8"
            >
              Explore Our Collection
            </motion.h2>
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
                      onClick={() => {
                        navigate('/cart');

                        state.addToCart(product);
                        state.intro = true; 
                      }}
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

export default ShopNow;