import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function WinnersScreen() {

    const navigation = useNavigation(); // useNavigation hook

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

    // const tabs = [
    //     { name: "Home", icon: "home", type: "feather" },
    //     { name: "Contest", icon: "award", type: "feather" },
    //     { name: "Add", icon: "plus-square", type: "feather" }, 
    //     { name: "Replies", icon: "inbox", type: "feather" },
    //     { name: "Profile", icon: "user", type: "feather" },
    // ];

    // const handleTabPress = (tab) => {
    //     navigation.navigate('Home');
    // };

    // const renderIcon = (icon, type) => {
    //     switch (type) {
    //         case 'ionicons':
    //             return <IconIonic name={icon} size={24} color="black" />;
    //         case 'fontawesome5':
    //             return <IconFA5 name={icon} size={24} color="black" />;
    //         case 'feather':
    //             return <IconFeather name={icon} size={24} color="black" />; 
    //         default:
    //             return <Icon name={icon} size={24} color="black" />;
    //     }
    // };
    
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
                <TouchableOpacity style={tw`bg-orange-400 py-3 mx-4 my-4 rounded-lg`} onPress={() => navigation.navigate('Vote')}>
                    <Text style={tw`text-white text-center text-lg`}>Vote for your favourite Eaters</Text>
                </TouchableOpacity>
            </ScrollView>
            
            {/* <View style={tw`flex flex-row justify-around bg-orange-500 py-4`}>
                {tabs.map((tab) => (
                    <TouchableOpacity key={tab.name} onPress={() => handleTabPress(tab)} style={tw`flex items-center`}>
                        {renderIcon(tab.icon, tab.type)}
                    </TouchableOpacity>
                ))}
            </View> */}
            
        </View>
    );

}

const Award = ({ title, description, profile, username }) => {

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
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={tw`flex flex-col mx-4`}>
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
