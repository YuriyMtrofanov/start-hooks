import React, { useState, useEffect, useMemo } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

// Для иммитаации сложных вычислений создадим функцию
function factorial(n) {
    return n
        ? n * factorial(n - 1)
        : 1;
};

function runFactorial(n) {
    console.log("run factorial");
    return factorial(n);
};
// В нашем примере факториал вычисляется в зависимости от значения n - числа слогаемых факториала
// Значение n управляется кнопками Increment (увеличивает n на 10) и Decrement (уменьшает n на 10)
// Каждый раз при нажатии на кнопку у нас производится вычисление и обновляется состояние т.е.
// происходит ререндеринг компонента. И все бы хорошо, но на рендеринг компонента могут влиять
// и другие состояния. ЧТО ТЕПЕРЬ ПРИ ВЫЗОВЕ КАЖДОГО ОБНОВЛЕНИЯ СТРАНИЦЫ ЭТОТ ФАКТОРИАЛ ВЫЧИСЛЯТЬ?
// Для иллюстрации создадим новое состояник, кторое упаравляется кнопкой.
const ComplexCalculateExample = () => {
    // Состояние вычисления факториала
    const [value, setValue] = useState(100);
    // const fact = runFactorial(value); // Запишем результат вычислений в переменную

    // Пример альтернативного состояния, влияющего на ререндеринг всего компонента Кнопка Change color
    // вызывает функцию, которая задает цвет кнопки в зависимости отзначения состояния otherState
    // (true / false). Данную функцию мы вызываем внутри className самой кнопки
    // т.о. просто меняя цвет кнопки мы заново ререндерим компонент и попутно вызываем расчет
    // факториала, что очень сильно нагружает системму
    const [otherState, setOtherState] = useState(false);
    const buttonColor = otherState ? "primary" : "secondary";
    useEffect(() => console.log("render button color"), [buttonColor]);
    // Для предотвращения проведения лишних вычислений испльзуем хук useMemo. Он сохраняет вычисления
    // внутри компонента и при повторном рендеринге проверяет изменились ли связи у данного состояния
    // и если нет, то значение вычисления берется из памяти, если связи поменялись (например изменились
    // какие-либо входящие данные из-за влияния другого состояния), то производится повторное вычисление
    // Первым параметром в useMemo передается функция, вторым - массив зависимостей (как в useEffect), т.е.
    // изменение какого параметра приводит к ререндерингу.
    // useMemo(() => runFactorial(аргумент), [массив зависимостей]);
    // и перепишем значение работы функции следующим образом:
    const fact = useMemo(() => runFactorial(value), [value]);
    // Использование данной конструкции позволяет кэшировать результат работы функции и не запускать
    // функцию при каждом рендеринге компонента. Но чрезмерное использование этого хука может привести
    // замедлению работы. И по возможности нужно обходиться другими методами оптимизации.
    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <p>value: {value}</p>
                <p>result: {fact}</p>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue(prevState => prevState + 10)}
                >Increment</button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue(prevState => prevState - 10)}
                >Decrement</button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    className={"btn ms-md-2 btn-" + buttonColor}
                    onClick={() => setOtherState(prevState => !prevState)}
                >Change color</button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
