import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, ArrowRight, Leaf, ShieldCheck, Truck, Clock3, MapPin, Phone, MessageCircle, Instagram, Facebook, Sparkles, Heart, Plus, Minus } from 'lucide-react';
import './style.css';

// Replace these demo details with the shop owner's real information.
const SHOP = {
  name: 'Shifa Pansar Store',
  tagline: 'NATURAL HERBS & EVERYDAY ESSENTIALS',
  phone: '+92 300 1234567',
  whatsapp: '923001234567',
  address: 'Main Market, Karachi, Pakistan',
  map: 'https://maps.google.com/?q=Main+Market+Karachi+Pakistan',
  hours: 'Daily: 10:00 AM – 10:00 PM'
};

// These direct image URLs are from live Unsplash photo pages.
// Replace sample photography with the shop's own product photos before launch.
const images = {
  herbs: 'https://images.unsplash.com/photo-1754513345664-7b8df119ceb7?auto=format&fit=crop&w=1200&q=85',
  spices: 'https://images.unsplash.com/photo-1502741384106-56538427cde9?auto=format&fit=crop&w=1200&q=85',
  jars: 'https://images.unsplash.com/photo-1757802412806-433e4e60eec7?auto=format&fit=crop&w=1200&q=85',
  spiceJars: 'https://images.unsplash.com/photo-1611255942860-3cb71f28e61d?auto=format&fit=crop&w=1200&q=85'
};

const categories = [
  { id: 'all', name: 'All Products', icon: '✦' },
  { id: 'herbs', name: 'Herbs & Botanicals', icon: '🌿' },
  { id: 'seeds', name: 'Seeds & Nuts', icon: '🥜' },
  { id: 'spices', name: 'Spices', icon: '🌶️' },
  { id: 'oils', name: 'Natural Oils', icon: '🫙' },
  { id: 'wellness', name: 'Wellness Essentials', icon: '🍃' }
];

const products = [
  { id: 1, name: 'Black Seed', category: 'seeds', price: 'Rs. 180', unit: '50 g', desc: 'Carefully selected black seeds for everyday kitchen use.', image: images.herbs, tag: 'Popular' },
  { id: 2, name: 'Fennel Seeds', category: 'seeds', price: 'Rs. 150', unit: '100 g', desc: 'Fresh, aromatic fennel seeds with a naturally sweet flavour.', image: images.spices, tag: 'Fresh' },
  { id: 3, name: 'Cinnamon Sticks', category: 'spices', price: 'Rs. 220', unit: '50 g', desc: 'Fragrant cinnamon sticks for cooking and tea blends.', image: images.spiceJars, tag: '' },
  { id: 4, name: 'Dried Mint', category: 'herbs', price: 'Rs. 120', unit: '50 g', desc: 'Carefully dried mint leaves for everyday food preparation.', image: images.jars, tag: '' },
  { id: 5, name: 'Premium Almonds', category: 'seeds', price: 'Rs. 450', unit: '100 g', desc: 'Selected, clean almonds packed for freshness.', image: images.spices, tag: 'Selected' },
  { id: 6, name: 'Rose Water', category: 'wellness', price: 'Rs. 250', unit: '250 ml', desc: 'A fragrant everyday personal-care essential.', image: images.jars, tag: '' },
  { id: 7, name: 'Olive Oil', category: 'oils', price: 'Rs. 650', unit: '250 ml', desc: 'Quality olive oil for versatile everyday use.', image: images.herbs, tag: 'Quality' },
  { id: 8, name: 'Carom Seeds', category: 'spices', price: 'Rs. 160', unit: '100 g', desc: 'Aromatic carom seeds for your spice collection.', image: images.spiceJars, tag: '' }
];

