import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Features from "./components/Features";
import Shop from "./components/Shop";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import CategoryManager from "./pages/admin/CategoryManager";
import Setting from "./pages/admin/Setting";

function AppContent() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const admin = true;

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to section when route changes
  useEffect(() => {
    // Matches /shop as path "/shop" in location.pathname
    const path = location.pathname;

    // We want to scroll to the element with id "shop" etc.
    const sectionId = path === "/" ? "" : path.substring(1);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [window.location.hash, window.location.pathname]);

  const addToCart = (product) => {
    // ... (rest of the component)
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <Routes>
        {["/", "/shop", "/services", "/about", "/contact"].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              <div className="bg-black min-h-screen text-white flex flex-col">
                <Navbar
                  cartCount={cart.length}
                  onCartClick={() => setIsCartOpen(true)}
                />
                <Hero />
                <Brands />
                <div className="grow bg-white">
                  <Features />
                  <Shop addToCart={addToCart} />
                  <Services />
                  <Testimonials />
                  <About />
                  <Contact />
                </div>
                <Footer />
              </div>
            }
          />
        ))}
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
        {admin && (
          <>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminDashboard />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="settings" element={<Setting />} />
            </Route>
          </>
        )}
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;