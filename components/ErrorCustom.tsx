import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ErrorCustom() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Error</Text>
    </View>
  )
}
