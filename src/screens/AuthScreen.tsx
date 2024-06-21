import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// import auth from '@react-native-firebase/auth';

//navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from '../../App';
// import Layout from '../../components/Layout';

// session managment
// import * as Keychain from 'react-native-keychain';

type Auth = NativeStackScreenProps<RootStackParamList, "AuthScreen">


const AuthScreen = ({ navigation }: Auth) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('')
  const [log, setLog] = useState(true)
  const [error, setError] = useState('')

  function navigate() {
    Animated.parallel([

      Animated.timing(fadein, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(positionAnim, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false
      }),
    ]).start(() => navigation.replace("HomeScreen",))
  }

  const signup = () => {
    if (log) {
      login()
    }
    else {
      Signin()
    }
  }
  const login = () => {
    if (email != "" && password != "") {
      setError('')
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (userDetails) => {
          // setUser(userDetails.user['uid'])
          setUser(email.split('@')[0])
          const username:string = email.split('@')[0]
          // Store the credentials
          await Keychain.setGenericPassword(username, password);
          navigate()

        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
          setError("invalid username, password")
        })

    }
    else {
      setError("kindly fill the required fields")
    }
  }

  const Signin = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userDetails) => {
        // setUser(userDetails.user['uid'])
        setUser(email.split('@')[0])
        const username:string = email.split('@')[0]
        // Store the credentials
        await Keychain.setGenericPassword(username, password);

        navigate()
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }

        console.error(error);
      })
  }

  const fadein = useState(new Animated.Value(1))[0] // use only getter
  const positionAnim = useState(new Animated.Value(0))[0]


  return (
    // <Layout>
      <Animated.View style={[{ opacity: fadein, transform: [{ translateY: positionAnim }], }]}>
        <Text style={{ color: "red", fontSize: 18, textAlign: "center", padding: 10 }}>{error}</Text>
        {/* <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
          <TouchableOpacity style={[styles.sso, { backgroundColor: "red" }]}>
            <Text style={{ fontSize: 40, color: "yellow" }}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sso, , { backgroundColor: "blue" }]}>
            <Text style={{ fontSize: 40, color: "white" }}>f</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ flexDirection: "row", marginBottom: 15, justifyContent: "space-between", alignItems: "center" }}>
          <View style={styles.separator} />
          {/* <Text style={{ color: "black" }}>OR</Text> */}
          <View style={styles.separator} />
        </View>

        <View style={styles.container}>
          <TextInput
            style={[styles.buttonStyle, styles.input, styles.size]}
            placeholder='email'
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={[styles.buttonStyle, styles.input, styles.size]}
            placeholder='password'
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            // onPress={signup}
            onPress={()=>{
              navigation.navigate("HomeScreen")
            }}
            style={[styles.size, styles.buttonStyle]}>
            {log == true &&
              <Text style={styles.sectionTitle}>Login</Text>
            }
            {log == false &&
              <Text style={styles.sectionTitle}>SignUp</Text>

            }
          </TouchableOpacity>

          <Text>Forget Password!</Text>

        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              setLog(false)
            }}
            style={{ width: 100 }}>
            <Text style={{ color: "red" }}>create account</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    // </Layout>

  )
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 40,
    paddingHorizontal: 17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(200, 223, 239, 0.4)'
  },
  sectionTitle: {
    fontSize: 22,
  },
  size: {
    width: 300,
    height: 50,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#EAEEF0"
  },
  buttonStyle: {
    marginVertical: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 30,
    backgroundColor: "#C8DFEF"

  },
  sso: {
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(200, 223, 239, 0.5)'
  },
  separator: {
    borderTopWidth: 2,
    width: "45%",
    borderColor: "white",
  },
})