import { useState } from 'react'
import ProductCard from './ProductCard'
import SectionReveal from './SectionReveal'
import { products } from '../data/products'

export default function Shop({ addToCart }) {
    const [filter, setFilter] = useState('All')

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter)

    const categories = ['All', 'Spectacles', 'Sunglasses', 'Contact Lenses']

    return (
        <section id="shop" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Our Collection</h2>
                        <div className="w-24 h-1 bg-black mx-auto mb-8 rounded-full"></div>
                        <div className="flex justify-center flex-wrap gap-4 mt-8">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 ${filter === cat
                                        ? 'bg-black text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
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
                        <SectionReveal key={product.id} delay={index % 3 * 0.1}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
