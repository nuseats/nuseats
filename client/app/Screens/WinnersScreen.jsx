import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Button, Alert } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';

export default function WinnersScreen() {

    const awards = [
        { 
            title: "Techno Edge", 
            description: "Engineering",
            profile: "https://nus.edu.sg/alumnet//images/librariesprovider2/issue-125/canteen-1",
            username: "hello"
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

    const styles = {
        buttonContainer: {
          backgroundColor: 'orange',
          padding: 8,
          borderRadius: 15,
        },
        buttonText: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        rightAlign: {
            flex: 1,
            alignItems: 'flex-end', // Align to the right
          },
      };
    
    return (
        <View style={tw`flex flex-col h-full bg-white`}>
            <View style={tw`flex flex-row justify-between px-3 py-2`}>
                <View style={styles.rightAlign}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

};
