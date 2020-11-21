import { createStore } from 'redux'

const initialState = {
  numResults : '50'
}

const reducer = (state = initialState, action) => {
  if(action.type === 'CHANGE_NUM_RESULTS'){
    return {...state, numResults: action.payload}   
    }
  

  return state;
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store