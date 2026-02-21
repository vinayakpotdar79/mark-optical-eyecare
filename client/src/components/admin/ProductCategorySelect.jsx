export default function ProductCategorySelect({ formData, categories, subCategories, onChange }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    required
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                <select
                    name="subCategoryName"
                    value={formData.subCategoryName}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    disabled={!formData.categoryName}
                    required
                >
                    <option value="">Select sub-category</option>
                    {subCategories.map(sub => (
                        <option key={sub._id} value={sub.name}>{sub.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    rows="5"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                    placeholder="Product description..."
                ></textarea>
            </div>
        </div>
    );
}
