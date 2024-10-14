import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar

export default function ClassSubjectsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { classItem } = route.params;

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Kannada', 'Social Science'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
            <TopBar title="Select Subject" onBackPress={() => navigation.goBack()} />

      <Text style={styles.header}
      >Select Subject for {classItem} Class </Text>
      {subjects.map((subject) => (
        <TouchableOpacity
          key={subject}
          style={styles.subjectButton}
          onPress={() => navigation.navigate('SyllabusDetails', { classItem, subject })}
        >
          <Text style={styles.buttonText}>{subject} {' '}
          <Text style={styles.arrow}>{'>'}</Text>
                </Text> 
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subjectButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%', // Adjusted to full width within the scroll view
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#1b58a8',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  arrow: {
    fontSize: 20,
    color: '#1b58a8',
    marginLeft: 10,
  },
});
