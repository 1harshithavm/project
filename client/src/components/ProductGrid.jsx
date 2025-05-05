{products.map(product => (
    <div key={product.id} className="product-card">
      {product.discount && <span className="discount-tag">-{product.discount}%</span>}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">¥{product.price} <s>¥{product.originalPrice}</s></p>
      <button>Add to Cart</button>
    </div>
  ))}