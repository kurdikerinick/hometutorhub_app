import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const StudMenuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, studentId } = route.params;

  // Load Poppins fonts
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../../assets/Poppins/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../../assets/Poppins/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
        SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  const handleTutorAddTestPress = () => {
    navigation.navigate('TutorAddTest', { userId, studentId });
  };

  const handleSetSyllabusScreenPress = () => {
    navigation.navigate('SetSyllabusScreen', { userId, studentId });
  };

  const handleMessagePress = () => {
    // Handle the 'Message' button press here
  };

  if (!fontsLoaded) {
    return null; // Add a loading spinner or other indicator if necessary
  }

  return (
    <View style={styles.container}>
      <TopBar title="Student Menu" onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.link}
          onPress={handleSetSyllabusScreenPress}
        >
          <Text style={styles.linkText}>Update Syllabus</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={handleTutorAddTestPress}
        >
          <Text style={styles.linkText}>Add Test</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={handleMessagePress}
        >
          <Text style={styles.linkText}>Message</Text>
          <Text style={styles.arrow}>&gt;</Text>

          {/* <Icon name="arrow-right" size={20} color="#1b58a8" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  link: {
    flexDirection: 'row',
    alignItems: '',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    width: '100%',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 5,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1b58a8',
  },
  arrow: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',

    color: '#1b58a8',
  },
});

export default StudMenuScreen;
