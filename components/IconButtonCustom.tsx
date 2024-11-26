import { MaterialIcons } from "@expo/vector-icons";
import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onPress?: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export default function IconButtonCustom({ onPress, icon }: Props) {
  return (
    <View style={{
      overflow: 'hidden',
      borderRadius: 1000,
    }}>
      <Pressable 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
          width: 48,
          borderRadius: 1000,
        }} 
        onPress={onPress} 
        android_ripple={{ 
          color: 'grey', 
          borderless: true 
        }}
      >
        <MaterialIcons size={24} name={icon} />
      </Pressable>
    </View>
  );
}