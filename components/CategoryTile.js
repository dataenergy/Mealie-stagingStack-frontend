import React from 'react'
import {TouchableOpacity, Text, View, Image, StyleSheet, Dimensions} from 'react-native'

const CategoryTile = props => (
  <TouchableOpacity onPress={() => props.onSelectCategory(props.name)}>
    <View style={[styles.view, {backgroundColor: props.backgroundColor}]}>
      <Image style={styles.image} source={props.source} />
      <Text style={styles.fontSize}>{props.name}</Text>
    </View>
  </TouchableOpacity>
)

export default CategoryTile

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    paddingTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
  },
})
