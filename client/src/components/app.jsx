// function App() {
//   return (
//     <h1>Hello World!</h1>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BooksList from "./BookList";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";
import Cart from "./Cart";

/*
  Simple App wiring:
  - Home ("/") shows BooksList (demo with two books)
  - /signin and /signup show forms
  - /cart shows a standalone cart page (you'll likely use app-level state or context for a real cart)
*/

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