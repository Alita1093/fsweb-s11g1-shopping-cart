import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ContextObject } from "./context/ProductContext";
import { CartObject } from "./context/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
const localStorageKey = "cart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(baslangicNotlariniGetir(localStorageKey));
  function localStorageStateYaz(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function localStorageStateOku(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  function baslangicNotlariniGetir(key) {
    const eskiNotlar = localStorage.getItem(key);

    if (eskiNotlar) {
      return localStorageStateOku(key);
    } else {
      return [];
    }
  }
  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart, item]);
    localStorageStateYaz(localStorageKey, cart);
  };
  const deleteItem = (id) => {
    setCart([...cart.filter((d) => d.id !== id)]);
    localStorageStateYaz(localStorageKey, cart);
  };

  return (
    <ContextObject.Provider value={{ products, addItem }}>
      <CartObject.Provider value={{ cart, deleteItem }}>
        <div className="App">
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </CartObject.Provider>
    </ContextObject.Provider>
  );
}

export default App;
