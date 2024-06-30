   // screens/VotingPage.tsx
   import React from 'react';
   import { View, Text, Button, StyleSheet } from 'react-native';

   const VotingPage = () => {
       return (
           <View style={styles.container}>
               <Text>Vote for your favourite Eater!</Text>
               {/* Render list of nominees with vote buttons */}
           </View>
       );
   };

   const handleVotePress = () => {
        // Handle the vote button press here
        Alert.alert('Vote', 'You voted!');
   };

   const styles = StyleSheet.create({
       container: {
           flex: 1,
           alignItems: 'center',
           justifyContent: 'center'
       }
   });

   export default VotingPage;