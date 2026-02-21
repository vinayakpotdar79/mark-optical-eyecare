export default function ProductBasicInfo({ formData, onChange }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="e.g. Classic Aviator"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="0.00"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="0"
                />
            </div>
        </div>
    );
}
