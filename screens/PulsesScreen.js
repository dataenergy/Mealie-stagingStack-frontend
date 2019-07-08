import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'

import CategoryTile from '../components/CategoryTile'
import {getProductList} from '../api'

export default class PulsesScreen extends React.Component {
  _getProductList = async (pathName) => {
    try {
      const productList = await getProductList(pathName)
      this.props.navigation.navigate('ProductListing', {productList: productList})
    } catch (err) {     //getProductList() in api.js needs to throw an error so that it is caught here
      console.log(err)
    }
  }

  handleSelectCategory = name => {
    const pathName = '/api/product/' + name.toLowerCase().replace(/\s/g, '')
    this._getProductList(pathName)
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#d1d1d1' source={require('../images/redLentils.jpg')} name='Red lentils' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#c6c6c6' source={require('../images/greenGram.jpg')} name='Green gram' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#aaaaaa' source={require('../images/blackGram.jpg')} name='Black gram' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#717171' source={require('../images/bengalGram.jpg')} name='Bengal gram' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#8d8d8d' source={require('../images/turkishGram.jpg')} name='Turkish gram' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#555555' source={require('../images/kidneyBeans.jpg')} name='Kidney beans' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#4f4f4f' source={require('../images/chickpeas.jpg')} name='Chickpeas' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#d1d1d1' source={require('../images/brownLentils.jpg')} name='Brown lentils' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#aaaaaa' source={require('../images/pigeonPeas.jpg')} name='Pigeon peas' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#d1d1d1' source={require('../images/whitePeas.jpg')} name='White peas' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#aaaaaa' source={require('../images/cowpeas.jpg')} name='Cowpeas' onSelectCategory={this.handleSelectCategory} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#111111',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})
