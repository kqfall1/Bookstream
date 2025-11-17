import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BooksList from "./BookList";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <NavBar cartCount={0} />
      <main style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/cart" element={<Cart items={[]} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;