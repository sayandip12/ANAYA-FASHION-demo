import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { productService } from '../../services/productService';
import { storeService } from '../../services/storeService';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products'); // products, store
  const [products, setProducts] = useState([]);
  const [storeConfig, setStoreConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', gender: 'Women', price: '', description: '', 
    fabric: '', sizes: '', availability: 'In Stock', image: '', occasions: ''
  });
  
  // Store Config Form State
  const [storeFormData, setStoreFormData] = useState({
    name: '', tagline: '', phone: '', whatsappNumber: '', address: '', storeHours: '', mapEmbedUrl: ''
  });

  useEffect(() => {
    const init = async () => {
      const isAuth = await authService.checkAuth();
      if (!isAuth) {
        navigate('/admin/login');
        return;
      }
      
      // Subscribe to auth changes
      const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/admin/login');
        }
      });

      loadData();
      
      return () => {
        subscription.unsubscribe();
      };
    };
    init();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, config] = await Promise.all([
        productService.getProducts(),
        storeService.getStoreConfig()
      ]);
      setProducts(prods);
      setStoreConfig(config);
      setStoreFormData(config);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin');
  };

  const handleProductDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map(s => s.trim()) : formData.sizes,
        occasions: typeof formData.occasions === 'string' ? formData.occasions.split(',').map(s => s.trim()).filter(Boolean) : formData.occasions
      };

      if (editingProduct) {
        const updated = await productService.updateProduct(editingProduct.id, payload);
        setProducts(products.map(p => p.id === updated.id ? updated : p));
      } else {
        const added = await productService.addProduct(payload);
        setProducts([added, ...products]);
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      alert(`Failed to save product: ${err.message || 'Database error'}`);
    }
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
      occasions: Array.isArray(product.occasions) ? product.occasions.join(', ') : product.occasions || ''
    });
    setShowProductForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await productService.uploadImage(file);
        setFormData({ ...formData, image: url });
      } catch (err) {
        alert('Image upload failed');
      }
    }
  };

  const handleStoreConfigSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming store ID is '00000000-0000-0000-0000-000000000000' from seed
      const updated = await storeService.updateStoreConfig('00000000-0000-0000-0000-000000000000', storeFormData);
      setStoreConfig(updated);
      alert('Store settings saved successfully');
    } catch (err) {
      console.error(err);
      alert(`Failed to save store settings: ${err.message || 'Database error'}`);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-brand">ANAYA CMS</div>
        <ul className="admin-nav">
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'store' ? 'active' : ''} onClick={() => setActiveTab('store')}>Store Settings</li>
        </ul>
        <button className="admin-logout-btn" onClick={handleLogout}>LOGOUT</button>
      </div>

      <div className="admin-main">
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="admin-header">
              <h2>Product Management</h2>
              <button className="admin-btn-primary" onClick={() => {
                setEditingProduct(null);
                setFormData({ name: '', category: '', gender: 'Women', price: '', description: '', fabric: '', sizes: '', availability: 'In Stock', image: '' });
                setShowProductForm(true);
              }}>+ Add Product</button>
            </div>

            {showProductForm ? (
              <div className="admin-form-card">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleProductSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="admin-input" />
                    </div>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="admin-input" />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gender</label>
                      <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="admin-input">
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required className="admin-input">
                        <option value="">Select Category</option>
                        <optgroup label="Women">
                          <option value="Saree">Saree</option>
                          <option value="Designer Saree">Designer Saree</option>
                          <option value="Bridal Saree">Bridal Saree</option>
                          <option value="Lehenga">Lehenga</option>
                          <option value="Bridal Lehenga">Bridal Lehenga</option>
                          <option value="Kurti">Kurti</option>
                          <option value="Kurti Set">Kurti Set</option>
                          <option value="Party Dress">Party Dress</option>
                          <option value="Anarkali">Anarkali</option>
                          <option value="Ethnic Wear">Ethnic Wear</option>
                        </optgroup>
                        <optgroup label="Men">
                          <option value="Blazer">Blazer</option>
                          <option value="Suit">Suit</option>
                          <option value="Panjabi">Panjabi</option>
                          <option value="Kurta">Kurta</option>
                          <option value="Sherwani">Sherwani</option>
                          <option value="Wedding Wear">Wedding Wear</option>
                          <option value="Party Wear">Party Wear</option>
                          <option value="Formal Wear">Formal Wear</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="admin-input" rows="3"></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Fabric</label>
                      <input type="text" value={formData.fabric} onChange={e => setFormData({...formData, fabric: e.target.value})} className="admin-input" />
                    </div>
                    <div className="form-group">
                      <label>Sizes (comma separated)</label>
                      <input type="text" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} placeholder="S, M, L, XL" className="admin-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Occasions (comma separated)</label>
                    <input type="text" value={formData.occasions} onChange={e => setFormData({...formData, occasions: e.target.value})} placeholder="Wedding, Festive, Party" className="admin-input" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Availability</label>
                      <select value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="admin-input">
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Made to Order (2 Weeks)">Made to Order (2 Weeks)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Image Upload</label>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" />
                      {formData.image && <img src={formData.image} alt="Preview" style={{ height: '60px', marginTop: '10px' }} />}
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button type="button" className="admin-btn-secondary" onClick={() => setShowProductForm(false)}>Cancel</button>
                    <button type="submit" className="admin-btn-primary">Save Product</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td><img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} /></td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>₹{p.price}</td>
                        <td>{p.availability}</td>
                        <td>
                          <button className="admin-action-btn edit" onClick={() => openEditProduct(p)}>Edit</button>
                          <button className="admin-action-btn delete" onClick={() => handleProductDelete(p.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'store' && (
          <div className="admin-section">
            <div className="admin-header">
              <h2>Store Settings</h2>
            </div>
            
            <div className="admin-form-card">
              <form onSubmit={handleStoreConfigSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Store Name</label>
                    <input type="text" value={storeFormData.name || ''} onChange={e => setStoreFormData({...storeFormData, name: e.target.value})} required className="admin-input" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" value={storeFormData.phone || ''} onChange={e => setStoreFormData({...storeFormData, phone: e.target.value})} required className="admin-input" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>WhatsApp Number (w/ Country Code)</label>
                    <input type="text" value={storeFormData.whatsappNumber || ''} onChange={e => setStoreFormData({...storeFormData, whatsappNumber: e.target.value})} required className="admin-input" />
                  </div>
                  <div className="form-group">
                    <label>Store Hours</label>
                    <input type="text" value={storeFormData.storeHours || ''} onChange={e => setStoreFormData({...storeFormData, storeHours: e.target.value})} className="admin-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Store Address</label>
                  <textarea value={storeFormData.address || ''} onChange={e => setStoreFormData({...storeFormData, address: e.target.value})} required className="admin-input" rows="2"></textarea>
                </div>

                <div className="form-group">
                  <label>Google Maps Embed URL</label>
                  <textarea value={storeFormData.mapEmbedUrl || ''} onChange={e => setStoreFormData({...storeFormData, mapEmbedUrl: e.target.value})} className="admin-input" rows="3"></textarea>
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn-primary">Save Settings</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
