import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BluetoothService from '../services/BluetoothService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type MsgScreen = NativeStackScreenProps<RootStackParamList, 'MsgScreen'>

const MsgScreen = ({route}: MsgScreen) => {
    const [msg, setMsg] = useState('')
    const {address} = route.params
  return (
    <View style={{margin:10}}>
      <TextInput style={{borderWidth:2}}
      onChangeText={setMsg}
      value={msg}
      placeholder='SSID:password'/>
      <Button title='Send Msg' 
      onPress={()=>
        BluetoothService.sendData(address, msg)
      }/>
    </View>
  )
}

export default MsgScreen

const styles = StyleSheet.create({})