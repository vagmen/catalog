import { v4 as uuid } from "uuid";
import { getArray, setObject } from "./localStorage";
import Category from "../models/Category";
import Product from "../models/Product";

const api = {
    category: {
        create: (name: string) => {
            const id = uuid();
            const categories = getArray("categories");
            categories.push(new Category({ id, name }));
            setObject("categories", categories);
        },
        update: (category: Category) => {
            const categories: Category[] = getArray("categories");
            const currentCategory = categories.find((item) => item.id === category.id);
            if (currentCategory) {
                currentCategory.name = category.name;
            } else {
                categories.push(category);
            }
            setObject("categories", categories);
        },
        delete: (id: string) => {
            const categories: Category[] = getArray("categories");
            const newCategories = categories.filter((item) => item.id !== id);
            setObject("categories", newCategories);
        },
    },
    product: {
        create: (name: string) => {
            const id = uuid();
            const products = getArray("products");
            products.push(new Category({ id, name }));
            setObject("products", products);
        },
        update: (product: Product) => {
            const products: Product[] = getArray("products");
            const currentProduct = products.find((item) => item.id === product.id);
            if (currentProduct) {
                currentProduct.name = product.name;
            } else {
                products.push(product);
            }
            setObject("products", products);
        },
        delete: (id: string) => {
            const products: Product[] = getArray("products");
            const newProducts = products.filter((item) => item.id !== id);
            setObject("products", newProducts);
        },
    },
};

export default api;
