
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./Navbar";
import BooksList from "./BookList";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import MyAccount from "./MyAccount";
import BookDetails from "./BookDetails";
import Cart from "./Cart";


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
        </Routes>
      </main>
      <footer>
        Copyright Bookstream Inc. 2025
      </footer>

      {isCartModalOpen && <Cart isModal={true} onClose={closeCartModal} />}
    </Router>
  );
}

export default App;