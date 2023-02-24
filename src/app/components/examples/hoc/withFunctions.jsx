import React, { useState } from "react";
import CardWrapper from "../../common/Card";

const withFunctions = (SimpleComponent) => () => {
    const [isAuth, setIsAuth] = useState(false);
    const hanleLogin = () => {
        localStorage.setItem("auth", "token");
        setIsAuth(true);
    };
    const hanleLogout = () => {
        localStorage.removeItem("auth", "token");
        setIsAuth(false);
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
