import { View, Text, TextInput, Button, SafeAreaView, Alert, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { styles } from "./styles"
import { navigate } from "../../navigators"

// ? 정규 표현식 출처: https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%A0%95%EA%B7%9C%EC%8B%9D-RegExp-%EB%88%84%EA%B5%AC%EB%82%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC#%ED%8A%B9%EC%88%98%EA%B8%B0%ED%98%B8_%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D
const EMAIL_TEST = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
const ID_TEST = /^[A-Za-z0-9]{4,10}$/
const PASSWORD_TEST = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/

const NormalFormScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState<string>("")
  const [usernameErr, setUsernameErr] = useState<string>("")
  // ? 화면이 처음 렌더링 된 이후, 값을 한번이라도 입력했는지 확인
  const [usernameFirstInput, setUsernameFirstInput] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [emailErr, setEmailErr] = useState<string>("")
  const [emailFirstInput, setEmailFirstInput] = useState<boolean>(false)

  const [password, setPassword] = useState<string>("")
  const [passwordErr, setPasswordErr] = useState<string>("")
  const [passwordFirstInput, setPasswordFirstInput] = useState<boolean>(false)

  useEffect(() => {
    // ? 값을 입력한 이력이 있으면서, 길이 형식이 맞지 않을 때
    if (usernameFirstInput && username.length === 0) {
      setUsernameErr("Username is required")
    } else {
      setUsernameFirstInput(true)
      setUsernameErr("")
    }
  }, [username])

  useEffect(() => {
    if (emailFirstInput && email.length === 0) {
      setEmailErr("Email is required")
    } else {
      setEmailFirstInput(true)
      setEmailErr("")
    }
  }, [email])

  useEffect(() => {
    if (passwordFirstInput && password.length === 0) {
      setPasswordErr("Password is required")
    } else {
      setPasswordFirstInput(true)
      setPasswordErr("")
    }
  }, [password])

  const handleSubmit = () => {
    // * 1. 닉네임 형식 & 길이 검사
    if (!ID_TEST.test(username)) {
      setUsernameErr("Username must include 4 to 10 alphabets and numbers.")
      return
    }
    setUsernameErr("")

    // * 2. 이메일 형식 검사
    if (!EMAIL_TEST.test(email)) {
      setEmailErr("Email format is incorrect")
      return
    }
    setEmailErr("")

    // * 3. 비밀번호 형식 & 길이 검사
    if (!PASSWORD_TEST.test(password)) {
      setPasswordErr("Password must include at least 6 letters and numbers")
      return
    }
    setPasswordErr("")

    Alert.alert("Forms are submitted!")
    setUsername("")
    setUsernameFirstInput(false)
    setEmail("")
    setEmailFirstInput(false)
    setPassword("")
    setPasswordFirstInput(false)
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={styles.warnText}>{usernameErr}</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
          style={[
            styles.input,
            {
              marginTop: 20,
            },
          ]}
        />
        <Text style={styles.warnText}>{emailErr}</Text>

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={[
            styles.input,
            {
              marginTop: 20,
            },
          ]}
        />
        <Text style={styles.warnText}>{passwordErr}</Text>

        <Button title="Submit" onPress={handleSubmit} />

        <Pressable
          onPress={() => {
            navigate("hook-form-screen")
          }}
          style={{
            marginLeft: "auto",
          }}
        >
          <Text>👉🏻 Hook Form Screen</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default NormalFormScreen
