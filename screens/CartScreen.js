import React from 'react'
import {ScrollView, View, Button, Text, StyleSheet, Dimensions} from 'react-native'
import {connect} from 'react-redux'

import ProductTile from '../components/ProductTile'
import SearchIcon from '../components/SearchIcon'
import {updateCart} from '../redux/actions'
import {remProductFromCart} from '../redux/actions'

class CartScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Your shopping cart',
    headerTitleStyle: {
      flex: 1,
      color: '#ffffff',
      textAlign: 'center',
    },
    headerRight: <SearchIcon />,
    headerRightContainerStyle: {
      paddingRight: Dimensions.get('window').width * 0.04,
    },
  }

  handleDec = product => {
    product.productCount = product.productCount - 1
    this.props.updateCart({
      _id: product._id,
      productCount: product.productCount, productRemainingCount: product.numbersInStock - product.productCount
    })
  }

  handleInc = product => {
    product.productCount = product.productCount + 1
    this.props.updateCart({
      _id: product._id,
      productCount: product.productCount, productRemainingCount: product.numbersInStock - product.productCount
    })
  }

  handleRemProduct = productId => {
    this.props.remProductFromCart(productId)
  }

  //Search: pass entire object as props or object keys' values as props?
  //Search: performance effects of doing computation on each render
  render() {
    const totalItemsCount = this.props.cartList.reduce((acc, obj) => acc + obj.productCount, 0)
    const cartSubtotal = this.props.cartList.reduce((acc, obj) => acc + (obj.productCount * obj.price), 0)
    if (totalItemsCount !== 0) {
      return (
        <View style={styles.mainContainer}>
          <ScrollView>
            {this.props.cartList.map(product => (
              <ProductTile
                key={product._id}
                product={product}
                onInc={this.handleInc}
                onDec={this.handleDec}
                onRem={this.handleRemProduct}
                screen={'Cart'}
              />
            ))}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.textView}>
              <Text style={styles.text}>Cart Subtotal ({totalItemsCount} items): {'\u20B9'} {cartSubtotal}</Text>
            </View>
            <Button color='#616161' title='Buy now' onPress={() => this.props.navigation.navigate('AddAddress')} />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22}}>Your shopping cart is empty.</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textView}>
            <Text style={styles.text}>Cart Subtotal ({totalItemsCount} items): {'\u20B9'} {cartSubtotal}</Text>
          </View>
          <Button color='#616161' title='Buy now' disabled={true} />
        </View>
      </View>
    )
  }
}

mapStateToProps = state => ({
  cartList: state.cart,
})

export default connect(mapStateToProps, {updateCart: updateCart, remProductFromCart: remProductFromCart})(CartScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 5,
    marginHorizontal: 40,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 5,
    fontSize: 17,
  },
})
