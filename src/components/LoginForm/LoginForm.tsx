import React, { ChangeEvent, useState, MouseEvent } from "react";
import { CardContent, TextField, Button, Card, CardHeader } from "@material-ui/core";
import { observer } from "mobx-react";
import "./LoginForm.scss";

interface ILoginForm {
    logIn: () => void;
}

const LoginForm = observer((props: ILoginForm) => {
    const [userName, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    return (
        <form className="wrapper">
            <Card className="form" raised={true}>
                <CardHeader title="Авторизация" />
                <CardContent className="content">
                    <TextField
                        label="Логин"
                        variant="outlined"
                        className="control"
                        value={userName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => changeUsername(event.target.value)}
                        name="login"
                    />
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        className="control"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => changePassword(event.target.value)}
                        name="password"
                        type="password"
                    />
                    <div className="buttons">
                        <Button
                            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                props.logIn();
                                event.preventDefault();
                            }}
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                        >
                            Войти
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
});

export default LoginForm;
