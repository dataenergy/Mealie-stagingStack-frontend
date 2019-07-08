import React from 'react'
import {Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {withNavigation, StackActions} from 'react-navigation'

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.icon} onPress={() => {
        //resets any other open (parallel) stack in history so that back button works as expected after reaching HomeStack
        this.props.navigation.dispatch(StackActions.popToTop())
        this.props.navigation.navigate('Cart')
      }}>
        <Image source={require('../images/shoppingCartIcon.png')}/>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(ShoppingCartIcon)

const styles = StyleSheet.create({
  icon: {
    paddingRight: Dimensions.get('window').width * 0.04,
  }
})
