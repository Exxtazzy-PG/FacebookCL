import { useState } from 'react';
import { fakeProducts } from '../data/fakeUsers';
import './Marketplace.css';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'vehicles', name: 'Vehicles' },
    { id: 'home', name: 'Home & Garden' }
  ];

  const additionalProducts = [
    {
      id: 4,
      title: 'Wireless Headphones',
      price: 149,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      location: 'Boston, MA',
      seller: 'Audio Pro',
      condition: 'New',
      category: 'electronics'
    },
    {
      id: 5,
      title: 'Vintage Leather Jacket',
      price: 85,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
      location: 'Seattle, WA',
      seller: 'Fashion Finds',
      condition: 'Good',
      category: 'fashion'
    },
    {
      id: 6,
      title: 'Electric Bike',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      location: 'Portland, OR',
      seller: 'Bike World',
      condition: 'Like New',
      category: 'vehicles'
    }
  ];

  const allProducts = [...fakeProducts, ...additionalProducts];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleSaveItem = (productId) => {
    if (savedItems.includes(productId)) {
      setSavedItems(savedItems.filter(id => id !== productId));
    } else {
      setSavedItems([...savedItems, productId]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert('Order placed successfully! This is a demo checkout.');
    setCart([]);
    setShowCheckout(false);
  };

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
        <button 
          className={`save-btn ${savedItems.includes(product.id) ? 'saved' : ''}`}
          onClick={() => handleSaveItem(product.id)}
        >
          {savedItems.includes(product.id) ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <div className="product-price">${product.price}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-details">
          <span className="product-condition">{product.condition}</span>
          <span className="product-location">{product.location}</span>
        </div>
        <div className="product-seller">Sold by {product.seller}</div>
      </div>
      
      <div className="product-actions">
        <button 
          className="btn btn-primary"
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </button>
        <button className="btn btn-secondary">Message Seller</button>
      </div>
    </div>
  );

  return (
    <div className="marketplace-page">
      <div className="marketplace-sidebar">
        <h2>Marketplace</h2>
        
        <nav className="marketplace-nav">
          <button 
            className={`nav-item ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            <span className="nav-icon">🛍️</span>
            Browse All
          </button>
          <button 
            className={`nav-item ${activeTab === 'selling' ? 'active' : ''}`}
            onClick={() => setActiveTab('selling')}
          >
            <span className="nav-icon">💰</span>
            Selling
          </button>
          <button 
            className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <span className="nav-icon">❤️</span>
            Saved
            {savedItems.length > 0 && (
              <span className="saved-count">{savedItems.length}</span>
            )}
          </button>
          <button 
            className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <span className="nav-icon">🛒</span>
            Cart
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </button>
        </nav>

        <div className="filters-section">
          <h4>Categories</h4>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="marketplace-content">
        {activeTab === 'browse' && (
          <div className="marketplace-browse">
            <div className="browse-header">
              <div className="search-section">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search Marketplace"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary">
                  Create Listing
                </button>
              </div>
              
              <div className="results-header">
                <h3>
                  {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                  {filteredProducts.length > 0 && ` · ${filteredProducts.length} items`}
                </h3>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'selling' && (
          <div className="selling-section">
            <div className="selling-header">
              <h3>Your Listings</h3>
              <button className="btn btn-primary">Create New Listing</button>
            </div>
            
            <div className="no-listings">
              <div className="no-listings-icon">📦</div>
              <h4>You haven't created any listings yet</h4>
              <p>Start selling by creating your first listing</p>
              <button className="btn btn-primary">Create Listing</button>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="saved-section">
            <h3>Saved Items</h3>
            {savedItems.length > 0 ? (
              <div className="products-grid">
                {allProducts
                  .filter(product => savedItems.includes(product.id))
                  .map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="no-saved-items">
                <div className="no-saved-icon">❤️</div>
                <h4>No saved items</h4>
                <p>Items you save will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="cart-section">
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              {cart.length > 0 && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              )}
            </div>

            {cart.length > 0 ? (
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p>{item.condition} • {item.location}</p>
                      <div className="cart-item-price">${item.price} each</div>
                    </div>
                    <div className="cart-item-quantity">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="cart-item-total">
                      ${item.price * item.quantity}
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                <div className="cart-summary">
                  <div className="total-price">
                    <strong>Total: ${getTotalPrice()}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Add items to your cart to see them here</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('browse')}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Checkout</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCheckout(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="checkout-content">
              <div className="order-summary">
                <h4>Order Summary</h4>
                {cart.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.title} × {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="checkout-total">
                  <strong>Total: ${getTotalPrice()}</strong>
                </div>
              </div>
              
              <div className="payment-section">
                <h4>Payment Information</h4>
                <div className="form-group">
                  <input type="text" placeholder="Card Number" />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVV" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cardholder Name" />
                </div>
              </div>
              
              <div className="checkout-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;