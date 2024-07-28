import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const VotingPage = () => {

    const navigation = useNavigation(); // useNavigation hook

    // to be retrieved from the database
    const contestants = ["Vege Crunch", "YumyumNomNom", "QuackKing", "oop", "skibidiRIZZ"];

    const awards = [
        {
            title: "Funniest Nickname",
            description: "Who won your laughs in August?",
            contestants: contestants,
        },
    ];

    const handleVotePress = (contestant) => {
        // Handle the vote button press here
        Alert.alert('Great Choice!', `You have voted for ${contestant}`);
    };

    // style for vote button
    const styles = {
        buttonContainer: {
          backgroundColor: 'orange',
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          borderRadius: 20,
          marginTop: 8,
        },
        buttonText: {
          color: 'white',
          textAlign: 'center',
        },
        contestantContainer: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)', 
          padding: 20,
          marginVertical: 4,
          borderRadius: 8, 
        },
      };

    return (
        <View style={tw`flex-1 bg-white`}>
            <ScrollView style={tw`flex-1 px-4 py-4`}>
                {awards.map((award, index) => (
                    <View key={index} style={tw`mb-4`}>
                        <Text style={tw`font-bold text-xl text-black mb-1`}>
                            {award.title}
                        </Text>
                        <Text style={tw`text-gray-500 mb-3`}>
                            {award.description}
                        </Text>
                        
                        {award.contestants.map((contestant, cIndex) => (
                            <View key={cIndex} style={tw`mb-1`}>
                                <View style={styles.contestantContainer}>
                                    <Text style={tw`text-lg`}> {contestant}</Text>
                                </View>
                                <View style={tw`flex-row-reverse mb-1`}>
                                    <TouchableOpacity 
                                        style={styles.buttonContainer} 
                                        onPress={() => handleVotePress(contestant)}>
                                        <Text style={styles.buttonText}>Vote</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default VotingPage;