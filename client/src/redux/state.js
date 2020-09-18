import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'

let storeData ={
    setData:[],
    getData:[],
}
function appReducer(state = storeData,action='payload'){
    let stateCopy = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case 'GET_DATA':
            stateCopy.setData = [...action.payload] 
            return stateCopy
        case 'WORD_DATA':
            stateCopy.getData.push({...action.payload})
            return stateCopy
       
        default:
            return state
    }
}
const store = createStore(appReducer,applyMiddleware(thunk));
export default store