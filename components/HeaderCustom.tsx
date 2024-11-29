import React, { ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import IconButton from './IconButtonCustom';
import { useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  title: string,
  children: ReactNode,
  withBackButton?: boolean
  withSearch?: boolean,
  // withLogout?: boolean,
  // withArchive?: boolean,
  withExpand?: boolean
  rightButtons?: ReactNode,
  onSubmit?: () => void;
  searchValue?: string
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
}

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 56;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export default function HeaderCustom({ 
  title, 
  children, 
  withBackButton=true, 
  withSearch=true,
  // withLogout=true,
  // withArchive=true,
  withExpand=true,
  rightButtons,
  onSubmit,
  searchValue,
  setSearchValue
}: Props) {
  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const fontSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [30, 20],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [withBackButton ? 16 : 16, withBackButton ? 64 : 16],
    extrapolate: 'clamp',
  });

  const titleBottom = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [40, 16],
    extrapolate: 'clamp',
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [56, 0],
    extrapolate: 'clamp',
  });

  const searchBarTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [withBackButton ? -16 : 8, withBackButton ? 0 : 8],
    extrapolate: 'clamp',
  });

  const searchBarMarginRight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [withBackButton ? 0 : 24, withBackButton ? 64 : 72],
    extrapolate: 'clamp',
  });

  const searchBarMarginLeft = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [withBackButton ? -16 : 8, withBackButton ? 8 : 8],
    extrapolate: 'clamp',
  });

  const renderContent = () => (
    <View style={{ paddingTop: withExpand ? HEADER_MAX_HEIGHT + STATUSBAR_HEIGHT : HEADER_MIN_HEIGHT + STATUSBAR_HEIGHT }}>
      {children}
    </View>
  );

  if (!withExpand) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#eee" />
        
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={renderContent}
          scrollEventThrottle={16}
        />

        <View
          style={[
            styles.header,
            {
              height: HEADER_MIN_HEIGHT,
              backgroundColor: '#eee',
              marginTop: STATUSBAR_HEIGHT,
            },
          ]}
        >
          {withBackButton ? 
            <View style={styles.backButton}>
              <IconButton 
                icon='arrow-back' 
                onPress={() => { navigation.goBack() }} 
              />
            </View>
          : null}

          <View style={styles.rightIcons}>
            {rightButtons}
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eee" />
      
      <Animated.FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />

      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: '#eee',
            marginTop: STATUSBAR_HEIGHT,
          },
        ]}
      >
        {withBackButton ? 
          <View style={styles.backButton}>
            <IconButton 
              icon='arrow-back' 
              onPress={() => { navigation.goBack() }} 
            />
          </View>
        : null}

        <View style={styles.rightIcons}>
          {rightButtons}
        </View>

        {withSearch ?
          <Animated.View style={[
            styles.searchSection,
            {
              marginRight: searchBarMarginRight,
              marginLeft: searchBarMarginLeft,
              transform: [
                { translateY: searchBarTranslateY },
                { translateX: searchBarTranslateX },
              ],
            },
            ]}
          >
            <MaterialIcons
              name="search" 
              size={24} 
              style={styles.searchIcon}
            />
            
            <TextInput
              style={styles.input}
              placeholder={title}
              underlineColorAndroid="transparent"
              onSubmitEditing={onSubmit}
              onChangeText={setSearchValue}
              value={searchValue}
            />
            
          </Animated.View> : 

          <Animated.Text
            style={[
              styles.headerTitle,
              {
                fontSize: fontSize,
                transform: [
                  { translateY: titleTranslateY },
                  { translateX: titleTranslateX },
                ],
                bottom: titleBottom,
              },
            ]}
          >
            {title}
          </Animated.Text>
        }
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 40 : 8,
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
    position: 'absolute',
    fontWeight: '500',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 8,
    top: Platform.OS === 'ios' ? 40 : 4,
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 1000,
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