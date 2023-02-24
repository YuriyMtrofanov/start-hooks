import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    const [buttonName, setButtonName] = useState();
    useEffect(() => {
        isAuth === false ? setButtonName("Войти") : setButtonName("Выйти из системы");
    }, [isAuth]);
    return (
        <>
            <button type="submit" className="btn btn-primary" onClick = {isAuth === false ? onLogin : onLogOut}>{buttonName}</button>
        </>
    );
};

SimpleComponent.propTypes = {
    isAuth: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func
};

export default SimpleComponent;
