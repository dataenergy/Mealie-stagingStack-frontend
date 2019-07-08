import React from 'react'
import {Text, View, ScrollView, Button, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import uuid from 'uuid/v4'

import ProductTile from '../components/ProductTile'
import {clearCart} from '../redux/actions'
import {createNewOrderDoc} from '../api'

let deliveryCharge = 59
let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

class OrderSummaryScreen extends React.Component {
  handleConfirmOrder = (cartSubtotal) => {
    const today = new Date()
    const date = today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear()
    const orderId = uuid()
    const orderDetails = this.orderDetails(cartSubtotal, date, orderId)
    this._createNewOrderDoc(orderDetails)
  }

  _createNewOrderDoc = async (orderDetails) => {
    const result = await createNewOrderDoc(orderDetails)
    if (result === 'success') {
      this.props.clearCart()
      this.props.navigation.navigate('OrderConfirmation', {orderId: orderDetails.orderId})
    }
  }

  orderDetails = (cartSubtotal, date, orderId) => ({
    userEmail: this.props.userEmail,
    cartList: this.props.cartList,
    costToUser: {
      itemsSubtotal: cartSubtotal,
      deliveryCharge: deliveryCharge,
      orderTotal: cartSubtotal + deliveryCharge,
    },
    deliveryAddress: this.props.deliveryAddress,
    orderedOn: date,
    orderId: orderId,
  })

  render() {
    const cartSubtotal = this.props.cartList.reduce((acc, obj) => acc + (obj.productCount * obj.price), 0)
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 22}}>Order summary</Text>
          </View>
          {this.props.cartList.map(product => (
            <ProductTile key={product._id} product={product} screen={'OrderSummary'} />
          ))}
        </ScrollView>
        <View style={styles.middleUpperContainer}>
          <View style={{flex: 0.35}}>
            <Text style={styles.text}>Delivery address:</Text>
          </View>
          <View style={{flex: 0.65}}>
            <Text style={styles.text}>{this.props.deliveryAddress.name},</Text>
            <Text style={styles.text}>{this.props.deliveryAddress.address1},</Text>
            <Text style={styles.text}>{this.props.deliveryAddress.address2}, {this.props.deliveryAddress.pincode}</Text>
            <Text style={styles.text}>Phone: {this.props.deliveryAddress.phone}</Text>
          </View>
        </View>
        <View style={styles.middleLowerContainer}>
          <View>
            <Text style={styles.text}>Items:</Text>
            <Text style={styles.text}>Delivery charge:</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Order Total:</Text>
          </View>
          <View>
            <Text style={styles.text}>{'\u20B9'} {cartSubtotal}</Text>
            <Text style={styles.text}>{'\u20B9'} {deliveryCharge}</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{'\u20B9'} {cartSubtotal + 59}</Text>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <Button color='#616161' title='Confirm your order' onPress={() => this.handleConfirmOrder(cartSubtotal)} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.userEmail,
  deliveryAddress: state.user.deliveryAddress,
  cartList: state.cart,
})

export default connect(mapStateToProps, {clearCart: clearCart})(OrderSummaryScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  middleUpperContainer: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#bbbbbb',
    padding: 7,
    borderTopWidth: 1,
    borderColor: '#9f9f9f',
  },
  middleLowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#bbbbbb',
    padding: 7,
    borderWidth: 1,
    borderColor: '#9f9f9f',
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 10,
    marginHorizontal: 40,
  },
  text: {
    //paddingBottom: 5,
    fontSize: 14,
  },
})
