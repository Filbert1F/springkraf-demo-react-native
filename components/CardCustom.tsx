import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string
  onPress?: () => void;
  body: string,
	id: string,
}

export default function CardCustom({ title, onPress, body, id }: Props) {
  return (
		<View 
			style={styles.card}
		>
			<Pressable 
        style={{
          padding: 16,
        }} 
        android_ripple={{ 
          color: 'grey', 
          borderless: true 
        }}
				onPress={onPress} 
      >
				<View style={styles.header}>
					<Text style={styles.title}>
						{title}
					</Text>
				</View>
				<Text style={styles.bottomText}>
					{id}
				</Text>
				{body && 
					<Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>
						{body}
					</Text>
				}
			</Pressable>
		</View>
  );
};
 
const styles = StyleSheet.create({
	card: {
		overflow: 'hidden',
    // borderRadius: 16,
		backgroundColor: '#eee',
		// elevation: 8
	},
	header: {
		marginBottom: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: 'semibold',
	},
	bottomText: {
		fontSize: 12,
		color: '#777',
	},
	text: {
		color: '#444444',
		marginTop: 10,
	},
});