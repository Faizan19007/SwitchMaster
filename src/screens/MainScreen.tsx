
import RNBluetoothClassic, { BluetoothDevice, } from 'react-native-bluetooth-classic'
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BluetoothService from '../services/BluetoothService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type Main = NativeStackScreenProps<RootStackParamList, 'MainScreen'>

function App({ navigation }: Main): React.JSX.Element {
  useEffect(() => {
    BluetoothService.init()
    pairedDevice()
  }, [])
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([])
  const [unpairedDevices, setUnPairedDevices] = useState<BluetoothDevice[]>([])
  async function pairedDevice() {

    //empty the previous list to avoid duplicate devices in the list
    if(pairedDevice.length > 0){
      setPairedDevices([])
    }
    setPairedDevices(await BluetoothService.getPairedDevices())
  }
  async function scanDevices() {
    console.log("scaning")
    const unpaired = await RNBluetoothClassic.startDiscovery()
    setUnPairedDevices(unpaired)
    console.log(unpairedDevices)
  }

  async function sendData(address: string) {
    await BluetoothService.connectTo(address)
    BluetoothService.sendData(address, "hello world")

  }

  async function connect(address: string) {
    let response = await BluetoothService.connectTo(address)
    if (response) {
      ToastAndroid.show("connected", 5)
    }
    else {
      ToastAndroid.show("connection error", 5)
    }

  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Button title="start scaning"
        onPress={() => {
          pairedDevice()
        }}
      />
      {/* <Button title='demo'
      onPress={()=> navigation.navigate("MsgScreen", {address:"1234567"})}/> */}
      <Text style={styles.sectionTitle}>Available Devices</Text>
      <FlatList
        data={pairedDevices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => {
          // console.log(item)
          return (
            <View style={{ borderWidth: 1, marginVertical: 5 }}>
              <TouchableOpacity
                style={styles.device}
                onPress={() => {
                  // await BluetoothService.connectTo(item.address)
                  // navigation.navigate("MsgScreen", {address:item.address})
                  // sendData(item.address)
                  // display a floating window with input of ssid and password
                  // RNBluetoothClassic.connectToDevice(item.address)
                  //   .then(() => console.log("conntedted"))
                  //   .catch(error => console.error(error))
                }}
              >

                <Text>{item.name || "undefined"}</Text>
                {/* <Text>{item.address}</Text> */}
              </TouchableOpacity>
              <Button title='connect' onPress={() => connect(item.address)} />
              <View style={{ marginVertical: 6 }}></View>
              <Button title='Send Msg' onPress={() =>
                navigation.navigate("MsgScreen", { address: item.address })
              } />
            </View>

          )
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: "center"
  },
  device: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
