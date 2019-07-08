import * as Expo from 'expo'
import {androidClientId} from './data.key/androidClientId'

//Google login api
export const googleLogin = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: androidClientId,
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    })

    if (result.type === 'success') {
      //console.log(result)
      return {
        accessToken: result.accessToken,
        userName: result.user.givenName,
        userEmail: result.user.email,    //check Expo docs in regards to 'else' and 'err' (throw it)
      }
    }
  } catch (err) {
    return err
  }
}

//Initiate a GET request with the specified pathname to get the product listing
export const getProductList = async (pathName) => {
  try {
    const response = await fetch(`http://192.168.1.4:5000${pathName}`)
    const result = await response.json()
    // console.log(response)
    // console.log(result)
    return result
  } catch (err) {
    return err
  }
}

//A POST request to add new document for every order
export const createNewOrderDoc = async orderDetails => {
  const response = await fetch('http://192.168.1.4:5000/api/order/create', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(orderDetails)
  })    //handle for errors
  if (response.ok) {
    return 'success'
  }
}

//A POST request to get user order history
export const getOrderHistory = async email => {
  const response = await fetch('http://192.168.1.4:5000/api/order/read', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({userEmail: email})
  })
  const result = await response.json()
  return result
}
