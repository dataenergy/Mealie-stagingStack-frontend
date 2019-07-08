import {googleLogin} from '../api'

//action types
export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'
export const ADD_ADDRESS = 'ADD_ADDRESS'
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REM_PRODUCT_FROM_CART = 'REM_PRODUCT_FROM_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const CLEAR_CART = 'CLEAR_CART'

//action creators
export const loginUser = () => async dispatch => {
  dispatch({
    type: LOG_IN_SENT
  })
  try {
    const result = await googleLogin()
    dispatch({
      type: LOG_IN_FULFILLED,
      payload: result,
    })
  } catch (err) {
    dispatch({
      type: LOG_IN_REJECTED,
      payload: err.message,
    })
  }
}

export const addProductToCart = newProduct => ({
  type: ADD_PRODUCT_TO_CART,
  payload: newProduct,
})

export const updateCart = update => ({
  type: UPDATE_CART,
  payload: update,
})

export const remProductFromCart = productId => ({
  type: REM_PRODUCT_FROM_CART,
  payload: productId,
})

export const addAddress = address => ({
  type: ADD_ADDRESS,
  payload: address,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})
