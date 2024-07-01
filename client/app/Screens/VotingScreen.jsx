import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const VotingPage = () => {
    // to be retrieved from the database
    const contestants = ["user1", "user2", "user3", "user4", "user5"];

    const awards = [
        {
            title: "Funniest Nickname",
            description: "Who won your laughs in August?",
            contestants: contestants,
        },
    ];

    const handleVotePress = () => {
        // Handle the vote button press here
        Alert.alert('Vote', 'You voted!');
    };

    const styles = {
        buttonContainer: {
          backgroundColor: 'orange',
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          borderRadius: 20,
        },
        buttonText: {
          color: 'white',
        //   fontWeight: 'bold',
          textAlign: 'center',
        },
        rightAlign: {
            flex: 1,
            alignItems: 'flex-end', // Align to the right
          },
      };

    return (
        <View style = {tw`mx-4 my-4`}>
            {awards.map((award, index) => (
                <View key={index}>
                    <Text style={tw`font-bold text-xl text-black mb-1`}>
                        {award.title}
                    </Text>
                    <Text style = {tw`text-gray-500 mb-2`}>
                        {award.description}
                    </Text>
                    
                    {award.contestants.map((contestant, cIndex) => (
                        <Text key={cIndex}>- {contestant}</Text>
                    ))}
                    <View style = {tw`flex-row-reverse`}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Vote</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default VotingPage;
