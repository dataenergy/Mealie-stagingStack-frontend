import {combineReducers} from 'redux'

import {
  LOG_IN_SENT,
  LOG_IN_FULFILLED,
  LOG_IN_REJECTED,
  ADD_ADDRESS,
  ADD_PRODUCT_TO_CART,
  UPDATE_CART,
  REM_PRODUCT_FROM_CART,
  CLEAR_CART,
} from './actions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN_SENT:
      return {
        ...state,
        loginSent: true,
      }
    case LOG_IN_FULFILLED:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      }
    case LOG_IN_REJECTED:
      return {
        ...state,
        loginErr: action.payload,
      }
    case ADD_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload
      }
    default:
      return state
  }
}

const cartReducer = (state = [], action) => {
  //This checks for existing product id when adding repeatedly from product screen
  if (action.type === ADD_PRODUCT_TO_CART) {
    if (    //check later if this can be replaced with a function
      state.some(product => {
        if (product._id === action.payload._id) {
          return true
        }
      })
    ) {
      const newState = state.map(product => {
        if (product._id === action.payload._id) {
          return {...product, productCount: action.payload.productCount + product.productCount, productRemainingCount: (product.numbersInStock - (action.payload.productCount + product.productCount))}
        } else {
          return {...product}
        }
      })
      return newState
    } else {
      return [...state, action.payload]
    }
  }
  if (action.type === UPDATE_CART) {
    //array.map returns a new array since state should be updated immutably
    const newState = state.map(product => {
      if (product._id === action.payload._id) {
        return {...product, productCount: action.payload.productCount, productRemainingCount: action.payload.productRemainingCount}
      } else {
        return {...product}
      }
    })
    return newState
  }
  if (action.type === REM_PRODUCT_FROM_CART) {
    return state.filter(product => product._id !== action.payload)
  }
  if (action.type === CLEAR_CART) {
    return []
  }
  return state
}

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
})

export default reducer
