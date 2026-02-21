import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Catalog({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try { //needed to fetch from client api ahead 
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get("/admin/products"),
                    api.get("/admin/category/categories")
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
        const matchesCategory = selectedCategory === "All" ? true : categoryName === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-4 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl font-bold font-serif text-gray-900">Full Collection</h1>
                        <p className="text-gray-500 mt-2">Explore our complete range of premium eyewear</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search eyewear..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black/5 w-full sm:w-64"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black/5 bg-white"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-24 text-gray-500">
                        <p className="text-xl">No products found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                            className="mt-4 text-black underline hover:text-gray-700"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}