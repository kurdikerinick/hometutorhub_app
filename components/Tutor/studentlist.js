import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function StudentListScreen({ route }) {
  const [data, setData] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
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
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const db = getDatabase();
      const assignmentsQuery = query(ref(db, 'assignments'), orderByChild('tutor_id'), equalTo(userId));
      const snapshot = await get(assignmentsQuery);
      const assignments = snapshot.val();

      if (assignments) {
        const assignmentsArray = Object.values(assignments);
        setData(assignmentsArray);
      } else {
        console.log("No assignments found for the user ID:", userId);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStudentClick = (studentId) => {
    navigation.navigate('StudMenuScreen', { studentId, userId });
  };

  if (!fontsLoaded) {
    return null; // Add a loading spinner or other indicator if necessary
  }

  return (
    <View style={styles.container}>
      <TopBar title="Student List" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.cell]}>ID</Text>
          <Text style={[styles.tableHeaderText, styles.cell]}>Name</Text>
          <Text style={[styles.tableHeaderText, styles.cell]}>Update</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.cell]}>{item.student_id}</Text>
            <Text style={[styles.tableCell, styles.cell]}>{item.stud_name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleStudentClick(item.student_id)}>
              <Text style={styles.buttonText}>Click</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    paddingVertical: 20,
    // paddingHorizontal: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0058a3',
    paddingVertical: 15,
    // borderRadius: 50,
    
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#0058a3',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
