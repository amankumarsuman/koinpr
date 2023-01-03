import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserHistory } from 'history';
// import { QueryParamProvider } from 'use-query-params';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const history = createBrowserHistory()

root.render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <QueryParamProvider history={history }> */}
        <App />
      {/* </QueryParamProvider> */}
    </Provider>
  </React.StrictMode>
);
