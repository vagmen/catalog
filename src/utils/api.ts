import { v4 as uuid } from "uuid";
import { getArray, setObject } from "./localStorage";
import Category from "../models/Category";

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
};

export default api;
