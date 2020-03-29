import React from "react";
import { Dialog, DialogTitle, TextField, DialogContent, Button, DialogActions } from "@material-ui/core";
import { observer } from "mobx-react";
import "./CategoryModal.scss";
import Category from "../../models/Category";

const CategoryModal = observer((props: { visible: boolean; onClose: () => void; category: Category | null }) => {
    // const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    //     // setValue(newValue);
    //     navBarStore.setTab(newValue);
    //     event.preventDefault();
    // };

    return (
        <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.visible}>
            <DialogTitle id="simple-dialog-title">
                {props.category?.id ? "Редактирование категории" : "Новая категория"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    error
                    label="Название"
                    value={props.category?.name}
                    helperText="Incorrect entry."
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={() => {}} color="primary" variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default CategoryModal;
