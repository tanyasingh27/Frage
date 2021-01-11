import React from 'react';
import Content from '../../containers/Content/Content';
import './Layout.css';

const layout = () => (
    <div className="layout">
        <h1 className="heading">
        <img src={require('../../assets/images/logo.png')} width="40px" height="40px"/>    
            Frage
        </h1>
        <Content/>
    </div>
);

export default layout;