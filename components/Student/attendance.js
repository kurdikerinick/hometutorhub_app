import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function AttendanceList({ route }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const { StudentID } = route.params;

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/api/attendance/display?studentId=${StudentID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('API Response:', responseData);
        setAttendanceData(responseData);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
  };

  useEffect(() => {
    if (StudentID) {
      fetchData();
    }
  }, [StudentID]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Duration</Text>
           <Text style={styles.headerText}>Remaining Days</Text>
      </View>
      {attendanceData.map((attendance, index) => (
        <View key={index} style={styles.studentRow}>
          <Text style={styles.studentData}>{new Date(attendance.match_timestamp).toISOString().split('T')[0]}</Text>
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
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Equal flex for all header text
    textAlign: 'center',
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
