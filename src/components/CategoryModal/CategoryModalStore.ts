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
        console.log("allCategories", this.allCategories.length);

        const err: string[] = [];
        if (this.selectedCategory?.name && this.selectedCategory?.name?.length < 4) {
            err.push("Слишком короткое название");
        }
        if (this.selectedCategory?.name && this.selectedCategory?.name?.length > 30) {
            err.push("Слишком длинное название");
        }
        const isCategoryExist = this.allCategories
            .filter((item) => item.id !== this.selectedCategory?.id)
            .find((item) => item.name === this.selectedCategory?.name);
        if (isCategoryExist) {
            err.push("Категория с таким названием уже существует");
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
