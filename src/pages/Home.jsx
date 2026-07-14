import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { fetchProducts, addProduct } from '../store/productSlice';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { items, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    dispatch(addProduct({ title: newTitle }));
    setNewTitle('');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h2>Hi, {user?.firstName}</h2>
        <button onClick={() => dispatch(logout())} className="logout-btn">
          Logout
        </button>
      </nav>

      <main className="main-content">
        <form onSubmit={handleAddProduct} className="add-form">
          <input
            type="text"
            placeholder="New Product Title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary">Add Product</button>
        </form>

        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="product-grid">
            {items.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.thumbnail && (
                  <img src={product.thumbnail} alt={product.title} className="product-img" />
                )}
                <h3>{product.title}</h3>
                {product.price && <p className="price">${product.price}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;