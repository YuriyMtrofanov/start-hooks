import React, { useEffect, useState } from "react";
// import React from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
import TextField from "../../common/form/textField";
import PropTypes from "prop-types";

// props.children — это объект, содержащий описание детей. Это ненастоящие потомки, не компоненты, а всего лишь описание.
// Мы не можем изменить какие-либо параметры или редактировать какие-либо функции у них. Мы имеем доступ к чтению.
// Если children — это массив, он будет пройден, функция будет вызвана для каждого потомка в массиве, и вернется обновленный
// массив. Если children равен null или undefined, этот метод вернёт null или undefined, а не массив.
// Важно! Если children — это Fragment, он будет рассматриваться как целый потомок, а элементы внутри не будут пройдены.

// Для иллюстрации примера реализуем компонент "FormComponent", который будет являться неким набором полей ввода
// По сути создадим форму. Внутрь него обернем несколько <TextField/>, которые в данном случае будут потомками,
// то есть children. Так как мы деструктуризировали "children" из входящих пропсов, то мы получаем доступ к их
// свойствам, в частности - props: {label: 'email', name: 'email', type: 'text'}, с которым мы и будем работать.

// Для обработки этих данных мы можем воспользоваться методом React.Children.map().
// В качестве аргументов передадим в него "children" и вторым - callback, на каждой итерации которого мы получаем "child"
// и можем получить доступ к его свойствам.

// Так как "handleChange() и параметр "data.value" универсальны. То есть относятся к форме в общем, а не к какой-то
// конкретной форме, то мы можем присвоить эти значения потомкам динамически, перебрав их копии.
// Теперь присвоим каждому элементу "handleChange()" и data.value. Как мы помним, чтобы добавлять параметры нам нужно
// клонироавть элементы с помощью конструкции React.cloneElement(element, config, ...children).
// 1. передадим element - это child;
// 2. создадим config:
    // 2.1 Первым параметром передадим ...child.props
    // 2.2 Передадим onchange: handleChange
    // 2.3 Передадим значение value. В данном случае мы получаем входные данные - data и можем получить value динамически,
    // обращаясь по ключу "props.name" и получим value: data[child.props.name].
// 3. Создаем клон наших дочерних элементов React.cloneElement(child, config) и возвращаем это значение.
const FormComponent = ({ children }) => {
    const [data, setData] = useState({});

    // С помощью данного useEffect мы следим за получаемыми данными и вывводим их в консоль
    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleChange = (target) => {
        console.log(target.value);
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const childrenArray = React.Children.map(children, (child) => {
        // Собственно это и есть набор передаваемых параметров
        const config = {
            ...child.props,
            onChange: handleChange,
            value: data[child.props.name] || "" // так как дефолтное значение не задано для value, то при использовании поля мы
            // переходим от неконтролируемого поля к контрлируемому. Другими словами, либо value: ..., либо пустой строке
        };
        const clonedElement = React.cloneElement(child, config);
        return clonedElement;
    });
    return childrenArray;
};

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const ReactChildrenExample = () => {
    return (
        <CardWrapper>
            <SmallTitle>Clone form and add props</SmallTitle>
            <Divider/>
            <FormComponent>
                <TextField label="email" name="email"/>
                <TextField label="Пароль" name="password" type="password"/>
            </FormComponent>
        </CardWrapper>
    );
};

export default ReactChildrenExample;
