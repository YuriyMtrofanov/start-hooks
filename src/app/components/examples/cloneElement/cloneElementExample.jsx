import React from "react";
import CardWrapper from "../../common/Card";
import TextField from "../../common/form/textField";
import SmallTitle from "../../common/typografy/smallTitle";

// Представим, что мы задаем дочерний компонент в качестве переменной "field" внутри компонента
// и рендерим его с помощью выражения {field}. При такой записи мы не имеем доступа к редактированию
// его пропсов (label, name).
// Чтобы получить доступ к его пропсам мы можем его склонироать с помощью React.cloneElement( element, [config], [...children] )
// В качестве параметров в него передаются:
    // 1. Сам компонент (element)
    // 2. Объект с настройками [config]. В нашем случае мы передадим функцию-обработчик и новое значение label
    // { onChenge: handleChange, label: "cloned email"}
    // 3. Передаются потомки [...children].

// Вызовем с помощью выражения React.cloneElement и передадим в него необходимые параметры. children передавать ну будем т.к
// их у нас нет.

// В результате мы получаем два поля ввода "email" и "cloned email". При этом первое не работает т.к. в нем не задан onChange,
// а второе прекрасно работает и выводит в консоль запись target {name: 'email', value: '....'}
const CloneElementExample = () => {
    const field = <TextField label="email" name="email"/>;
    const handleChange = (target) => {
        console.log("change target", target);
    };
    return (
        <CardWrapper>
            <SmallTitle>Пример</SmallTitle>
            {field}
            {React.cloneElement(field, {
                onChange: handleChange,
                label: "cloned email"
            })}
        </CardWrapper>
    );
};

export default CloneElementExample;
