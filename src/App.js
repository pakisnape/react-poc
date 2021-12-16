import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import videReducer from "./store/reducers/videoReducer";
import thunk from "redux-thunk";
import Layout from "./components/Layout/Layout";

const rootReducer = combineReducers({
  video: videReducer,
});

const logger = (store) => {
  return (next) => {
      return (action) => {
          console.log("[Middleware] Dispatching", action);
          const result = next(action);
          console.log("[Middleware] next state", store.getState());
          return result;
      };
  };
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(logger, thunk))
);

const App = () => {

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
