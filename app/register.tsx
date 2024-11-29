import { useRegister } from "@/api-hooks/menu/mutation";
import AbsoluteButtonCustom from "@/components/AbsoluteButtonCustom";
import ButtonCustom from "@/components/ButtonCustom";
import SvgComponent from "@/components/SvgComponent";
import TextInputCustom from "@/components/TextInputCustom";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Register() {

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [successMessage, setSuccessMessage] = useState('')

  const { mutate, isPending } = useRegister({
    onSuccess: async (data) => {
      console.log(data)
      setSuccessMessage(data.message)
    },
    onError: (error) => {
      console.log(error.message)
      const errorMessage = error.message;
      if (errorMessage.includes('Name') || errorMessage.includes('name')) {
        setNameError(errorMessage);
      }
      if (errorMessage.includes('Email') || errorMessage.includes('email')) {
        setEmailError(errorMessage);
      }
      if (errorMessage.includes('Password') || errorMessage.includes('password')) {
        setPasswordError(errorMessage);
      }
    }
  })

  const onSubmit = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    mutate({
      name: nameValue, 
      email: emailValue, 
      password: passwordValue
    })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 24,
      }}
    >
      <SvgComponent />
      <View style={{
        position: 'absolute',
        right: 0,
        zIndex: 1,
        top: '35%'
      }}>
        <Link href="/" asChild replace>
          <AbsoluteButtonCustom title="Login" />
        </Link>
      </View>
      
      <Text style={{
        fontSize: 32,
        fontWeight: '500',
        height: '50%',
        paddingTop: 32
      }}>
        Register
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 32
        }}
      >
        <TextInputCustom 
          label="Name" 
          value={nameValue}
          setValue={setNameValue}
          error={nameError}
        />
        <TextInputCustom 
          label="Email" 
          value={emailValue}
          setValue={setEmailValue}
          error={emailError}
        />
        <TextInputCustom 
          label="Password" 
          value={passwordValue}
          setValue={setPasswordValue}
          error={passwordError}
        />
        {successMessage && <Text style={{ color: 'green' }}>{successMessage}</Text>}
        <View style={{
          marginTop: 16,
          width: '100%'
        }}>
          <ButtonCustom 
            title="Register" 
            width='100%' 
            onPress={onSubmit}
            disabled={isPending}
          />
        </View>
      </View>
    </View>
  );
}
