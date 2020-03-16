const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

const initialState = {
  numOfCakes: 10,
  numOfIceCream: 15
}

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'Buy a cake'
  }
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }

    case BUY_ICECREAM: return {
      ...state,
      numOfIceCream: state.numOfIceCream - 1
    }

    default: return state
  }
}

const store = createStore(reducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()