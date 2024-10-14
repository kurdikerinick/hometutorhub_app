import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import LoginPage from './components/Loginpage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TutorLoginPage from './components/Tutorlogin.js';
import StudentLoginPage from './components/Studlogin.js';
import StudentSetHomeLocation from './components/Student/setlocation.js';
import StudentHomeScreen from './components/Student/stud_home.js';
import TutorHomeScreen from './components/Tutor/tutor_home.js';
import StudentListScreen from './components/Tutor/studentlist.js';
import SetSyllabusScreen from './components/Tutor/setsyllabus.js';
import TutorAddTest from './components/Tutor/addtest.js';
import StudMenuScreen from './components/Tutor/studmenu.js';
import SignIn from './components/Tutor/signin.js';
import MonitorTests from './components/Student/tests.js';
import TrackSyllabus from './components/Student/syllabus.js';
import AttendanceList from './components/Student/attendance.js';
import TopBar from './components/topbar.js';
import BottomBar from './components/Tutor/bottombar.js';
import SyallbusCopy from './components/Tutor/syllabuscopy.js';
import ClassSubjectsScreen from './components/Tutor/subjects.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="TutorLoginPage" component={TutorLoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentLoginPage" component={StudentLoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentHomeScreen" component={StudentHomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MonitorTests" component={MonitorTests} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentSetHomeLocation" component={StudentSetHomeLocation} options={{ headerShown: false }}/>
        <Stack.Screen name="AttendanceList" component={AttendanceList} options={{ headerShown: false }}/>
        <Stack.Screen name="TrackSyllabus" component={TrackSyllabus} options={{ headerShown: false }}/>
        <Stack.Screen name="TutorHomeScreen" component={TutorHomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="StudentListScreen" component={StudentListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TopBar" component={TopBar} options={{ headerShown: false }}/>
        <Stack.Screen name="BottomBar" component={BottomBar} options={{ headerShown: false }}/>
        <Stack.Screen name="TutorAddTest" component={TutorAddTest} options={{ headerShown: false }}/>
        <Stack.Screen name="SetSyllabusScreen" component={SetSyllabusScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StudMenuScreen" component={StudMenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="syllabuscopy" component={SyallbusCopy}options={{ headerShown: false }}/>
        <Stack.Screen name="subjects" component={ClassSubjectsScreen}options={{ headerShown: false }}/>
 </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)', // Mimicking the same effect as shadow
    elevation: 5,
  },
});
