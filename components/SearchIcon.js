import React from 'react'
import {Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import {withNavigation} from 'react-navigation'

class SearchIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('ProductSearch')}>
        <Image source={require('../images/searchIcon.png')}/>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(SearchIcon)

const styles = StyleSheet.create({
  icon: {
    paddingLeft: Dimensions.get('window').width * 0.62,
  }
})
