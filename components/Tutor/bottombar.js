import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.topBar}>
      <Text style={styles.logoText}>SR Tutorials</Text>
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#0056b3',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'column', // Changed to column
    alignItems: 'center', // Centered items vertically
    // Update shadow* properties to boxShadow
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Pacifico'
  },
  pageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Pacifico'
  },
});

export default TopBar;
