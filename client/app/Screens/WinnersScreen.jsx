import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';

export default function WinnersScreen() {

    const awards = [
        { 
            title: "Funniest Nickname", 
            description: "Giving us some hehes and hahas in July",
            profile: "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1",
            username: "Im the Best potato alive"
        },
        { 
            title: "Our Vege Lover", 
            description: "crunch crunch",
            profile: "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1",
            username: "Im the Best potato alive"
        },
        { 
            title: "Best Eater", 
            description: "Our most trusted buddy",
            profile: "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1",
            username: "Im the Best potato alive"
        },
        { 
            title: "Some Other Award", 
            description: "Winner of July",
            profile: "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1",
            username: "Im the Best potato alive"
        },
    ];

    const tabs = [
        { name: "Home", icon: "home", type: "feather" },
        { name: "Search", icon: "search", type: "feather" },
        { name: "Add", icon: "plus-square", type: "feather" }, // Using Feather for plus-square
        { name: "Replies", icon: "inbox", type: "feather" },
        { name: "Profile", icon: "user", type: "feather" },
    ];

    const handleTabPress = (tab) => {
        console.log(tab.name);
    };

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
    
    return (
        <View style={tw`flex flex-col h-full bg-white`}>
            
            <ScrollView style={tw`h-5/6`}>
                {awards.map((award) => (
                    <Award
                        key={award.title}
                        title={award.title}
                        description={award.description}
                        profile={award.profile}
                        username = {award.username}
                    />
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

}

const Award = ({ title, description, profile, username }) => {

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
        <View>
            <TouchableOpacity>
                <View style={tw`flex flex-col mt-2 mb-1 mx-4`}>
                    <View style={tw`flex flex-row justify-between border-orange-200 mt-2 py-2`}>
                        <View style={tw`flex w-5/6`}>
                            <View style={tw`flex flex-row`}>
                                <Text style={tw`font-bold text-lg text-black mb-1`}>{title}</Text>
                            </View>
                            <View style={tw`flex flex-row`}>
                                <Text style={tw`text-gray-500`}>{description}</Text>
                            </View>
                        </View>
                        <View style={tw`flex flex-row justify-between px-3 py-2`}>
                            <View>
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Vote</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={tw`flex flex-col mb-1 mx-4`}>
                    <View style={tw`w-full rounded-lg overflow-hidden`}>
                        <ImageBackground
                            source={{ uri: profile }}
                            style={{ width: '100%', aspectRatio: 5 / 1, borderRadius: 10 }}
                            resizeMode="cover">
                            
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>{username}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
