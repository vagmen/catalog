import React from "react";
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
    const categoriesStore = CategoriesStore;

    return (
        <div className="categories">
            <List className="list">
                {categoriesStore.list.map((category) => (
                    <ListItem
                        key={category.id || uuid()}
                        button
                        onClick={() => categoriesStore.selectCategory(category)}
                    >
                        <ListItemText primary={<span>{category.name}</span>} />
                        <ListItemSecondaryAction>
                            <CircleButton title="Удалить товар" icon={DeleteOutlined} color="secondary" edge="end" />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <CategoryModal
                visible={!!categoriesStore.selectedCategory}
                onClose={() => categoriesStore.selectCategory(null)}
                category={categoriesStore.selectedCategory}
            />
            <div className="addButton">
                <Tooltip title="Добавить категорию">
                    <Fab
                        color="primary"
                        size="medium"
                        onClick={() => categoriesStore.selectCategory(new Category({ id: null, name: "" }))}
                    >
                        <Add />
                    </Fab>
                </Tooltip>
            </div>
        </div>
    );
});

export default Сategories;
