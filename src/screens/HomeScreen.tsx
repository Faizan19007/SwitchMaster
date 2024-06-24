import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type Home = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>


const HomeScreen = ({ navigation }: Home) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={{ fontSize: 32, textAlign: "center", color:"white" }}>+</Text>
      </TouchableOpacity>
      <Text>Add Switch</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "black"
  },
  switchCard: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding:12,
    alignItems:"center",
    borderWidth: 1,
    borderColor:"black",
    marginVertical: 5
  },
  addButton:{
    width: 80, 
    height: 80, 
    backgroundColor: "grey", 
    borderRadius: 50,  
    justifyContent: "center" 
  }
})