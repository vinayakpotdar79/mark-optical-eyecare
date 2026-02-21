import { useState, useEffect } from "react";
import api from "../utils/api";

export function useProductForm(slug, isEditMode, navigate) {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [initialFetchLoading, setInitialFetchLoading] = useState(isEditMode);
    const [initialData, setInitialData] = useState(null);

    // Fetch Categories on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/admin/category/categories");
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
            return;
        }

        const fetchSubCategories = async () => {
            try {
                const res = await api.get(`/admin/subcategory/subcategories?categoryId=${selectedCategoryId}`);
                setSubCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch subcategories", err);
            }
        };
        fetchSubCategories();
    }, [selectedCategoryId]);

    // Fetch Product Data for Edit Mode
    useEffect(() => {
        if (!isEditMode) return;

        const fetchProduct = async () => {
            try {
                const res = await api.get(`/admin/products/${slug}`);
                const product = res.data;

                setInitialData(product);

                // Find category ID to trigger subcategory fetch
                if (product.category?.name) {
                    const cat = categories.find(c => c.name === product.category.name);
                    if (cat) setSelectedCategoryId(cat._id);
                }

            } catch (err) {
                console.error("Failed to fetch product for editing", err);
                alert("Failed to load product data");
                navigate("/admin/products");
            } finally {
                setInitialFetchLoading(false);
            }
        };

        if (categories.length > 0) {
            fetchProduct();
        }
    }, [isEditMode, slug, categories, navigate]);

    return {
        categories,
        subCategories,
        setSelectedCategoryId,
        initialData,
        initialFetchLoading
    };
}
