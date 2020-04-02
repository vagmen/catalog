import React, { useEffect } from "react";
import "./Сategories.scss";
import CategoriesStore from "./СategoriesStore";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Tooltip, Fab } from "@material-ui/core";
import CircleButton from "../../components/CircleButton/CircleButton";
import { DeleteOutlined, Add } from "@material-ui/icons";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import Category from "../../models/Category";

const Сategories = observer(() => {
    const { saveCategory, deleteCategory, categoryModalStore, list, fetchCategories } = CategoriesStore;
    const { selectedCategory, selectCategory } = categoryModalStore;

    useEffect(() => fetchCategories(), [fetchCategories, selectedCategory]);

    return (
        <div className="categories">
            <List className="list">
                {list.map((category) => (
                    <ListItem key={category.id || uuid()} button onClick={() => selectCategory(category)}>
                        <ListItemText primary={<span>{category.name}</span>} />
                        <ListItemSecondaryAction>
                            <CircleButton
                                title="Удалить категорию"
                                icon={DeleteOutlined}
                                color="secondary"
                                edge="end"
                                onClick={() => (category.id ? deleteCategory(category.id) : () => {})}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <CategoryModal
                visible={!!selectedCategory}
                onClose={() => selectCategory(null)}
                onSave={saveCategory}
                categoryModalStore={categoryModalStore}
            />
            <div className="addButton">
                <Tooltip title="Добавить категорию">
                    <Fab
                        color="primary"
                        size="medium"
                        onClick={() => selectCategory(new Category({ id: null, name: "" }))}
                    >
                        <Add />
                    </Fab>
                </Tooltip>
            </div>
        </div>
    );
});

export default Сategories;
