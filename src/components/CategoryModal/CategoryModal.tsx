import React from "react";
import { Dialog, DialogTitle, TextField, DialogContent, Button, DialogActions } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CategoryModal.scss";
import { CategoryModalStore } from "./CategoryModalStore";

interface ICategoryModal {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    categoryModalStore: CategoryModalStore;
}

const CategoryModal = observer((props: ICategoryModal) => {
    const { visible, onClose, categoryModalStore, onSave } = props;
    const { errors, errorText, isValidated, selectedCategory } = categoryModalStore;

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedCategory) selectedCategory.name = event.target.value;
    };

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={visible}>
            <DialogTitle id="simple-dialog-title">
                {selectedCategory?.id ? "Редактирование категории" : "Новая категория"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={isValidated && errors.length > 0}
                    label="Название"
                    value={selectedCategory?.name}
                    helperText={errorText}
                    variant="outlined"
                    fullWidth
                    onChange={nameChangeHandler}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    onClick={onSave}
                    color="primary"
                    variant="contained"
                    disabled={errors.length > 0 && isValidated}
                    size="large"
                >
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default CategoryModal;
