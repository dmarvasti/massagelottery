import "./index.css";

import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import App from "./App";
import configureStore from "./redux/configureStore";

  // import registerServiceWorker from './registerServiceWorker';
  const history = createBrowserHistory();

  const store = configureStore(
    history,
    {...(window as any).__APP_STATE__}
  );

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
// registerServiceWorker();
