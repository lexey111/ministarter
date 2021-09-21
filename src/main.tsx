import React from 'react';
import ReactDOM from 'react-dom';
import { AppComponent } from './app/app';

import './app/styles/app.less';

const runApp = (): void => {
  ReactDOM.render(
    <AppComponent/>,
    document.getElementById('root')
  );
};

runApp();
