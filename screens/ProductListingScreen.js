import React from 'react'
import {Text, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'

import ProductTile from '../components/ProductTile'

class ProductListingScreen extends React.Component {
  handleSelectProduct = product => {
    this.props.navigation.navigate('Product', {product: product})
  }

  //Search: pass entire object as props or object keys' values as props?
  //What if boolean prop is undefined? -> isCartScreen is not defined here
  render() {
    return (
      <ScrollView>
      {this.props.navigation.getParam('productList').map(product => {
        const productAtCart = this.props.cartList.find(cartProduct => cartProduct._id === product._id)
        if (productAtCart) {
          return (<ProductTile key={productAtCart._id} product={productAtCart} onSelectProduct={this.handleSelectProduct} screen={'ProductListing'} />)
        } else {
          return (<ProductTile key={product._id} product={product} onSelectProduct={this.handleSelectProduct} screen={'ProductListing'} />)
        }
      })}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  cartList: state.cart,
})

//This screen component listens to the store to update the availability in the product tile
export default connect(mapStateToProps)(ProductListingScreen)
