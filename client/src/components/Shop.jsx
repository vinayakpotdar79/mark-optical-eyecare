import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionReveal from "./SectionReveal";
import { products } from "../data/products";

export default function Shop({ addToCart }) {
  const [filter, setFilter] = useState("Sunglasses");

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  const categories = ["Sunglasses", "Spectacles", "Contact Lenses"];

  return (
    <section id="shop" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Collection
            </h2>
            <div className="w-24 h-1 bg-black mx-auto mb-8 rounded-full"></div>
            <div className="flex justify-center flex-wrap gap-4 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 ${filter === cat
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <SectionReveal key={product.id} delay={(index % 3) * 0.1}>
              <ProductCard product={product} addToCart={addToCart} />
            </SectionReveal>
          ))}
        </div>

        <div className="mt-20 text-center pb-12">
          <Link
            to="/collection"
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-transparent border border-gray-900 text-gray-900 text-lg font-serif tracking-widest uppercase overflow-hidden hover:bg-black hover:text-white transition-all duration-500"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="relative z-10 font-medium">View Full Collection</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 relative z-10" />
          </Link>
        </div>
      </div>
    </section>
  );
}
