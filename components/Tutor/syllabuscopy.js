import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../topbar'; // Assuming you're using the previously designed TopBar

export default function SyllabusCopy() {
  const navigation = useNavigation();

  // List of classes
  const classes = [
    '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th'
  ];

  return (
    <View style={styles.container}>
      <TopBar title="Select Class" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Text */}
        <Text style={styles.header}>Select Class</Text>

        {/* Loop through each class and render a button */}
        {classes.map((classItem) => (
          <TouchableOpacity
            key={classItem}
            style={styles.classButton}
            onPress={() => navigation.navigate('subjects', { classItem })}
          >
            {/* Correctly wrapped text in <Text> component */}
            <Text style={styles.buttonText}>
              {classItem} Class {' '}
              <Text style={styles.arrow}>{'>'}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles for the component
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
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Poppins-Bold',

  },
  classButton: {
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
