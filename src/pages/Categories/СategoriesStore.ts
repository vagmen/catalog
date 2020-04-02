import { observable, decorate, action, autorun } from "mobx";
import Category from "../../models/Category";
import api from "../../utils/api";
import { getArray } from "../../utils/localStorage";
import { CategoryModalStore } from "../../components/CategoryModal/CategoryModalStore";

export class CategoriesStore {
    list: Category[] = [];
    categoryModalStore = new CategoryModalStore();

    constructor() {
        autorun(() => {
            this.categoryModalStore.allCategories = this.list;
        });
    }

    fetchCategories = () => {
        this.list = [];
        const categories: Category[] = getArray("categories");
        const list = categories.map((item) => new Category(item));
        this.list = list;
        this.categoryModalStore.allCategories = this.list;
    };

    saveCategory = () => {
        const { selectedCategory, selectCategory, errors } = this.categoryModalStore;
        this.categoryModalStore.isValidated = true;
        if (selectedCategory && errors.length === 0) {
            if (selectedCategory?.id) {
                api.category.update(selectedCategory);
            } else {
                api.category.create(selectedCategory.name);
            }
            selectCategory(null);
        }
    };

    deleteCategory = (id: string) => {
        api.category.delete(id);
        this.fetchCategories();
    };
}

export default decorate(new CategoriesStore(), {
    list: observable,
    fetchCategories: action,
    saveCategory: action,
});
