import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('myProducts'));
    if (savedProducts) {
      setProducts(savedProducts);
    } else {
      fetch('http://localhost:5000/api/products')
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Data nahi aaya:", err));
    }
  }, []);

  // 🛠️ ADD FUNCTION
  const handleAddProduct = () => {
    const productWithId = { ...newProduct, price: Number(newProduct.price), _id: Date.now().toString() };
    const updatedList = [...products, productWithId];
    setProducts(updatedList);
    localStorage.setItem('myProducts', JSON.stringify(updatedList));
    setNewProduct({ name: '', price: '', description: '' });
  };

  // 🗑️ DELETE FUNCTION (Naya add kiya)
  const deleteProduct = (id) => {
    const updatedList = products.filter((item) => item._id !== id);
    setProducts(updatedList);
    localStorage.setItem('myProducts', JSON.stringify(updatedList));
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 My E-Commerce Store</h1>
        <input className="search-box" placeholder="Saamaan dhoondho..." onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="cart-box" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>➕ Add New Product (Admin)</h2>
        <input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
        <input placeholder="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
        <button className="add-btn" onClick={handleAddProduct}>Add Product</button>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div className="grid-layout">
          {filteredProducts.map((item, index) => (
            <div key={index} className="product-card">
              <h3>👕 {item.name}</h3>
              <p>₹{item.price}</p>
              
              {/* 🗑️ DELETE BUTTON YAHAN HAI */}
              <button onClick={() => deleteProduct(item._id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer', marginBottom: '10px' }}>
                Delete 🗑️
              </button>

              <button className="add-btn" onClick={() => setCart([...cart, item])}>Add to Cart 🛒</button>
            </div>
          ))}
        </div>

        <div className="cart-box">
          <h2>Your Cart 📦</h2>
          {cart.map((item, i) => <p key={i}>{item.name}</p>)}
        </div>
      </div>
    </div>
  );
}

export default App;