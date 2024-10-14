import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function AttendanceList({ route }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const { StudentID } = route.params;

  useEffect(() => {
    if (StudentID) {
      // Get a reference to the Firebase Realtime Database
      const database = getDatabase();
      const attendanceRef = ref(database, `attendance/${StudentID}`);

      // Listen for changes in the attendance data
      const unsubscribe = onValue(attendanceRef, (snapshot) => {   
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => data[key]);
          setAttendanceData(formattedData);
        } else {
          console.log('No data available');
        }
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [StudentID]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
                  <TopBar title="Attendance" onBackPress={() => navigation.goBack()} />

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Duration</Text>
        <Text style={styles.headerText}>Remaining Days</Text>
      </View>
      {attendanceData.map((attendance, index) => (
        <View key={index} style={styles.studentRow}>
          <Text style={styles.studentData}>
            {new Date(attendance.match_timestamp).toISOString().split('T')[0]}
          </Text>
          <Text style={styles.studentData}>{attendance.days}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  studentData: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
