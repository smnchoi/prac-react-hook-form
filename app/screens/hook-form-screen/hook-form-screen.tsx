import { View, Text, TextInput, Button, SafeAreaView, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { styles } from "./styles"

// * 공식문서 - https://react-hook-form.com/get-started#IntegratingControlledInputs

// ! RN 에서는 무조건 Controller로 감싸서 사용할 수 있는 것인지? - hook form 문서에서 웹 같은 경우에는 태그 안에 register를 사용하던데 ..
// ! render prop -> 이해가 잘 안됨. field: {onChange, value} 가 어디서 전달되는 것인지?

// ? 정규 표현식 출처: https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%A0%95%EA%B7%9C%EC%8B%9D-RegExp-%EB%88%84%EA%B5%AC%EB%82%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC#%ED%8A%B9%EC%88%98%EA%B8%B0%ED%98%B8_%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D
const ID_TEST = /^[A-Za-z0-9]{4,10}$/
const EMAIL_TEST = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
const PASSWORD_TEST = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/

type FormData = {
  username: string
  email: string
  password: string
}

const HookFormScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  // * 값이 변경될 때마다 입력된 값들을 확인할 수 있음
  console.log(watch())

  const onSubmit = () => {
    Alert.alert("Forms are submitted!")
    reset()
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* // * React Native 에서는 Controller를 사용하여 hook form을 사용 */}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="username"
          defaultValue=""
          rules={{
            required: "Username is required",
            pattern: {
              value: ID_TEST,
              message: "Username must include 4 to 10 alphabets and numbers.",
            },
          }}
        />
        {errors.username && <Text style={styles.warnText}>{errors.username.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              style={[
                styles.input,
                {
                  marginTop: 20,
                },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_TEST, message: "Email format is incorrect" },
          }}
        />
        {errors.email && <Text style={styles.warnText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={[
                styles.input,
                {
                  marginTop: 20,
                },
              ]}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_TEST,
              message: "Password must include at least 6 letters and numbers",
            },
          }}
        />
        {errors.password && <Text style={styles.warnText}>{errors.password.message}</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  )
}

export default HookFormScreen
