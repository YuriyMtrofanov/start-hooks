import React, { useEffect, useRef, useState, useCallback } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

const UseCallBackExample = () => {
    // Для илллюстрации работы зададим состояние для переменной data. Это будет объект.
    const [data, setData] = useState({});

    // Рендеринг без Callback
    const withoutCallback = useRef(0);
    // Функция-обработчик поля ввода, которая принимает в себя значение event.target и записывает значения с соответствующими клбчами
    // в объект с исходными данными data.
    const handleChange = ({ target }) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };
    // В нашем примере нужно продемонстрировать зависимость рендеринга компонента от работы функции, поэтому мы не будем делать useEffect(() => {},[data]),
    // А пропишем функцию, которая будет получать data в качестве аргумента т.е. выводить значение data каждый раз при обновлении состояния data.
    const validateVithoutCallback = (data) => {
        console.log(data);
    };
    // Далее уже с помощью useEffect(() => {},[validateVithoutCallback]) мы отследим каждый рендеринг функции validateVithoutCallback и установим счетчик
    // на количество изменений этой функции. Значение данного счетчика отобразим над полем ввода <p>{withoutCallback.current}</p>. В текущем состоянии
    // при вводе каждого символа в поле ввода производится ререндеринг функции и счетчик это показывает, увеличением значения на +1.
    useEffect(() => {
        withoutCallback.current++;
    }, [validateVithoutCallback]);

    // Рендеринг с Callback
    // Теперь проиллюстрируем работу хука useCallback() на примере аналогичной функции
    // Зададим начальное состояние параметра ref для withCallback
    const withCallback = useRef(0);
    // Зададим функфцию по аналогии с предыдущим методом
    const validateVithCallback = useCallback((data) => {
        console.log(data);
    }, []);
    // И создадим счетчик референсов для параметра withCallback
    useEffect(() => {
        withCallback.current++;
    }, [validateVithCallback]);

    // В данном случае мы выводим в консоль записанный в поле ввода с помощью обоих методов результат.
    useEffect(() => {
        validateVithoutCallback(data);
        validateVithCallback(data);
    }, [data]);

    // Результат говорит о том, что при вводе символов в поле ввода счетчик without callback увеличивает значение в соответствии с увеличением
    // количества введенных символов, в отлиие от with callback, кторый показывает, что наша функция отрендерилась 1 раз.
    // Таким образом useCallback - служит некой оболочкой которая кэширует нашу функцию.
    // Конструкция useCallback идентична useMemo, но отличие в том, что useCallback хранит в себе целую функцию, а useMemo - лишь значение (данные), получаемое
    // в результате работы функции при неизменности зависимости

    return (
        <CardWrapper>
            <SmallTitle>Example</SmallTitle>
            <p>Render without callback: {withoutCallback.current}</p>
            <p>Render with callback: {withCallback.current}</p>
            <label htmlFor="email" className="form-label">
                Email{" "}
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value = {data.email || ""} // в нашем случае поле не контролируемое т.к. в useState({}) не задано значение по умолчанию email: ""
                // т.е. если data.email есть, то отображается он, в противном случае - пустая строка
                onChange = {handleChange}
            />
        </CardWrapper>

    );
};

export default UseCallBackExample;
