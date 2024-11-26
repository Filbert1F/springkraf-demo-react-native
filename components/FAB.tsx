import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";
import ChipCustom from "./ChipCustom";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  onPress?: () => void;
}

export default function FAB({ icon, onPress }: Props) {
  return (
    <View style={{
      overflow: 'hidden',
      borderRadius: 16,
      elevation: 20,
      position: "absolute",
      right: 16,
      bottom: 16,
    }}>
      <Pressable 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          backgroundColor: '#ddd',
        }} 
        onPress={onPress} 
        android_ripple={{ 
          color: 'black', 
          borderless: true 
        }}
      >
        <MaterialIcons name={icon} size={24} />
      </Pressable>
    </View>
  );
}