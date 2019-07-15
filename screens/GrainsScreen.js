import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'

import CategoryTile from '../components/CategoryTile'
import {getProductList} from '../api'

export default class GrainsScreen extends React.Component {
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
          <CategoryTile backgroundColor='#d1d1d1' source={require('../assets/images/rice.jpg')} name='Rice' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#c6c6c6' source={require('../assets/images/wheat.jpg')} name='Wheat' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#aaaaaa' source={require('../assets/images/quinoa.jpg')} name='Quinoa' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#717171' source={require('../assets/images/barley.jpg')} name='Barley' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#8d8d8d' source={require('../assets/images/oats.jpg')} name='Oats' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#555555' source={require('../assets/images/ragi.jpg')} name='Ragi' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#4f4f4f' source={require('../assets/images/bajra.jpg')} name='Bajra' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#d1d1d1' source={require('../assets/images/jowar.jpg')} name='Jowar' onSelectCategory={this.handleSelectCategory} />
          <CategoryTile backgroundColor='#aaaaaa' source={require('../assets/images/semolina.jpg')} name='Semolina' onSelectCategory={this.handleSelectCategory} />
        </View>
        <View style={styles.row}>
          <CategoryTile backgroundColor='#d1d1d1' source={require('../assets/images/buckwheat.jpg')} name='Buckwheat' onSelectCategory={this.handleSelectCategory} />
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
