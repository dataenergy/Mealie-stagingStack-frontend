import React from 'react'
import {Button, Text, View, StyleSheet} from 'react-native'

const QuantityChanger = props => (
  <View style={styles.view}>
    <Button color='#8d8d8d' title='-' onPress={props.onDec} disabled={!props.isDecButtonValid} />
    <Text style={styles.text}>{props.count}</Text>
    <Button color='#383838' title='+' onPress={props.onInc} disabled={!props.isIncButtonValid} />
  </View>
)

export default QuantityChanger

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    fontSize: 17,
  },
})
