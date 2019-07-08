import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import ProductTile from './ProductTile'

const OrderTile = props => (
  <TouchableOpacity onPress={() => props.onSelectOrder(props.order)}>
    <View style={styles.orderTileContainer}>
      <Text style={{fontSize: 18}}>Ordered on: {props.order.orderedOn}</Text>
      <Text style={{fontSize: 14}}>Order Id: {props.order.orderId}</Text>
      {
        props.order.cartList.map(product => (
          <View key={product._id} style={styles.productTileContainer}>
            <ProductTile product={product} screen={props.screen} />
          </View>
        ))
      }
    </View>
  </TouchableOpacity>
)

export default OrderTile

const styles = StyleSheet.create({
  orderTileContainer: {
    padding: 5,
    marginBottom: 20,
    backgroundColor: '#afafaf',
  },
  productTileContainer: {
    marginBottom: 10,
  },
})
