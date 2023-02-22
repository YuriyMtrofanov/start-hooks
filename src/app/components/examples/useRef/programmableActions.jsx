import React, { useRef } from "react";
import CardWrapper from "../../common/Card";
import Divider from "../../common/divider";
import SmallTitle from "../../common/typografy/smallTitle";
const ProgrammableActionsExample = () => {
    // <Divider /> - это просто горизонтальная линия, чтобы отделить заголовок от текста, например
    // С помощью данного приема можем получить референс нашего поля ввода "email"
    // При выводе значения в консоль inputRef = {current: input#email.form-label}
    // Поэтому обратимся по свойству inputRef.current и получим нашу запись поля ввода:
    // inputRef.current = <input type="email" class="form-label" id="email">
    // То есть в React данный функционал схож с методом getItemById в чистом JS

    // Также обращаясь к свойству "current" и вызвав метод focus(), мы можем
    // установить фокус на выбранный элемент (то есть в поле ввода появится курсор
    // оно как бы становится выбранным по умолчанию и пользователю не нужно наводить)
    // на данное поле курсор, чтобы начать с ним взаимодействовать) inputRef.current.focus();
    // В данном примере мы с помощью кнопки вызываем метод handleClick, который устанавливает
    // фокус на получаемый референс нашего поля <input/>

    // В качестве второго примера можем задать новый стиль нашего поля ввода, например изменить
    // его ширину, задав с помощью функции handleClickWidth параметр inputRef.current.style.width = "100px".

    // Т.о. с помощью useRef можем получать референсы компонентов DOM дерева и менять их стили, фокус и
    // производить различные манипуляции над ними
    const inputRef = useRef();
    const handleClick = () => {
        // console.log(inputRef.current);
        inputRef.current.focus();
    };
    const handleClickWidth = () => {
        // console.log(inputRef.current);
        inputRef.current.style.width = "100px";
    };
    return (
        <CardWrapper>
            <SmallTitle className="card-title">
                Программируемые действия и свойства
            </SmallTitle>
            <Divider />
            <label htmlFor="email" className="form-label">
                Email{" "}
            </label>
            <input
                ref={inputRef}
                type="email"
                className="form-control"
                id="email"/>
            <button className="btn btn-primary" onClick = {handleClick}>Фокус input</button>
            <button className="btn btn-secondary" onClick = {handleClickWidth}>Изменить ширину</button>
        </CardWrapper>
    );
};

export default ProgrammableActionsExample;
