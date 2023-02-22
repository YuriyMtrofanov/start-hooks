import React, { useRef, useState, useEffect } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
// <Divider /> - это просто горизонтальная линия, чтобы отделить заголовок от текста, например
const PrevStateExample = () => {
    // Используем пример счетчика рендеров из примера "RenderCountExample"
    // для получения предыдущего состояния. В данном примере мы используем boolean значение,
    // приведенное к строке т.к. браузер не отображает boolean значения. То есть мы задаем
    // состояние для otherState = "false", prevState при этом = "";
    // Нажав на кнопку, вызывается toggleOtherState, которая меняет состояние otherState на
    // противоположное. При этом мы отслеживаем изменение состояния otherState с помощью useEffect
    // и внутри присваиваем значению prevState значение otherState, которое находится в useState в
    // текущий момент т.е. до изменения (otherState = "false"). Т.о. мы получаем предыдущее
    // состояине компонента otherState.
    const prevState = useRef("");
    const [otherState, setOtherState] = useState("false");
    useEffect(() => {
        prevState.current = otherState;
    }, [otherState]);
    const toggleOtherState = () => {
        setOtherState(prevState => prevState === "false" ? "true" : "false");
    };
    return (
        <CardWrapper>
            <SmallTitle>Предыдущее состояние</SmallTitle>
            <Divider />
            <p>prev state: {prevState.current}</p>
            <p>current state: {otherState}</p>
            <button className="btn btn-primary" onClick = {toggleOtherState}>Toggle other state</button>
        </CardWrapper>
    );
};

export default PrevStateExample;
