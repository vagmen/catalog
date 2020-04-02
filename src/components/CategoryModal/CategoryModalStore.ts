import { observable, decorate, action, computed } from "mobx";
import Category from "../../models/Category";

export class CategoryModalStore {
    selectedCategory: Category | null = null;
    isValidated = false;
    allCategories: Category[] = [];

    selectCategory = (category: Category | null) => {
        this.selectedCategory = category ? { ...category } : null;
        this.isValidated = false;
    };

    @computed
    get errors() {
        const err: string[] = [];
        if (this.selectedCategory) {
            const { id, name } = this.selectedCategory;
            if (name.length === 0) {
                err.push("Введите название, пожалуйста");
            }
            if (name.length < 5) {
                err.push("Слишком короткое название");
            }
            if (name.length > 40) {
                err.push("Слишком длинное название");
            }
            const isCategoryExist = this.allCategories
                .filter((item) => item.id !== id)
                .find((item) => item.name === name);
            if (isCategoryExist) {
                err.push("Категория с таким названием уже существует");
            }
        }
        return err;
    }

    @computed
    get errorText() {
        return this.isValidated ? this.errors[0] : "";
    }
}

export default decorate(CategoryModalStore, {
    isValidated: observable,
    selectedCategory: observable,
    selectCategory: action,
});
