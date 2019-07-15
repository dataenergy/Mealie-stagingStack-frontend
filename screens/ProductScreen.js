import React from 'react'
import {Alert, Text, View, ScrollView, StyleSheet, Button, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'

import QuantityChanger from '../components/QuantityChanger'
import {addProductToCart} from '../redux/actions'

//Initial state for the component
const initialState = {
  productCount: 0,
  isDecValid: false,
  isIncValid: true,
  isAddCartValid: false,
}

var productAtCart = {}

class ProductScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('product').displayName,
    headerTitleStyle: {
      flex: 1,
      color: '#ffffff',
      textAlign: 'center',
    },
  })

  state = initialState

  static getDerivedStateFromProps(props, state) {
    productAtCart = props.cartList.find(product => product._id === props.navigation.getParam('product')._id)
    if (productAtCart) {
      if (productAtCart.productRemainingCount === 0) {
        return ({
          isIncValid: false,
          isDecValid: false,
          isAddCartValid: false,
        })
      } else if (state.productCount === productAtCart.productRemainingCount) {
        return ({
          isIncValid: false,
          isDecValid: true,
          isAddCartValid: true,
        })
      } else if (state.productCount === 0) {
        return ({
          isIncValid: true,
          isDecValid: false,
          isAddCartValid: false,
        })
      } else {
        return ({
          isIncValid: true,
          isDecValid: true,
          isAddCartValid: true,
        })
      }
    } else {    //when that particular product is not in the cart
      if (props.navigation.getParam('product').numbersInStock === 0) {
        return ({
          isIncValid: false,
          isDecValid: false,
          isAddCartValid: false,
        })
      } else if (state.productCount === 0) {
        return ({
          isIncValid: true,
          isDecValid: false,
          isAddCartValid: false,
        })
      } else if (state.productCount === props.navigation.getParam('product').numbersInStock && props.navigation.getParam('product').numbersInStock !== 0) {
        return ({
          isIncValid: false,
          isDecValid: true,
          isAddCartValid: true,
        })
      } else {
        return ({
          isDecValid: true,
          isAddCartValid: true,
          isIncValid: true,
        })
      }
    }
  }

  handleDec = () => {
    this.setState(prevState => ({
      productCount: prevState.productCount - 1
    }))
  }

  handleInc = () => {
    this.setState(prevState => ({
      productCount: prevState.productCount + 1
    }))
  }

  showAlert = () => {
    Alert.alert(
      'Added to cart',
      '',
      [
        {
          text: 'OK',
          onPress: () => this.setState(initialState)
        },
      ],
    )
  }

  handleAddToCart = product => {
    this.props.addProductToCart({
      ...product,
      productCount: this.state.productCount,   //pass numbersLeft also
      productRemainingCount: this.props.navigation.getParam('product').numbersInStock - this.state.productCount, //useful only for the first time a product is added to cart
    })
    this.showAlert()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.topContainer}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    horizontal={true}
                    snapToInterval={Dimensions.get('window').width}
                    snapToAlignment={'center'}>
          {this.props.navigation.getParam('product').productImagePath.map((path, index) =>
            <Image
              key={index}
              style={styles.image}
              source={{uri: path}} />
          )}
        </ScrollView>
        <ScrollView style={styles.middleContainer}>
          <View style={styles.topRow}>
            <Text style={styles.text}>{this.props.navigation.getParam('product').weightOfPack} pack</Text>
            <QuantityChanger
              count={this.state.productCount}
              onInc={this.handleInc}
              onDec={this.handleDec}
              isDecButtonValid={this.state.isDecValid}
              isIncButtonValid={this.state.isIncValid} />
          </View>
          <Text style={styles.text}>{'\u20B9'} {this.props.navigation.getParam('product').price}</Text>
          <Text style={styles.text}>{this.props.navigation.getParam('product').description}</Text>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button
            color='#616161'
            title='Add to cart'
            onPress={() => this.handleAddToCart(this.props.navigation.getParam('product'))}
            disabled={!this.state.isAddCartValid} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cartList: state.cart,
})

export default connect(mapStateToProps, {addProductToCart: addProductToCart})(ProductScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 0.2,
  },
  middleContainer: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    padding: 10,
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 10,
    marginHorizontal: 40,
  },
  text: {
    padding: 5,
    fontSize: 17,
  },
  image: {
    marginHorizontal: (Dimensions.get('window').width * 0.4)/2,
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    resizeMode: 'contain',
  },
})
