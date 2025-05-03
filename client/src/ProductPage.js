import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  // Fetch all products or single product based on URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const response = await API.get(`/products/${productId}`);
          setSingleProduct(response.data);
        } else {
          const response = await API.get('/products');
          setProducts(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Single Product View
  if (singleProduct) {
    return (
      <div className="app">
        <nav className="navbar">
          <button onClick={() => navigate(-1)}>← Back to Products</button>
          <h1>Product Details</h1>
        </nav>
        
        <main className="single-product">
          <div className="product-image-container">
            <div 
              className="product-image" 
              style={{ backgroundImage: `url(${singleProduct.image || 'placeholder-image.jpg'})` }}
            />
          </div>
          <div className="product-details">
            <h2>{singleProduct.name}</h2>
            <p className="price">${singleProduct.price.toFixed(2)}</p>
            <p className="description">{singleProduct.description || 'No description available'}</p>
            <div className="customization-options">
              <h3>Customization Options</h3>
              {/* Add your customization form here */}
            </div>
            <button className="btn">Add to Cart</button>
          </div>
        </main>
      </div>
    );
  }

  // Product Listing View
  return (
    <div className="app">
      <nav className="navbar">
        <h1>Custom Apparel Shop</h1>
      </nav>

      <main>
        <div className="products-grid">
          {products.map(product => (
            <div 
              key={product._id} 
              className="product-card"
              onClick={() => handleProductClick(product._id)}
            >
              <div 
                className="product-image" 
                style={{ backgroundImage: `url(${product.image || 'placeholder-image.jpg'})` }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <button className="btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;