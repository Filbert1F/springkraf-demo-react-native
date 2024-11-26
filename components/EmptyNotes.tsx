import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function EmptyNotes() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: 320
    }}>
      <MaterialIcons name="sentiment-very-dissatisfied" size={56} />
      <Text style={{
        textAlign: 'center'
      }}>Empty</Text>
    </View>
  )
}
