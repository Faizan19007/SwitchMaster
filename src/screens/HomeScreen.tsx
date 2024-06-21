import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type Home = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

const DEVICES = [
  {
    id: "123445",
    name: "eps21",
    state: true
  },
  {
    id: "1234",
    name: "eps22",
    state: true
  },
  {
    id: "123",
    name: "eps23",
    state: true
  },
  {
    id: "123446",
    name: "eps25",
    state: true
  },
  {
    id: "123477",
    name: "eps26",
    state: true
  },
  {
    id: "123433",
    name: "eps28",
    state: true
  },
]

const HomeScreen = ({ navigation }: Home) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Devices</Text>
      <FlatList
        data={DEVICES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.switchCard}>
              <Text>{item.name || "undefined"}</Text>
              {/* <TouchableOpacity
              style={{backgroundColor:"green"}}
                onPress={() => {
                }}
              >
                <Text>On</Text>
              </TouchableOpacity> */}
              <Button title='On'/>
            </View>

          )
        }}
      />
      <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={{ fontSize: 32, textAlign: "center", color:"white" }}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
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
    position: "absolute",
    right: 20,
    bottom: 10,
    width: 80, 
    height: 80, 
    backgroundColor: "grey", 
    borderRadius: 50,  
    justifyContent: "center" 
  }
})