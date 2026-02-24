export const productKeys = {
    all: "products:all",
    byId: (id) => `products:byslug:${id}`,
};

export const categoryKeys = {
    all: "categories:all",
    subCategories: (id) => `subcategories:bycategory:${id}`,
};