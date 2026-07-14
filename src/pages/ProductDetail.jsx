import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, updateProduct, deleteProduct } from '../store/productSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.products);

  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct) {
      setEditTitle(currentProduct.title);
    }
  }, [currentProduct]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, data: { title: editTitle } }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id));
      navigate('/');
    }
  };

  if (!currentProduct) return <div className="loading">Loading detail...</div>;

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="btn-back">
        &larr; Back to Home
      </button>

      <div className="detail-card">
        <div className="detail-header">
          {currentProduct.thumbnail && (
             <img src={currentProduct.thumbnail} alt={currentProduct.title} className="detail-img"/>
          )}
          <div>
            <h2>{currentProduct.title}</h2>
            {currentProduct.description && <p>{currentProduct.description}</p>}
            {currentProduct.price && <h3 className="price">${currentProduct.price}</h3>}
          </div>
        </div>

        <div className="action-section">
          <form onSubmit={handleUpdate} className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="btn-primary">Update Title</button>
          </form>

          <button onClick={handleDelete} className="btn-danger">
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;