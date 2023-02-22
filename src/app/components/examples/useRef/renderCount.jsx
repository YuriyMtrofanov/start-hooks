import React, { useRef, useState, useEffect } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
// <Divider /> - это просто горизонтальная линия, чтобы отделить заголовок от текста, например
const RenderCountExample = () => {
    // 1. При каждом рендере обновляем состояние renderCount и +1.
    // Данная констр-я при каждом рендере страницы вызывает обновление
    // renderCount и прибавляет 1, что влечет повторный рендер и так
    // до бесконечности
    // const someRef = useRef("someRef");
    // const [renderCount, setRenderCount] = useState(0);
    // useEffect(() => {
    // setRenderCount(prevState => prevState + 1);
    // });

    // 2. Данная конструкция задает начальное значение renderCount = 0
    // Задает состояние otherState = false. При нажатии на кнопку
    // вызывается функция toggleOtherState, которая меняет состояние
    // otherState на обратное значение, чем вызывает ререндер страницы
    // Однако при рендере мы установили счетчик с помощью useEffect,
    // который прибавляет 1 к renderCount при каждом рендере страницы
    // т.о. реализуется счетчик рендеров
    const renderCount = useRef(0);
    const [otherState, setOtherState] = useState(false);
    useEffect(() => {
        renderCount.current++;
    });
    const toggleOtherState = () => {
        setOtherState(!otherState);
    };
    return (
        <CardWrapper>
            <SmallTitle>Подсчет количества рендеров</SmallTitle>
            <Divider />
            {/* {someRef.current} */}
            <p>render count: {renderCount.current}</p>
            <button className="btn btn-primary" onClick = {toggleOtherState}>Toggle other state</button>
        </CardWrapper>
    );
};

export default RenderCountExample;
