import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

// React.memo() — это Higher-Order Component. Он служит для прерывавания лишних рендеров. Если
// компонент всегда рендерит одно и то же с теми же props, ты можешь обернуть твой компонент в
// React.memo(), тем самым мемоизируя результат рендера.

// Когда рекомендуется использовать React.memo():
// а. Если компонент часто ререндериться
// б. Компоненту передаются одинаковые параметры при одинаковых ререндерах
// в. Компонент не имеет собственного состояния (наш случай в примере)

// 1. Зададим целевой компонент. Пусть это будет комопнент, который возвращает кнопку "Log Out"

// 2. Добавляем нецелевой "state", изменение которого приводит к ререндерингу всей страницы.
// Т.к. ренедеринг <LogOutButton/> происходит не из-за нажатия на LogOutButton, а потому что
// из-за изменения состояния "state" мы перерендерили  всю страницу и тем самым перерендерили
// handleLogOut, который в свою очередь передан в "LogOutButton" в качестве props. Отследили
// мы это внутри компонента LogOutButton с помощью useEffect(), вызывая console.log("render Log Out Button").

// Т.о. состояние "state" для компонента "LogOutButton" задается "снаружи" и сам компонент
// "LogOutButton" не зависит от этого состояния, но изменение "state" непосредственно влияет
// на рендеринг "LogOutButton".

// Следовательно, чтобы избежать повторного рендеринга "LogOutButton" нам требуется мемоизировать
// этот компонент и результат работы ф-ии handleLogOut.

// 3. Создадим НОС - "MemoizedLogOutButton", вызовем внутри него "LogOutButton". При каждом вызове
// "MemoizedLogOutButton" будет производиться проверка входящих параметров и рендерится компонент
// должен единожды, что мы и отследим с помощью того же useEffect(). Но этого не происходит т.к.
// функция handleLogOut() рендерится по-новой каждый раз при рендеринге компонента (она же задана
// не в нутри компонента, а в НОС-функции). Чтобы это исправить есть два варианта: обернуть ф-ю в
// useCallback() -(п. 4.1) или использовать кастомную проверку -(п. 4.2)

// 4.1 Поэтому в дополнение обернем "handleLogOut" в useCallback() и установим зависимость по
// изменению входных параметров (т.е. на изменение "props").

// 4.2 Второй вариант проверки если мы не хотим использовать useCallback(), а хотим задать кастомную
// проверку, мы должны создать функцию и передать её референс в React.memo() вторым аргументом.
// Допустим, мы передаем в дочерний компонент некий объект {user}, но вызываем внутри компонента
// только его свойство user.name. Значит нам нужно сравнить предыдущее значение user.name с текущим.
// Создадим проверочную функцию areEqual(), и передадим в нее наши аргументы prevProps и nextProps:

// function areEqual(prevProps, nextProps) {
    // return prevProps.user.name === nextProps.user.name;
// }

// Теперь вызвем React.memo():
// const MemoizedLogOutButton = React.memo(LogOutButton, areEqual);

// Резюме: MemoizedLogOutButton при рендеринге производит поверхностную сверкку значениий
// зфиксированной с помощью useCallback() функции "handleLogOut" и производит ререндер только
// при несовпадении связей.
// React.memo() нужен для оптимизации рендеров. Если мы передаём в него объекты, то обязательно нужно
// их мемоизировать или создавать функцию для сравнения данных – areEqual().
const LogOutButton = ({ onLogOut }) => {
    useEffect(() => {
        console.log("render Log Out Button");
    });

    return <button
            className="btn btn-primary"
            onClick={onLogOut}
        >
            Log Out
        </button>;
};

LogOutButton.propTypes = {
    onLogOut: PropTypes.func
};

// 3. Зададаим мемоизированный LogOutButton компонент, со стандартной поверхностной проверкой
// В нашем случае этого будет достаточно.
const MemoizedLogOutButton = React.memo(LogOutButton);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);
    // const handleLogOut = () => {
    //     localStorage.removeItem("auth");
    //     console.log("removeItem('auth')");
    // };
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("auth");
        console.log("removeItem('auth')");
    }, [props]);
    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() => setState(!state)}
                // onClick={initRender}
            >
                initiate rerender
            </button>
            {/* <LogOutButton onLogOut={handleLogOut}/> */}
            <MemoizedLogOutButton onLogOut={handleLogOut}/>
        </>
    );
};

export default MemoWithUseCallbackExample;
