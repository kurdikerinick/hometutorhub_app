// TopBar.js

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
    flexDirection: 'row',
     flexDirection: 'column', // Changed to column
    alignItems: 'left', // Centered items vertically

  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  pageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
},
});

export default TopBar;
