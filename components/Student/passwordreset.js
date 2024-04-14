// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


// const ForgotPasswordScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');

//   const handleSendResetEmail = () => {
//     // Implement logic to send reset email
//     alert('Send Reset Email button pressed');
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Forgot Password Screen</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <Button title="Send Reset Email" onPress={handleSendResetEmail} />
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };


// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginVertical: 10,
//     paddingLeft: 10,
//   },
// });
// export { StudentLoginPage, ForgotPasswordScreen };