import React from 'react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import {createRoot} from 'react-dom/client';

// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// ReactDOM.render(
//     document.getElementById('root')
// )


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

defineCustomElements(window);
