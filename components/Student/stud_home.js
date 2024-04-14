import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../topbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StudentHomeScreen = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();

  console.log(userId); // Console the userId here

  const handleSyllabusPress = () => {
    navigation.navigate('TrackSyllabus', { userId });
  };

  const handleSetGeoLocationPress = () => {
    navigation.navigate('StudentSetHomeLocation', { userId });
  };

  const handleTestsPress = () => {
    navigation.navigate('MonitorTests', { userId });
  };

  const handleAttendanceListPress = () => {
    navigation.navigate('AttendanceList', { userId });
  };

  return (
    <View style={styles.container}>
      <TopBar title="Home" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleSetGeoLocationPress}>
          <MaterialCommunityIcons name="map-marker" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Set Geo-Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSyllabusPress}>
          <MaterialCommunityIcons name="book" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Track Syllabus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTestsPress}>
          <MaterialCommunityIcons name="monitor" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Monitor Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAttendanceListPress}>
          <MaterialCommunityIcons name="clipboard-check" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Attendance List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: 300,
  },
  buttonText: {
    color: '#0058a3',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default StudentHomeScreen;
