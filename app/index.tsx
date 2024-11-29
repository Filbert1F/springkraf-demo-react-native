import { useLogin } from "@/api-hooks/menu/mutation";
import AbsoluteButtonCustom from "@/components/AbsoluteButtonCustom";
import ButtonCustom from "@/components/ButtonCustom";
import SvgComponent from "@/components/SvgComponent";
import TextInputCustom from "@/components/TextInputCustom";
import getToken from "@/utils/get-token";
import storeToken from "@/utils/store-token";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const { mutate, isPending } = useLogin({
    onSuccess: async (data) => {
      console.log(data)
      await storeToken(data.data.accessToken)
      router.replace('/notes');
    },
    onError: (error) => {
      console.log(error.message)
      const errorMessage = error.message;
      if (errorMessage.includes('Email') || errorMessage.includes('email')) {
        setEmailError(errorMessage);
      } 
      if (errorMessage.includes('Password') || errorMessage.includes('password')) {
        setPasswordError(errorMessage);
      }
    }
  })

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        router.replace('/notes');
      }
    };

    checkToken();
  }, [router]);

  const onSubmit = () => {
    setEmailError('');
    setPasswordError('');
    mutate({ 
      email: emailValue, 
      password: passwordValue 
    });
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
        <Link href="/register" asChild replace>
          <AbsoluteButtonCustom title="Register" />
        </Link>
      </View>
      
      <Text style={{
        fontSize: 32,
        fontWeight: '500',
        height: '50%',
        paddingTop: 32
      }}>
        Login
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 32
        }}
      >
        {/* <Link href="/(tabs)/notes" asChild><Text>Notes</Text></Link> */}
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
        <View style={{
          marginTop: 16,
          width: '100%'
        }}>
          <ButtonCustom 
            title="Login" 
            width='100%' 
            onPress={onSubmit}
            disabled={isPending}
          />
        </View>
      </View>
    </View>
  );
}
