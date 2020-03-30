import React from "react";
import { Dialog, DialogTitle, TextField, DialogContent, Button, DialogActions } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CategoryModal.scss";
import Category from "../../models/Category";

interface ICategoryModal {
    visible: boolean;
    onClose: () => void;
    category: Category | null;
    onSave: () => void;
}

const CategoryModal = observer((props: ICategoryModal) => {
    const { visible, onClose, category, onSave } = props;

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (category) category.name = event.target.value;
    };

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={visible}>
            <DialogTitle id="simple-dialog-title">
                {category?.id ? "Редактирование категории" : "Новая категория"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    error
                    label="Название"
                    value={category?.name}
                    helperText="Incorrect entry."
                    variant="outlined"
                    fullWidth
                    onChange={nameChangeHandler}
                />
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={onSave} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default CategoryModal;
