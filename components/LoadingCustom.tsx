import { ActivityIndicator, View } from "react-native";

export default function LoadingCustom() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    }}>
      <ActivityIndicator size="large" color={'black'} />
    </View>
  )
}
