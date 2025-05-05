// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <ProductGrid />
    </div>
  );
}