function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (category === 'all' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  ), [category, search]);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const add = (product) => setCart(old => old.some(x => x.id === product.id)
    ? old.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x)
    : [...old, { ...product, qty: 1 }]);
  const changeQty = (id, amount) => setCart(old => old
    .map(x => x.id === id ? { ...x, qty: x.qty + amount } : x)
    .filter(x => x.qty > 0));

  const orderText = encodeURIComponent(
    'Hello! I would like to order these items:\\n' +
    cart.map(x => `${x.name} — ${x.qty} item(s)`).join('\\n')
  );

  return <div>
    <div className="announcement">A thoughtful selection of everyday essentials — welcome to our store</div>
    <header className="header">
      <div className="container nav">
        <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        <a className="brand" href="#home">
          <span className="brand-mark"><Leaf size={25}/></span>
          <span><b>{SHOP.name}</b><small>{SHOP.tagline}</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links show' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#promise" onClick={() => setMenuOpen(false)}>Our Selection</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions"><button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={18}/><span>Cart</span><i>{count}</i></button></div>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15}/> ROOTED IN NATURE, CHOSEN WITH CARE</span>
            <h1>Nature's goodness,<br/><em>closer to home.</em></h1>
            <p>Explore herbs, spices, seeds, nuts, oils and traditional store essentials — thoughtfully selected and brought together in one place.</p>
            <div className="hero-buttons">
              <a className="btn btn-gold" href="#shop">Explore Products <ArrowRight size={17}/></a>
              <a className="btn btn-outline" href="#contact">Visit Our Store</a>
            </div>
            <div className="hero-proof">
              <div><strong>Carefully Selected</strong><small>Everyday essentials</small></div><span></span>
              <div><strong>Friendly Service</strong><small>Here to help</small></div><span></span>
              <div><strong>Easy Ordering</strong><small>WhatsApp support</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"></div>
            <div className="floating-note"><span>✦</span><div><b>A Natural Choice</b><small>For your everyday needs</small></div></div>
            <div className="round-stamp">NATURAL<br/>& GOOD<br/>QUALITY</div>
          </div>
        </div>
        <div className="hero-bottom container"><span>01 / 04</span><div className="hero-line"></div><span>TRADITION • TRUST • QUALITY</span></div>
      </section>

      <section className="benefits"><div className="container benefit-grid">
        <div><span><ShieldCheck/></span><div><b>Quality Focus</b><small>Selected products</small></div></div>
        <div><span><Leaf/></span><div><b>Natural Selection</b><small>Everyday store essentials</small></div></div>
        <div><span><MessageCircle/></span><div><b>Easy Ordering</b><small>Contact us on WhatsApp</small></div></div>
        <div><span><MapPin/></span><div><b>Your Local Store</b><small>Visit us in person</small></div></div>
      </div></section>

      <section className="section shop-section" id="shop"><div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">OUR COLLECTION</span><h2>Explore our <em>selection</em></h2><p>Discover a range of traditional store essentials for your home and kitchen.</p></div>
          <div className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."/></div>
        </div>
        <div className="category-tabs">{categories.map(c => <button key={c.id} className={category === c.id ? 'active' : ''} onClick={() => setCategory(c.id)}><span>{c.icon}</span>{c.name}</button>)}</div>
        <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id}>
          <div className="product-image"><img src={p.image} alt={p.name} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }}/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => add(p)} aria-label={`Add ${p.name} to cart`}><Plus/></button></div>
          <div className="product-info"><small>{p.category.toUpperCase()}</small><h3>{p.name}</h3><p>{p.desc}</p><div className="product-bottom"><div><b>{p.price}</b><small>{p.unit}</small></div><button onClick={() => add(p)}>Add to Cart <ArrowRight size={15}/></button></div></div>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty">No products found. Try another search.</div>}
        <p className="sample-note">* Demo catalogue only. Actual products, availability and prices must be confirmed with the store.</p>
      </div></section>

      <section className="story" id="about"><div className="container story-grid">
        <div className="story-images"><div className="story-img one"></div><div className="story-img two"></div><div className="story-badge"><Leaf/><b>Tradition & Trust</b><small>In every visit</small></div></div>
        <div className="story-copy"><span className="eyebrow">OUR STORY</span><h2>Traditional roots,<br/><em>a thoughtful experience.</em></h2>
          <p>We believe shopping for everyday herbal and pantry essentials should feel simple, welcoming and reliable. Our aim is to bring a wide selection of herbs, spices, seeds and natural products together under one roof.</p>
          <p>Tell us what you are looking for. Our team can help you check product availability, packaging and general product information.</p>
          <a className="text-link" href="#contact">Get in touch <ArrowRight size={17}/></a>
        </div>
      </div></section>

      <section className="categories-feature" id="promise"><div className="container">
        <div className="center-heading"><span className="eyebrow">WHAT YOU'LL FIND</span><h2>Everyday needs, <em>all in one place</em></h2><p>Explore the different product categories available at our store.</p></div>
        <div className="feature-grid">
          <div className="feature-card"><span>🌿</span><h3>Herbs & Botanicals</h3><p>A variety of dried herbs and traditional herbal ingredients.</p></div>
          <div className="feature-card"><span>🌰</span><h3>Seeds & Nuts</h3><p>Selected seeds, nuts and pantry favourites.</p></div>
          <div className="feature-card"><span>🌶️</span><h3>Spices & Seasonings</h3><p>Aromatic whole and ground spices for everyday cooking.</p></div>
          <div className="feature-card"><span>🫙</span><h3>Oils & Floral Waters</h3><p>Different oils, floral waters and personal-care essentials.</p></div>
        </div>
        <div className="disclaimer"><ShieldCheck size={19}/><p><b>Health information:</b> We can share general product information, but we do not diagnose, prescribe or claim that products treat or cure medical conditions. If you have stomach problems, constipation or other symptoms, please consult a qualified healthcare professional.</p></div>
      </div></section>

      <section className="contact-section" id="contact"><div className="container contact-grid">
        <div className="contact-copy"><span className="eyebrow">VISIT OUR STORE</span><h2>We'd love to <em>welcome you.</em></h2><p>Have a question about a product or want to check availability? Get in touch or visit our store. We look forward to serving you.</p>
          <div className="contact-lines">
            <a href={`tel:${SHOP.phone}`}><span><Phone/></span><div><small>Phone</small><b>{SHOP.phone}</b></div></a>
            <a href={SHOP.map} target="_blank" rel="noreferrer"><span><MapPin/></span><div><small>Store Address</small><b>{SHOP.address}</b></div></a>
            <div><span><Clock3/></span><div><small>Opening Hours</small><b>{SHOP.hours}</b></div></div>
          </div>
          <div className="contact-buttons"><a className="btn btn-green" href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent('Hello! I would like to know more about your products.')}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat on WhatsApp</a><a className="btn btn-light" href={SHOP.map} target="_blank" rel="noreferrer">Get Directions <ArrowRight size={17}/></a></div>
        </div>
        <div className="map-card"><div className="map-art"><div className="map-pin"><MapPin size={28}/></div><div className="map-label"><b>{SHOP.name}</b><small>{SHOP.address}</small></div><div className="map-road r1"></div><div className="map-road r2"></div><div className="map-road r3"></div></div><a href={SHOP.map} target="_blank" rel="noreferrer">Open location in Google Maps <ArrowUpRight size={16}/></a></div>
      </div></section>
    </main>

    <footer><div className="container footer-main">
      <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><Leaf/></span><span><b>{SHOP.name}</b><small>{SHOP.tagline}</small></span></a><p>Natural essentials, traditional trust and friendly service.</p></div>
      <div><b>Quick Links</b><a href="#shop">Shop Products</a><a href="#about">About Us</a><a href="#contact">Contact</a></div>
      <div><b>Contact</b><a href={`tel:${SHOP.phone}`}>{SHOP.phone}</a><a href={SHOP.map} target="_blank" rel="noreferrer">{SHOP.address}</a></div>
      <div><b>Connect With Us</b><a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a><span className="socials"><Instagram/><Facebook/></span></div>
    </div><div className="footer-bottom"><div className="container"><span>© 2026 {SHOP.name}. All rights reserved.</span><span>Made with care <Heart size={13}/></span></div></div></footer>

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}>
      <div className="drawer-head"><h3>Your Cart ({count})</h3><button onClick={() => setCartOpen(false)}><X/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={40}/><b>Your cart is empty</b><small>Add products to get started.</small><button className="btn btn-green" onClick={() => setCartOpen(false)}>Continue Shopping</button></div> :
        <><div className="cart-items">{cart.map(x => <div className="cart-item" key={x.id}><img src={x.image} alt=""/><div><b>{x.name}</b><small>{x.price}</small><div className="qty"><button onClick={() => changeQty(x.id, -1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={() => changeQty(x.id, 1)}><Plus size={13}/></button></div></div></div>)}</div><a className="btn btn-green checkout" href={`https://wa.me/${SHOP.whatsapp}?text=${orderText}`} target="_blank" rel="noreferrer">Send Order on WhatsApp <ArrowRight/></a></>}
    </aside></div>}
    <a className="whatsapp-float" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
