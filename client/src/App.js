import React from 'react';
import './index.css';

function App() {
  const products = [
    {
      id: 1,
      name: 'Custom T-Shirt',
      price: '$19.99',
      type: 'T-Shirt',
      image: 'https://via.placeholder.com/300x300?text=T-Shirt'
    },
    {
      id: 2,
      name: 'Premium Hoodie',
      price: '$39.99',
      type: 'Hoodie',
      image: 'https://via.placeholder.com/300x300?text=Hoodie'
    },
    {
      id: 3,
      name: 'Sport Tank Top',
      price: '$24.99',
      type: 'Tank Top',
      image: 'https://via.placeholder.com/300x300?text=Tank+Top'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">CustomWear</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-blue-500">Home</a>
          <a href="#" className="hover:text-blue-500">Shop</a>
          <a href="#" className="hover:text-blue-500">Design Studio</a>
          <a href="#" className="hover:text-blue-500">About</a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500">Login</a>
          <a href="#" className="hover:text-blue-500">Register</a>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">0</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Design Your Unique Style</h1>
        <p className="text-lg mb-6 text-gray-600 max-w-2xl mx-auto">
          Create custom-printed clothing that expresses your personality
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-medium">
          Start Designing
        </button>
      </section>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">{product.type}</span>
                <h3 className="text-xl font-bold mt-2 mb-1 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">From {product.price}</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                  Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 CustomWear. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;