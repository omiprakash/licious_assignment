import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';
const reducer = combineReducers({
    search: searchReducer,
});
const store = createStore(
  reducer, applyMiddleware(thunk)
)
export default store;