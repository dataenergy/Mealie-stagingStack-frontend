import React from 'react'
import {connect} from 'react-redux'

import AddAddressForm from '../components/AddAddressForm'
import {addAddress} from '../redux/actions'

class AddAddressScreen extends React.Component {
  handleSubmit = formState => {
    this.props.addAddress(formState)
    this.props.navigation.navigate('OrderSummary')
  }

  render() {
    return <AddAddressForm onSubmit={this.handleSubmit} />
  }
}

export default connect(null, {addAddress: addAddress})(AddAddressScreen)
