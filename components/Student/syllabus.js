import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const TrackSyllabus = ({ route }) => {
  const [syllabusData, setSyllabusData] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const db = getDatabase();
        const syllabusQuery = query(ref(db, 'syllabus'), orderByChild('student_id'), equalTo(userId));
        const snapshot = await get(syllabusQuery);
        const syllabus = snapshot.val();

        if (syllabus) {
          const syllabusArray = Object.values(syllabus);
          setSyllabusData(syllabusArray);
        } else {
          console.log("No syllabus found for the student ID:", userId);
        }
      } catch (error) {
        console.error('Error fetching syllabus data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <View style={styles.container}>
            <TopBar title="Track Syllabus" on BackPress={() => navigation.goBack()} />

      

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerText}>Subject Topics</Text>
            <Text style={styles.headerText}>Subject Name</Text>
          </View>
          {syllabusData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{item.subject_topics}</Text>
              <Text style={styles.cell}>{item.subject_name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    
  },
  contentContainer: {
    flexGrow: 1,
  },
  table: {
    flex: 1,
    marginHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',

  },
});

export default TrackSyllabus;
