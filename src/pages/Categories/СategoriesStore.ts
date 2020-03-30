import { observable, decorate, action } from "mobx";
import { v4 as uuid } from "uuid";
import "moment/locale/ru";
import Category from "../../models/Category";

const data = [
    { id: uuid(), name: "Продукт1" },
    { id: uuid(), name: "Продукт2" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
    { id: uuid(), name: "Продукт3" },
];

export class CategoriesStore {
    list: Category[] = [];
    selectedCategory: Category | null = null;

    constructor() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        const list = data.map((item) => new Category(item));
        this.list = list;
    };

    selectCategory = (category: Category | null) => {
        this.selectedCategory = category ? { ...category } : null;
    };

    saveCategory = () => {
        console.log("this.selectedCategory", this.selectedCategory?.id);

        if (this.selectedCategory?.id) {
            // apiCreateCategory("");
            console.log('apiCreateCategory("")', this.selectedCategory.name);
        } else {
            console.log('apiUpdateCategory("")', this.selectedCategory);
        }
    };
}

export default decorate(new CategoriesStore(), {
    list: observable,
    fetchProducts: action,
    selectedCategory: observable,
    selectCategory: action,
    saveCategory: action,
});
