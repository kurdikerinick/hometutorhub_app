import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

export default function MonitorTests({ route }) {
  const [testDetails, setTestDetails] = useState([]);
  const { userId } = route.params;

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const db = getDatabase();
      const testsQuery = query(ref(db, 'tests'), orderByChild('studentId'), equalTo(userId));
      const snapshot = await get(testsQuery);
      const tests = snapshot.val();
      
      if (tests) {
        const testsArray = Object.values(tests).map(test => ({
          ...test,
          date: formatDate(test.date) // Parsing the date format
        }));
        setTestDetails(testsArray);
      } else {
        console.log("No tests found for the user ID:", userId);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const parts = dateString.split('/');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are zero-based
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Monitor Test</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>Name</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>Date</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>Marks</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>Max</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>Subject</Text>
        </View>
        {testDetails.map((test, index) => (
          <View key={index} style={styles.tableRow}>
            <Text selectable style={[styles.tableCell, styles.cell]}>{test.topic}</Text>
            <Text selectable style={[styles.tableCell, styles.cell]}>{test.date.toDateString()}</Text>
            <Text selectable style={[styles.tableCell, styles.cell]}>{test.marks}</Text>
            <Text selectable style={[styles.tableCell, styles.cell]}>{test.maxMarks}</Text>
            <Text selectable style={[styles.tableCell, styles.cell]}>{test.subject_name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  cell: {
    textAlign: 'center',
  },
});
