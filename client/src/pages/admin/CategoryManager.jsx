import { useState, useEffect } from "react";
import { Plus, FolderTree, ChevronRight, Loader2 } from "lucide-react";
import api from "../../utils/api";

export default function CategoryManager() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    const [newCategory, setNewCategory] = useState("");
    const [newSubCategory, setNewSubCategory] = useState("");

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [creatingCategory, setCreatingCategory] = useState(false);
    const [creatingSubCategory, setCreatingSubCategory] = useState(false);

    // Fetch Categories
    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const res = await api.get("/admin/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
            alert("Failed to load categories");
        } finally {
            setLoadingCategories(false);
        }
    };

    // Fetch Subcategories
    const fetchSubCategories = async (categoryId) => {
        setLoadingSubCategories(true);
        try {
            const res = await api.get(`/admin/subcategories?categoryId=${categoryId}`);
            setSubCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch subcategories", err);
        } finally {
            setLoadingSubCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchSubCategories(selectedCategory._id);
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory]);

    // Create Category
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setCreatingCategory(true);
        try {
            const res = await api.post("/admin/category", { name: newCategory });
            setCategories([...categories, res.data.category]);
            setNewCategory("");
            alert("Category created!");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create category");
        } finally {
            setCreatingCategory(false);
        }
    };
    //create subcategory
    const handleCreateSubCategory = async (e) => {
        e.preventDefault();
        if (!newSubCategory.trim() || !selectedCategory) return;

        setCreatingSubCategory(true);
        try {
            const res = await api.post("/admin/subcategory", {
                categoryName: selectedCategory.name,
                subCategoryName: newSubCategory
            });
            setSubCategories([...subCategories, res.data.subCategory]);
            setNewSubCategory("");
            alert("Subcategory created!");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create subcategory");
        } finally {
            setCreatingSubCategory(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-serif text-gray-900">Category Manager</h2>
                <p className="text-gray-500 mt-1">Manage product categories and subcategories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Categories Column */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-[600px]">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FolderTree size={20} className="text-gray-500" />
                        Categories
                    </h3>

                    {/* Add Category Form */}
                    <form onSubmit={handleCreateCategory} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category Name"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                        <button
                            type="submit"
                            disabled={creatingCategory || !newCategory.trim()}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                        >
                            {creatingCategory ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                        </button>
                    </form>

                    {/* Category List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                        {loadingCategories ? (
                            <div className="text-center py-8 text-gray-500">Loading...</div>
                        ) : categories.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">No categories found</div>
                        ) : (
                            categories.map((cat) => (
                                <div
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`p-4 rounded-lg cursor-pointer border transition-all flex justify-between items-center ${selectedCategory?._id === cat._id
                                        ? "border-black bg-gray-50 shadow-sm"
                                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="font-medium">{cat.name}</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transition-transform ${selectedCategory?._id === cat._id ? "text-black" : "text-gray-300"
                                            }`}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Subcategories Column */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-[600px]">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="text-gray-400">
                            {selectedCategory ? selectedCategory.name : "Select a Category"} /
                        </span>
                        Subcategories
                    </h3>

                    {selectedCategory ? (
                        <>
                            {/* Add Subcategory Form */}
                            <form onSubmit={handleCreateSubCategory} className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={newSubCategory}
                                    onChange={(e) => setNewSubCategory(e.target.value)}
                                    placeholder="New Subcategory Name"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                                <button
                                    type="submit"
                                    disabled={creatingSubCategory || !newSubCategory.trim()}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    {creatingSubCategory ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                </button>
                            </form>

                            {/* Subcategory List */}
                            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                {loadingSubCategories ? (
                                    <div className="text-center py-8 text-gray-500">Loading...</div>
                                ) : subCategories.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">No subcategories found</div>
                                ) : (
                                    subCategories.map((sub) => (
                                        <div
                                            key={sub._id}
                                            className="p-3 rounded-lg border border-gray-100 bg-white flex justify-between items-center group"
                                        >
                                            <span className="text-gray-700">{sub.name}</span>
                                            {/* Placeholder for delete icon if needed in future */}
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <FolderTree size={48} className="mb-4 text-gray-200" />
                            <p>Select a category to manage subcategories</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
