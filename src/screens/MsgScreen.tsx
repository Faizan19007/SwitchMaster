import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BluetoothService from '../services/BluetoothService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import database from '@react-native-firebase/database'

type MsgScreen = NativeStackScreenProps<RootStackParamList, 'MsgScreen'>

const MsgScreen = ({ route }: MsgScreen) => {
  useEffect(() => {
    database()
      .ref('/LED_STATUS')
      .on('value', snapshot => {
        console.log('led status is', snapshot.val());
        setStatus(snapshot.val())
      });

  }, [])
  const [msg, setMsg] = useState('')
  const { address } = route.params
  const [status, setStatus] = useState(false)
  //save the state of the button, if wifi is sent successfully then device is connected to internet
  const [online, setOnline] = useState(false)

  async function sendWifi() {
    setOnline(!(await BluetoothService.sendData(address, msg)))

  }
  return (
    <View style={styles.container}>
      <Text>Connect the Device to wifi, to enable ON/OFF button</Text>

      <Button title={status ? "ON" : "OFF"}
        onPress={() => {
          database()
            .ref('/LED_STATUS')
            .set(!status)
            .then(() => console.log('Data set.'));
          setStatus(!status)
        }
        }
        disabled={!online}
      />

      <TextInput style={{ borderWidth: 1, marginVertical: 8 }}
        onChangeText={setMsg}
        value={msg}
        placeholder='SSID:password' />
      <Button title='Send Msg'
        onPress={() => sendWifi()} />
    </View>
  )
}

export default MsgScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"column-reverse",
    margin: 10,
    justifyContent: "flex-end",
    // alignItems:"flex-end"
  },
})