import React from "react";
import CardWrapper from "../../common/Card";

const withFunctions = (SimpleComponent) => () => {
    const isAuth = localStorage.getItem("auth", "token") === "token";
    const hanleLogin = () => {
        localStorage.setItem("auth", "token");
        location.reload(); // Не знаю нужно ли принудительно перезагружать страницу, но я добавил метод
    };
    const hanleLogout = () => {
        localStorage.removeItem("auth", "token");
        location.reload();
    };
    return (
        <CardWrapper>
            <SimpleComponent
                isAuth = {isAuth}
                onLogin = {hanleLogin}
                onLogOut = {hanleLogout}
            />
        </CardWrapper>
    );
};

export default withFunctions;
