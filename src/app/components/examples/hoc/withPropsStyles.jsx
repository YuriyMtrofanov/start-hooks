import React from "react";
import CardWrapper from "../../common/Card";

// HOC - это функция, которая принимает в себя компонент и возвращает либо
// новый компонент, либо обновленный компонент, либо вообще другой компонент
// например <Redirect />. HOC может содержать как логические итераторы, так
// и стилистические операторы. Как я понял, - это обертка для компонента,
// которая производит какие-то манипуляции с вложенным компонентомю.

// Так как HOC - это функция, то называем её с маленькой буквы
// В данном случае реализуем функцимю, которая в зависимости от того
// залогенен пользователь или нет возвращает нам либо <Component /> либо
// строку "authorisation"
const withPropsStyles = (Component) => (props) => {
    // Данная запись аналогична записи:
    // const withPropsStyles = function(Component) {
    // return function (props) { ... }
    // }
    return (
        <CardWrapper>
            <Component {...props} name="new name"/>
        </CardWrapper>
    );
};

export default withPropsStyles;
