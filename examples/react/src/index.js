import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import mediator from './rootMediator'
import MediatorProvider from './MediatorProvider'

const MediatorApp = (props) => (
    <MediatorProvider mediator={props.mediator}>
        <App />
    </MediatorProvider>
);

ReactDOM.render(<MediatorApp mediator={mediator} />, document.getElementById('root'));
registerServiceWorker();
