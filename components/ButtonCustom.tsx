import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'ghost'
  width?: DimensionValue
  disabled?: boolean
}

export default function ButtonCustom({ title, onPress, variant='primary', width, disabled=false }: Props) {
  return (
    <View style={{
      overflow: 'hidden',
      borderRadius: 16,
      width: width
    }}>
      <Pressable 
        disabled={disabled}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 16,
          backgroundColor: !disabled ? variant === 'primary' ? 'black' : undefined : '#ccc',
          borderWidth: variant === 'outline' ? 1 : undefined,
          width: width,
        }} 
        onPress={onPress} 
        android_ripple={{ 
          color: 
            !disabled ? variant === 'primary' ? 'white' : 'black' : undefined, 
          borderless: true 
        }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: variant === 'primary' ? 'white' : 'black',
        }}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}