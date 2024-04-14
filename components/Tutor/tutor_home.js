import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BottomBar from './bottombar';
import TopBar from '../topbar';
const TutorHomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
console.log(userId);
  const handleButtonPress = () => {
    navigation.navigate('TutorAddTest', { userId });
  };

  const handleStudentListScreenPress = () => {
    navigation.navigate('StudentListScreen', { userId });
    console.log(userId)
  };

  const handleSignInButtonPress = () => {
    navigation.navigate('SignIn', { userId });
  };
  return (
    <View style={styles.container}>
      <TopBar title="Home Page" />
     

      <View style={styles.topSection}>
        <TouchableOpacity style={styles.topIconContainer} onPress={handleSignInButtonPress}>
          <Icon name="check-circle" size={60} color="#0058a3" />
          <Text style={styles.buttonText}>Sign-in</Text>
        </TouchableOpacity>
      </View>

           
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.topIconContainer} onPress={handleStudentListScreenPress}>
          <Icon name="users" size={60} color="#0058a3" /> 
          <Text style={styles.buttonText}>Students</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.topSection}>
        <TouchableOpacity style={styles.topIconContainer} onPress={handleButtonPress}>
          <Icon name="cog" size={60} color="#0058a3" /> 
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIconContainer: {
    backgroundColor: 'white', 
    borderRadius: 100,
        padding: 50,
  },
  
  
  buttonText: {
    color: '#0058a3', 
    fontSize: 18, 
    marginTop: 10, 
  },
});

export default TutorHomeScreen;
