import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';

export default function StudentListScreen({ route }) {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      // Step 1: Get the database reference
      const db = getDatabase();

      // Step 2: Create a query to fetch assignments based on userId
      const assignmentsQuery = query(ref(db, 'assignments'), orderByChild('tutor_id'), equalTo(userId));

      // Step 3: Execute the query and fetch the data
      const snapshot = await get(assignmentsQuery);
      const assignments = snapshot.val();

      // Step 4: Update state with the fetched data
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
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Student List</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>stud_id</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>name</Text>
          <Text selectable style={[styles.tableHeaderText, styles.cell]}>update</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text selectable style={[styles.tableCell, styles.cell]}>{item.student_id}</Text>
            <Text selectable style={[styles.tableCell, styles.cell]}>{item.stud_name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Click"
                onPress={() => handleStudentClick(item.student_id)}
                style={styles.button}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
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
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#448aff',
    borderRadius: 10,
    padding: 10,
    minWidth: 80,
  },
});
