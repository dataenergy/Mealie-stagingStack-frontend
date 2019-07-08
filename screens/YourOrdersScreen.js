import React from 'react'
import {Text, View, ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import {getOrderHistory} from '../api'
import OrderTile from '../components/OrderTile'

class YourOrdersScreen extends React.Component {
  state = {
    orders: null
  }

  _getOrderHistory = async (email) => {
    const result = await getOrderHistory(email)
    //console.log(result)
    //return result
    this.setState({
      orders: result
    })
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._getOrderHistory(this.props.userEmail)
    })
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  handleSelectOrder = order => {
    this.props.navigation.navigate('OrderDetails', {order: order})
  }

  render() {
    //console.log(this.state.orders)
    if (this.state.orders) {
      if (this.state.orders.length !== 0) {
        return (
          <ScrollView>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 22}}>Your orders</Text>
          </View>
          {this.state.orders.map(order => (
            <OrderTile key={order._id} order={order} screen={'YourOrders'} onSelectOrder={this.handleSelectOrder} />
          ))}
          </ScrollView>
        )
      }
      if (this.state.orders.length === 0) {
        return (
          <View style={{padding: 10}}>
            <Text style={{fontSize: 22}}>No previous orders</Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.userEmail
})

export default connect(mapStateToProps)(YourOrdersScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
})
