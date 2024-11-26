import { Text, View } from "react-native";

type Props = {
  title: string
}

export default function ChipCustom({ title }: Props) {
  return (
    <View 
      style={{ 
        borderRadius: 10000,
        backgroundColor: '#ccc',
        paddingVertical: 4,
        paddingHorizontal: 8,
      }}
    >
      <Text>
        {title}
      </Text>
    </View>
  );
}