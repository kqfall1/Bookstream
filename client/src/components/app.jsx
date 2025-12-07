import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer"; 
<<<<<<< HEAD
import NavBar from "./NavBar.jsx";
=======
import NavBar from "./Navbar";
>>>>>>> eb096360a79967e10057d764682a327eadb3f1d7
import BooksList from "./BookList";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import MyAccount from "./MyAccount";
import BookDetails from "./BookDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";


function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <Router>
      <NavBar onCartClick={openCartModal} />
      <main>
        <Routes>
          <Route path="/" element={<BooksList showFilters={false} />} />
          <Route path="/browse" element={<BooksList showFilters={true} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart items={[]} />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </main>
      <Footer />

      {isCartModalOpen && <Cart isModal={true} onClose={closeCartModal} />}
    </Router>
  );
}

export default App;