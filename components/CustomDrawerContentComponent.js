import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import { DrawerItems, SafeAreaView, NavigationActions, StackActions } from 'react-navigation'
import {connect} from 'react-redux'

class CustomDrawerContentComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Welcome, {this.props.userName}</Text>
          </View>
          <DrawerItems {...this.props} itemStyle={styles.drawerItems} onItemPress={route => {
            //console.log(this.props.navigation.state.routes)
            //console.log(this.props.activeItemKey)
            //console.log(route)
            const index = this.props.navigation.state.routes.findIndex(route => route.key === this.props.activeItemKey)
            //console.log(index)
            //reset the active route/ stack (this and popToTop below combined solves the problem of complete reset in parallel routers)
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({
                  routeName: this.props.navigation.state.routes[index].routes[0].routeName,
                  params: this.props.navigation.state.routes[index].routes[0].params,
                })
              ]
            })
            this.props.navigation.dispatch(resetAction)
            //resets any other open (parallel) stack in history so that back button works as expected after reaching HomeStack
            this.props.navigation.dispatch(StackActions.popToTop())
            this.props.navigation.navigate(route.route.routeName)
          }} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItems: {
    borderTopWidth: 1,
    borderColor: '#9f9f9f',
  },
  itemContainer: {
    paddingVertical: 4,
  },
  text: {
    padding: 16,
    fontSize: 18,
  },
})

// class CustomDrawerContentComponent extends React.Component {
//   // navigateToScreen = (route) => () => {
//   //   const navigateAction = NavigationActions.navigate({
//   //     routeName: route
//   //   });
//   //   this.props.navigation.dispatch(navigateAction);
//   // }
//
//   navigateToScreen = (route) => () => {
//     //console.log(this.props.items)
//     console.log(this.props.activeItemKey)   //this.props.activeItemKey gives the current stack in drawer
//     const currentStack = this.props.items.find(stack => stack.key === this.props.activeItemKey)
//     const initalRouteName = currentStack.routes[0].routeName
//     console.log(initalRouteName)
//     const resetAction = StackActions.reset({
//       index: 0,
//       key: 'DrawerNavigator',
//       actions: [
//         NavigationActions.navigate({ routeName: route })
//       ]
//     })
//     this.props.navigation.dispatch(resetAction)
//     this.props.navigation.navigate(route)
//   }
//
//   render() {
//     return (
//       <ScrollView>
//         <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//         <View style={{padding: 15}}>
//           <Text onPress={this.navigateToScreen('Home')}>Home</Text>
//         </View>
//         <View style={{padding: 15}}>
//           <Text onPress={this.navigateToScreen('YourOrders')}>Your orders</Text>
//         </View>
//         </SafeAreaView>
//       </ScrollView>
//     )
//   }
// }

const mapStateToProps = state => ({
  userName: state.user.userName,
})

export default connect(mapStateToProps)(CustomDrawerContentComponent)

/* This one works but not as expected
// class CustomDrawerContentComponent extends React.Component {
//   render() {
//     return (
//       <ScrollView>
//         <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//           <View style={styles.itemContainer}>
//             <Text style={styles.text}>Welcome, {this.props.userName}</Text>
//           </View>
//           <DrawerItems {...this.props} itemStyle={styles.drawerItems} />
//         </SafeAreaView>
//       </ScrollView>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   drawerItems: {
//     borderTopWidth: 1,
//     borderColor: '#9f9f9f',
//   },
//   itemContainer: {
//     paddingVertical: 4,
//   },
//   text: {
//     padding: 16,
//     fontSize: 18,
//   },
// })
*/
