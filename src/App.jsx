import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playlist from "./pages/Playlist";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/playlist"
          element={
            <Layout>
              <Playlist />
            </Layout>
          }
        />
        <Route
          path="/liked"
          element={
            <Layout>
              <Liked />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
