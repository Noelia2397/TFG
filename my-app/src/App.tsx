import React from 'react';
import './assets/css/main.css';
import './assets/css/reset.css';
import './assets/css/bootstrap.scss';
import { RouterViewsPath } from './components/router/router';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <RouterViewsPath />
    </React.Fragment>
  );
}

export default App;
