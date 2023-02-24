import React from "react";
import Component from "./someComponent";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
import withLogin from "./withLogin";
import withPropsStyles from "./withPropsStyles";

localStorage.setItem("auth", "token");
// HOC - это функция, которая принимает в себя компонент и возвращает либо
// новый компонент, либо обновленный компонент, либо вообще другой компонент
// например <Redirect />. HOC может содержать как логические итераторы, так
// и стилистические операторы. Как я понял, - это оболочка для компонента,
// которая производит какие-то манипуляции с вложенным компонентомю: содержит
// как стили так и какие-либо функциональные добавления, так и могут управлять
// детьми или управлять компонентом в зависимости от параметров, которые мы
// можем в них добавлять.

// 1. В примере 1 мы рендерим <Component />, который выводит при name если этот
// параметр передан, либо строку "Component" если имя не задано. Так как name
// мы не передаем, то будет выведена запись "Component". То есть это не НОС.

const HOCExample = () => {
    // 2. Во втором примере мы создадим НОС "withLogin", в котором произведем проверку
    // на авторизацию. То есть функция, которая проверяет авторизован ли пользователь,
    // в противном случае переадресует его на авторизацию, но в нашем случае выведем
    // надпись "authorisation".
    // Инициализируем константу ComponentWithAuth, в которую будет записан результат
    // работы НОС-функции withLogin(Component), в качестве аргумента которой мы передаем
    // сам компонент.Так как в данную переменную мы сохраняем целый компонент, то
    // назавать её нужно с заглавной буквы.
    const ComponentWithAuth = withLogin(Component);

    // 3. В данном примере мы возвращаем компонент с измененными стилями и добавим имя,
    // которое предается как пропс. В нашем случае мы создаем карточку на основе компонента
    // оборачивая его в <CardWrapper> внутри самой НОС-функции. Внутри компонента <ComponentWithPropsStyles/>
    // мы вызываем компонент и передаем в него name, как пропс <Component {...props} name="new name"/>.
    // На экран будет выведен <Component /> как и в 1м примере, но в данном случае он возвратит набпись "new name"
    // т.к. мы передали это значение как пропс и при этом будет обернут в карточку.
    const ComponentWithPropsStyles = withPropsStyles(Component);

    // 4. В данном примере реализуем функционал и авторизации, и функционал styles and props.
    // Представим, что сначала мы проводим авторизацию пользователя и выводим надпись "authorisation",
    // а затем содержание компонента отобразить с помощью withPropsStyles(). Для этого зададим новую
    // переменную NewComponent, в которую запишем результат работы НОС-функции withPropsStyles, в
    // качестве аргумента которой передан исходный ComponentWithAuth (который выводит надпись "authorisation").
    const NewComponent = withPropsStyles(ComponentWithAuth);
    return (
        <>
            <CardWrapper>
                <SmallTitle>1. Обычный компонент</SmallTitle>
                <Divider />
                <Component />
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>2. Функциональный HOC</SmallTitle>
                <Divider/>
                <ComponentWithAuth/>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>3. HOC With Styles and Props</SmallTitle>
                <ComponentWithPropsStyles/>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>4. Composed HOC</SmallTitle>
                <NewComponent/>
            </CardWrapper>
        </>
    );
};

export default HOCExample;
