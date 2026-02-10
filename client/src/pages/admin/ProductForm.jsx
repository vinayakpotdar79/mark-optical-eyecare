import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Loader2, Save, X } from "lucide-react";
import api from "../../utils/api";

export default function ProductForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categoryName: "",
        subCategoryName: "",
        stock: "",
        images: []
    });
    const [previews, setPreviews] = useState([]);

    // Fetch Categories on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/admin/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch Subcategories when Category Changes
    useEffect(() => {
        if (!selectedCategoryId) {
            setSubCategories([]);
            setFormData(prev => ({ ...prev, subCategoryName: "" }));
            return;
        }

        const fetchSubCategories = async () => {
            try {
                const res = await api.get(`/admin/subcategories?categoryId=${selectedCategoryId}`);
                setSubCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch subcategories", err);
            }
        };
        fetchSubCategories();
    }, [selectedCategoryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Special handling for category selection to trigger subcategory fetch
        if (name === "categoryName") {
            const selectedCat = categories.find(c => c.name === value);
            setSelectedCategoryId(selectedCat ? selectedCat._id : "");
            // Reset subcategory when category changes
            setFormData(prev => ({ ...prev, [name]: value, subCategoryName: "" }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...files]
            }));

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("categoryName", formData.categoryName);
        data.append("subCategoryName", formData.subCategoryName);
        data.append("stock", formData.stock || 0); // Default to 0 if empty

        formData.images.forEach(image => {
            data.append("images", image);
        });

        try {
            await api.post("/admin/products", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Product saved successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold font-serif text-gray-900">Add Product</h2>
                    <p className="text-gray-500 mt-1">Create a new product listing</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {previews.map((src, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                                    <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}

                            <label className="flex flex-col items-center justify-center aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center p-4 text-center">
                                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                    <span className="text-xs text-gray-500 font-medium">Add Image</span>
                                </div>
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" multiple />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    name="categoryName"
                                    value={formData.categoryName}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                                    placeholder="Product description..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
