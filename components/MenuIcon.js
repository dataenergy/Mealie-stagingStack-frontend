import React from 'react'
import {Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {withNavigation} from 'react-navigation'

class MenuIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.toggleDrawer()}>
        <Image source={require('../images/menuIcon.png')}/>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(MenuIcon)

const styles = StyleSheet.create({
  icon: {
    paddingLeft: Dimensions.get('window').width * 0.04,
  }
})
