import API from './api'; // or './services/api' if in services folder

// Example usage in a component:
const fetchProducts = async () => {
  try {
    const response = await API.get('/products');
    console.log(response.data);
  } catch (error) {
    console.error('API error:', error);
  }
};