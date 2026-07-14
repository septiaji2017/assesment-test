import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
});

export const fetchProductDetail = createAsyncThunk('products/fetchOne', async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return await response.json();
});

export const addProduct = createAsyncThunk('products/add', async (productData) => {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return await response.json();
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
        state.currentProduct = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.currentProduct = null;
      });
  },
});

export default productSlice.reducer;