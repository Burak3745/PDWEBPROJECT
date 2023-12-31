import movieReducer from './Reducers/movieReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    movie: movieReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;