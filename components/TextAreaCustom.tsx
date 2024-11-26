import { useState, useRef, useEffect } from "react";
import { Animated, TextInput, View, Pressable, Text } from "react-native";

type Props = {
  label: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  error?: string,
  numberOfLines?: number
}

export default function TextAreaCustom({ 
  label, 
  value, 
  setValue, 
  error,
  numberOfLines = 4 
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: (isFocused || value.length > 0) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#666', '#888'],
    }),
  };

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <Pressable 
        onPress={handlePress}
        style={{
          paddingTop: 18,
          marginHorizontal: 12,
          marginVertical: 8,
          width: '100%',
        }}
      >
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          ref={inputRef}
          multiline={true}
          numberOfLines={numberOfLines}
          style={{
            minHeight: numberOfLines,
            fontSize: 16,
            color: 'black',
            width: '100%',
            textAlignVertical: 'top',
            paddingTop: 8,
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={setValue}
          value={value}
        />
        <View style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: isFocused ? 2 : 1,
          backgroundColor: error ? 'red' : isFocused ? 'black' : '#666' }} 
        />
      </Pressable>
      {error && 
        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: "left"
              }}
            >
              {error}
            </Text>
          </View>
        </View>
      }
    </>
  );
}