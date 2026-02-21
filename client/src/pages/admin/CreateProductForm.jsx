import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import api from "../../utils/api";
import { useProductForm } from "../../hooks/useProductForm";
import ProductImageUpload from "../../components/admin/ProductImageUpload";
import ProductBasicInfo from "../../components/admin/ProductBasicInfo";
import ProductCategorySelect from "../../components/admin/ProductCategorySelect";

export default function ProductForm() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const isEditMode = Boolean(slug);
    console.log(isEditMode);

    const [loading, setLoading] = useState(false);

    const {
        categories,
        subCategories,
        setSelectedCategoryId,
        initialData,
        initialFetchLoading
    } = useProductForm(slug, isEditMode, navigate);

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

    // Populate form when initialData is fetched (Edit Mode)
    useEffect(() => {
        if (initialData && isEditMode) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                categoryName: initialData.category?.name || initialData.category || "",
                subCategoryName: initialData.subCategory?.name || initialData.subCategory || "",
                stock: initialData.stock || "",
                images: []
            });

            if (initialData.images?.length > 0) {
                setPreviews(initialData.images.map(img => img.url));
            }
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "categoryName") {
            const selectedCat = categories.find(c => c.name === value);
            setSelectedCategoryId(selectedCat ? selectedCat._id : "");
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
        data.append("stock", formData.stock || 0);

        formData.images.forEach(image => {
            data.append("images", image);
        });

        try {
            if (isEditMode) {
                await api.patch(`/admin/products/${slug}`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Product updated successfully!");
            } else {
                await api.post("/admin/products", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Product saved successfully!");
            }
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'save'} product`);
        } finally {
            setLoading(false);
        }
    };

    if (initialFetchLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold font-serif text-gray-900">
                        {isEditMode ? "Edit Product" : "Add Product"}
                    </h2>
                    <p className="text-gray-500 mt-1">
                        {isEditMode ? "Update existing product details" : "Create a new product listing"}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <ProductImageUpload
                        previews={previews}
                        isEditMode={isEditMode}
                        onImageChange={handleImageChange}
                        onRemoveImage={removeImage}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProductBasicInfo
                            formData={formData}
                            onChange={handleChange}
                        />

                        <ProductCategorySelect
                            formData={formData}
                            categories={categories}
                            subCategories={subCategories}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end pt-6 border-t">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {loading ? "Saving..." : (isEditMode ? "Update Product" : "Save Product")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}