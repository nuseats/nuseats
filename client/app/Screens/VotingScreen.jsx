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
        Alert.alert('Nice Choice', `You have voted for ${contestant}!`);
    };

    // bottom tab
    const tabs = [
        { name: "Home", icon: "home", type: "feather" },
        { name: "Contest", icon: "award", type: "feather" },
        { name: "Add", icon: "plus-square", type: "feather" }, 
        { name: "Replies", icon: "inbox", type: "feather" },
        { name: "Profile", icon: "user", type: "feather" },
    ];

    const renderIcon = (icon, type) => {
        switch (type) {
            case 'ionicons':
                return <IconIonic name={icon} size={24} color="black" />;
            case 'fontawesome5':
                return <IconFA5 name={icon} size={24} color="black" />;
            case 'feather':
                return <IconFeather name={icon} size={24} color="black" />; 
            default:
                return <Icon name={icon} size={24} color="black" />;
        }
    };

    const handleTabPress = (tab) => {
        navigation.navigate(tab.name); // Navigate to the screen named after the tab
    };
    // end of bottom tab

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
            
            <View style={tw`flex flex-row justify-around bg-orange-500 py-4`}>
                {tabs.map((tab) => (
                    <TouchableOpacity key={tab.name} onPress={() => handleTabPress(tab)} style={tw`flex items-center`}>
                        {renderIcon(tab.icon, tab.type)}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default VotingPage;