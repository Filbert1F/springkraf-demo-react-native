import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View, Pressable, StyleSheet } from "react-native";

type Props = {
  label: string
}

export default function TextInputSearchCustom({ label }: Props) {
  return (
    <View style={styles.searchSection}>
      <MaterialIcons 
        name="search" 
        size={24} 
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={label}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 1000
  },
  searchIcon: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12, 
    paddingRight: 12,
  },
  input: {
    flex: 1,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 0,
  },
});