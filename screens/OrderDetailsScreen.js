import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'

import ProductTile from '../components/ProductTile'

export default class OrderDetailsScreen extends React.Component {
  render() {
    return (
      <ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 22}}>Order details</Text>
      </View>
      <View style={styles.topContainer}>
        <Text style={{fontSize: 18}}>Ordered on: {this.props.navigation.getParam('order').orderedOn}</Text>
        <Text style={{fontSize: 14}}>Order Id: {this.props.navigation.getParam('order').orderId}</Text>
      </View>
      <View style={styles.middleUpperContainer}>
        <View style={{flex: 0.35}}>
          <Text style={styles.text}>Delivery address:</Text>
        </View>
        <View style={{flex: 0.65}}>
          <Text style={styles.text}>{this.props.navigation.getParam('order').deliveryAddress.name},</Text>
          <Text style={styles.text}>{this.props.navigation.getParam('order').deliveryAddress.address1},</Text>
          <Text style={styles.text}>
            {this.props.navigation.getParam('order').deliveryAddress.address2}, {this.props.navigation.getParam('order').deliveryAddress.pincode}
          </Text>
          <Text style={styles.text}>Phone: {this.props.navigation.getParam('order').deliveryAddress.phone}</Text>
        </View>
      </View>
      <View style={styles.middleLowerContainer}>
        <View>
          <Text style={styles.text}>Items:</Text>
          <Text style={styles.text}>Delivery charge:</Text>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>Order Total:</Text>
        </View>
        <View>
          <Text style={styles.text}>{'\u20B9'} {this.props.navigation.getParam('order').costToUser.itemsSubtotal}</Text>
          <Text style={styles.text}>{'\u20B9'} {this.props.navigation.getParam('order').costToUser.deliveryCharge}</Text>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{'\u20B9'} {this.props.navigation.getParam('order').costToUser.orderTotal}</Text>
        </View>
      </View>
      {
        this.props.navigation.getParam('order').cartList.map(product => (
          <View key={product._id} style={styles.productTileContainer}>
            <ProductTile product={product} screen={'OrderDetails'} />
          </View>
        ))
      }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    padding: 5,
    backgroundColor: '#afafaf',
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
  text: {
    fontSize: 15,
  },
  productTileContainer: {
    marginVertical: 10,
  },
})
