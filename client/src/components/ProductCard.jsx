import { useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";

export default function ProductCard({ product, addToCart }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleBuyNow = (product) => {
    addToCart(product);
    console.log("lmao, redirecting..");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1">
      <div className="h-64 overflow-hidden relative group bg-gray-100">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() =>
            setImgSrc("https://via.placeholder.com/400x300?text=No+Image")
          }
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Quick Add Button that appears on hover (desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block hover:bg-black hover:text-white"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-black transition-colors">
                {product.name}
              </h3>
            </div>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {/* MOBILE BUTTONS */}
          <div className="flex flex-col gap-2 md:hidden">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gray-100 text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="w-full bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Zap size={18} fill="currentColor" /> Buy Now
            </button>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 border-2 border-black text-black py-2.5 rounded-lg font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="flex-1 bg-black border-2 border-black text-white py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
