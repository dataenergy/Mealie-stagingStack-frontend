import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {Dimensions} from 'react-native'

import StartScreen from './screens/StartScreen'
import PulsesScreen from './screens/PulsesScreen'
import GrainsScreen from './screens/GrainsScreen'
import ProductSearchScreen from './screens/ProductSearchScreen'
import ProductListingScreen from './screens/ProductListingScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import AddAddressScreen from './screens/AddAddressScreen'
import OrderSummaryScreen from './screens/OrderSummaryScreen'
import OrderConfirmationScreen from './screens/OrderConfirmationScreen'
import YourOrdersScreen from './screens/YourOrdersScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'

import ShoppingCartIcon from './components/ShoppingCartIcon'
import SearchIcon from './components/SearchIcon'
import MenuIcon from './components/MenuIcon'
import CustomDrawerContentComponent from './components/CustomDrawerContentComponent'

const HomeTabNavigator = createAppContainer(createMaterialTopTabNavigator({
  Pulses: PulsesScreen,
  Grains: GrainsScreen,
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#616161'
    },
  }
}))

const HomeNavigator = createAppContainer(createStackNavigator({
  Home: HomeTabNavigator,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerRight: <ShoppingCartIcon />,
    headerTitle: <SearchIcon />,
    headerLeft: <MenuIcon />,
  }
}))

const ProductNavigator = createAppContainer(createStackNavigator({
  //Home: HomeTabNavigator,
  ProductListing: ProductListingScreen,
  Product: ProductScreen,
  //Cart: CartScreen,
  ProductSearch: ProductSearchScreen,
}, {
  //initialRouteName: 'ProductListing',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerRight: <ShoppingCartIcon />,
    headerLeft: <MenuIcon />,
  }
}))

const ProductSearchNavigator = createAppContainer(createStackNavigator({
  ProductSearch: ProductSearchScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerRight: <ShoppingCartIcon />,
    headerLeft: <MenuIcon />,
  }
}))

const CartNavigator = createAppContainer(createStackNavigator({
  //Home: HomeTabNavigator,
  Cart: CartScreen,
  AddAddress: AddAddressScreen,
  OrderSummary: OrderSummaryScreen,
}, {
  //initialRouteName: 'Cart',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerLeft: <MenuIcon />,
  }
}))

const OrderConfirmationNavigator = createAppContainer(createStackNavigator({
  OrderConfirmation: OrderConfirmationScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerLeft: <MenuIcon />,
  }
}))

const YourOrdersNavigator = createAppContainer(createStackNavigator({
  YourOrders: YourOrdersScreen,
  OrderDetails: OrderDetailsScreen,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#424242'
    },
    headerRight: <ShoppingCartIcon />,
    headerTitle: <SearchIcon />,
    headerLeft: <MenuIcon />,
  }
}))

const DrawerNavigator = createAppContainer(createDrawerNavigator({
  //The order of the stacks influence the back button behavior of the header icons; find out more
  HomeStack: {
    screen: HomeNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    }
  },
  YourOrdersStack: {
    screen: YourOrdersNavigator,
    navigationOptions: {
      drawerLabel: 'Your Orders'
    }
  },
  ProductSearchStack: {
    screen: ProductSearchNavigator,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  },
  ProductStack: {
    screen: ProductNavigator,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  },
  CartStack: {
    screen: CartNavigator,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  },
  OrderConfirmationStack: {
    screen: OrderConfirmationNavigator,
    navigationOptions: () => ({
      drawerLabel: () => null,
    })
  }
}, {
  initialRouteName: 'HomeStack',
  //order: ['YourOrdersStack', 'HomeStack'],
  //backBehavior: 'initialRoute',
  contentComponent: CustomDrawerContentComponent,
  drawerWidth: Dimensions.get('window').width * 0.6,
}))

const AppNavigator = createAppContainer(createSwitchNavigator({
  Start: StartScreen,
  Main: DrawerNavigator,
}))

export default AppNavigator
