import React from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'

export default class OrderConfirmationScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={{fontSize: 22}}>Order confirmation</Text>
          <View style={styles.topInnerContainer}>
            <Text>Your order is confirmed.</Text>
            <Text>Order Id: {this.props.navigation.getParam('orderId')}</Text>
          </View>
          <View style={styles.topInnerContainer}>
            <Text>Thank you for your order.</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button color='#616161' title='View or manage order' onPress={() => this.props.navigation.navigate('YourOrders')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    padding: 10,
  },
  topInnerContainer: {
    paddingTop: 15,
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 10,
    marginHorizontal: 40,
  },
})
