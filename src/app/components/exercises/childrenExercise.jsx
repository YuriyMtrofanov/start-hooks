// import React, { useState } from "react";
import React from "react";
import CollapseWrapper from "../common/collapse";
import PropTypes from "prop-types";

const NewFormComponent = ({ children }) => {
let count = 0;
return React.Children.toArray(children).map((child) => {
    count++;
    const config = {
        ...child.props,
        value: count
    };
    const clonedElement = React.cloneElement(child, config);
    return clonedElement;
    });
};

NewFormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <NewFormComponent>
                <Component />
                <Component />
                <Component />
            </NewFormComponent>
        </CollapseWrapper>
    );
};

const Component = ({ value }) => {
    return <div> {`Компонент списка ${value}`} </div>;
};

Component.propTypes = {
    value: PropTypes.number
};

export default ChildrenExercise;
