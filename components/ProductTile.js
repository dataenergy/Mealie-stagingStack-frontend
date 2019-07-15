import React from 'react'
import {TouchableOpacity, Button, Text, View, Image, StyleSheet, Dimensions} from 'react-native'

import QuantityChanger from './QuantityChanger'

const checkDecValidity = product => {
  if (product.productCount === 1) {
    return false
  } else {
    return true
  }
}

const checkIncValidity = product => {
  if (product.productCount === product.numbersInStock) {
    return false
  } else {
    return true
  }
}

const ProductTile = props => (
  <TouchableOpacity onPress={() => props.onSelectProduct(props.product)} disabled={!(props.screen === 'ProductListing')}>
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{uri: props.product.productImagePath[0]}} />
      </View>
      <View style={styles.rightContainer}>
        <View style={{flex:1}}>
          <Text style={{fontSize: 18}}>{props.product.displayName}</Text>
          <Text style={{fontSize: 17}}>{props.product.weightOfPack}</Text>
          <Text style={{fontSize: 12}}>by {props.product.sellerName}</Text>
          <Text style={{fontSize: 17}}>{'\u20B9'} {props.product.price}</Text>
        </View>
        {(() => {
          switch (props.screen) {
            case 'Cart':
              return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <QuantityChanger
                    count={props.product.productCount}
                    onInc={() => props.onInc(props.product)}
                    onDec={() => props.onDec(props.product)}
                    isDecButtonValid={checkDecValidity(props.product)}
                    isIncButtonValid={checkIncValidity(props.product)} />
                  <Button color='#616161' title='Remove' onPress={() => props.onRem(props.product._id)} />
                </View>
              )
            case 'ProductListing':
              if (
                (('productRemainingCount' in props.product ? props.product.productRemainingCount : props.product.numbersInStock) > 0) &&
                (('productRemainingCount' in props.product ? props.product.productRemainingCount : props.product.numbersInStock) < 6)
              ) {
                return (
                  <Text style={{position: 'absolute', bottom: 7, right: 7, color: '#b36200'}}>
                  Only {('productRemainingCount' in props.product ? props.product.productRemainingCount : props.product.numbersInStock)} left in stock
                  </Text>
                )
              }
              if (('productRemainingCount' in props.product ? props.product.productRemainingCount : props.product.numbersInStock) > 5) {
                return (
                  <Text style={{position: 'absolute', bottom: 7, right: 7, color: '#004e00'}}>In stock</Text>
                )
              }
              if (('productRemainingCount' in props.product ? props.product.productRemainingCount : props.product.numbersInStock) === 0) {
                return (
                  <View style={{position: 'absolute', bottom: 7, right: 7}}>
                    <Button color='#616161' title='Request' />
                  </View>
                )
              }
            case 'OrderSummary':
            case 'YourOrders':    //this is called 'fall-through'
              return (
                <View style={{position: 'absolute', bottom: 7, left: 7}}>
                  <Text style={{fontSize: 17}}>Quantity: {props.product.productCount}</Text>
                </View>
              )
            case 'OrderDetails':
              return (
                <View style={{position: 'absolute', bottom: 7, right: 7}}>
                  <View style={{paddingBottom: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 16}}>Quantity: {props.product.productCount}</Text>
                  </View>
                  <Button color='#616161' title='Write a product review' />
                </View>
              )
            default:
              return null
          }
        })()}
      </View>
    </View>
  </TouchableOpacity>
)

export default ProductTile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height / 3.7,
    backgroundColor: '#e2e2e2',
    borderColor: 'black',
    borderWidth: 1,
  },
  leftContainer: {
    flex: 0.4,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
  },
  image: {
    width: (Dimensions.get('window').width * 0.4) - 15,
    height: (Dimensions.get('window').height / 3.7) - 10,
    resizeMode: 'contain',
  },
})
