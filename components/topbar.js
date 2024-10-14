// TopBar.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.topBar}>
      <Text style={styles.logoText}>HomeTutorHub</Text>
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#1b58a8',
    paddingTop: 50,

    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
     flexDirection: 'column', // Changed to column
    alignItems: 'left', // Centered items vertically
    fontFamily: 'Poppins-Regular',


  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Poppins-Bold', // Apply the Poppins-Bold font if you need to style the title
  },
  pageTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});

export default TopBar;
