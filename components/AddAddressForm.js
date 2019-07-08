import React from 'react'
import {Button, StyleSheet, TextInput, View, Text, ScrollView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class AddAddressForm extends React.Component {
  state = {
    name: '',
    address1: '',
    address2: '',
    pincode: '',
    phone: '',
    isFormValid: true,
  }

  //implement validateForm later

  getHandler = key => val => {
    this.setState({[key]: val})
  }

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({phone})
    }
  }

  handlePincodeChange = pincode => {
    if (+pincode >= 0 && pincode.length <= 6) {
      this.setState({pincode})
    }
  }

  handleSubmit = () => {
    this.props.onSubmit((({isFormValid, ...others}) => ({...others}))(this.state))
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      <KeyboardAwareScrollView style={styles.form} enableOnAndroid={true} extraScrollHeight={100}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 22}}>Enter a delivery address</Text>
        </View>
        <Text>Name*</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.getHandler('name')}
          placeholder='Full name'
          />
        <Text>Address1*</Text>
        <TextInput
          style={styles.input}
          value={this.state.address1}
          onChangeText={this.getHandler('address1')}
          placeholder='Address1'
        />
        <Text>Address2</Text>
        <TextInput
          style={styles.input}
          value={this.state.address2}
          onChangeText={this.getHandler('address2')}
          placeholder='Address2'
        />
        <Text>Pincode*</Text>
        <TextInput
          style={styles.input}
          value={this.state.pincode}
          onChangeText={this.handlePincodeChange}
          keyboardType='numeric'
          placeholder='Pincode'
        />
        <Text>Phone*</Text>
        <TextInput
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          keyboardType='numeric'
          placeholder='Phone'
        />
      </KeyboardAwareScrollView>
      <View style={styles.bottomContainer}>
        <Button color='#616161' title='Continue' onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    //justifyContent: 'space-between',
  },
  bottomContainer: {
    paddingBottom: 17,
    paddingTop: 10,
    marginHorizontal: 40,
  },
  input: {
    padding: 10,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
})
