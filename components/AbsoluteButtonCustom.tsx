import { Pressable, Text, View } from "react-native";

type Props = {
  title: string
  onPress?: () => void;
}

export default function AbsoluteButtonCustom({ title, onPress }: Props) {
  return (
    <View style={{
      overflow: 'hidden',
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      elevation: 20
    }}>
      <Pressable 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          backgroundColor: '#eee',
        }} 
        onPress={onPress} 
        android_ripple={{ 
          color: 'black', 
          borderless: true 
        }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
        }}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}