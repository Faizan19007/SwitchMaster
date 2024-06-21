import { PermissionsAndroid, Platform, NativeEventEmitter, NativeModules, ToastAndroid, } from 'react-native'
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic'


const BleModule = NativeModules.RNBluetoothClassic;
// const bleManagerEmitter = new NativeEventEmitter(BleModule);

class BluetoothService {
    // constructor() {
    //     this.init()
    // }

    async init() {
        if (Platform.OS === "android") {
            const locationPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs location access to scan for Bluetooth devices.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            if (locationPermission != PermissionsAndroid.RESULTS.GRANTED) {
                console.log("not granted")
            }
            const connectPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                {
                    title: 'Location Permission',
                    message: 'This app needs location access to scan for Bluetooth devices.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            if (connectPermission != PermissionsAndroid.RESULTS.GRANTED) {
                console.log("not granted")
            }
            const scanPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                {
                    title: 'Location Permission',
                    message: 'This app needs location access to scan for Bluetooth devices.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            if (scanPermission != PermissionsAndroid.RESULTS.GRANTED) {
                console.log("scan permission not granted")
            }
        }


        const available = await RNBluetoothClassic.isBluetoothEnabled();
        const enabled = await RNBluetoothClassic.isBluetoothEnabled();
        console.log(enabled)
        if(!enabled){
            ToastAndroid.show("Bluetooth is not enabled", 5)
        }
    }


    async getPairedDevices(): Promise<BluetoothDevice[]> {
        // console.log('serices called')
        const pairedDevices = await RNBluetoothClassic.getBondedDevices()
        return pairedDevices
    }

    async connectTo(address: string) {
        const isConnected = await RNBluetoothClassic.isDeviceConnected(address)

        if (!isConnected) {
            ToastAndroid.show("connecting...", 5)
            const connection = await (await RNBluetoothClassic.connectToDevice(address)).connect()
            if (connection) {
                console.log("conntected")
                return true
                // await RNBluetoothClassic.writeToDevice(address, "hello world!",)

            }
            return false
        }
        else {
            console.log("conntected")

        }
        // send data

    }
    async sendData(address: string, msg: string) {
        try {
            // console.log( address)
            ToastAndroid.show("sending Msg", 5)
            const resp = await RNBluetoothClassic.writeToDevice(address, msg,)
            console.log("msg is " + msg)
            console.log("msg send " + resp)
            if(resp){
                ToastAndroid.show("sent successfully", 2)
            }
            else{
                ToastAndroid.show("not sent", 2)

            }
            // return resp
        }
        catch (error) {
            console.error(error)
            ToastAndroid.show(`${error}`, 5)
            // return false
        }


    }

}


export default new BluetoothService;