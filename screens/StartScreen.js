import React from 'react'
import {connect} from 'react-redux'
import {Text, Button, View, ActivityIndicator, StyleSheet} from 'react-native'

import {loginUser} from '../redux/actions'

//include proptypes
class StartScreen extends React.Component {
  componentDidMount() {
    if(this.props.accessToken) {
      this.props.navigation.navigate('Main')
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.accessToken) {
      this.props.navigation.navigate('Main')
    }
  }

  handleLogin = async () => {
    this.props.loginUser()
  }

  render() {
    if (this.props.loginSent) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Mealie</Text>
        <Text style={styles.bodyText}>A marketplace for all your pulses and grains needs</Text>
        <View style={styles.buttonContainer}>
          <Button color='#424242' title='Continue with Google' onPress={this.handleLogin}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  err: state.user.loginErr,
  accessToken: state.user.accessToken,
  loginSent: state.user.loginSent,
})

export default connect(mapStateToProps, {loginUser})(StartScreen)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 50,
  },
  headerText: {
    fontSize: 33,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 180,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
})
