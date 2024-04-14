import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Track Syllabus</Text>
      </View>

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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    justifyContent: 'space-between',

  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});

export default TrackSyllabus;
