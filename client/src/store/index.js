import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducer';
// import {configureStore} from 'redux-toolkit';
//ver
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;