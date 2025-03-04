import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {

    const [searchText, setSearchText] = useState("");

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        console.log(searchText);
    };

    const handleFilterPress = () => {
        console.log("Filter button pressed");
    };

    const [canteens, setCanteens] = useState([]);

    useEffect(() => {
        const fetchCanteens = async () => {
            try {
                const response = await fetch('http://localhost:5000/dashboard/canteens');
                const result = await response.json();
                const data = result.data.canteens;
                setCanteens(data);
            } catch (error) {
                console.error('Error fetching canteen data:', error);
            }
        };

        fetchCanteens();
    }, []);

    // const tabs = [
    //     { name: "Home", icon: "home", type: "feather" },
    //     { name: "Contest", icon: "award", type: "feather" },
    //     { name: "Add", icon: "plus-square", type: "feather" }, 
    //     { name: "Replies", icon: "inbox", type: "feather" },
    //     { name: "Profile", icon: "user", type: "feather" },
    // ];

    // const handleTabPress = (tab) => {
    //     console.log(tab.name);
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
            <View style={tw`flex flex-row justify-between px-3 py-2`}>
                <TextInput
                    onChangeText={handleSearchTextChange}
                    style={tw`border-2 border-gray-400 rounded-2xl w-5/6 p-2`}
                    placeholder="Search for a canteen"
                />
                <TouchableOpacity 
                    onPress={handleFilterPress} 
                    style={tw`p-2 bg-gray-200 rounded-lg items-center justify-center h-10 w-10`}
                >
                    <IconFeather name="filter" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <ScrollView style={tw`h-5/6`}>
                {canteens.map((canteen) => (
                    <Canteen
                        key={canteen.name}
                        id = {canteen.id}
                        name={canteen.name}
                        nearestFaculty={canteen.nearestFaculty}
                        image={canteen.image}
                        navigation={navigation}
                    />
                ))}
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

const Canteen = ({ id, name, nearestFaculty, image, navigation }) => {
    const [isFavourited, setIsFavourited] = useState(false);
    const [isCanteenInformationOpen, setIsCanteenInformationOpen] = useState(false);

    const toggleIsFavourite = () => {
        setIsFavourited(!isFavourited);
        console.log(isFavourited);
    };

    const toggleCanteenInformation = () => {
        setIsCanteenInformationOpen(!isCanteenInformationOpen);
    };

    const stalls = [
        { stall: "stall1" },
        { stall: "stall2" },
        { stall: "stall3" },
    ];

    const heartColor = isFavourited ? "orange" : "gray";

    return (
        // <TouchableOpacity onPress={toggleCanteenInformation}
        <TouchableOpacity onPress={() => navigation.navigate('Reviews', { canteenId: id })}>
            <View style={tw`flex flex-col my-2 mx-2`}>
                <View style={tw`w-full rounded-lg overflow-hidden`}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: '100%', aspectRatio: 3 / 1, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                </View>
                <View style={tw`flex flex-row justify-between border-b-2 border-orange-200 mt-2 py-2`}>
                    <View style={tw`flex w-5/6 ml-4`}>
                        <View style={tw`flex flex-row`}>
                            <Text style={tw`font-bold text-lg text-orange-500 pr-2`}>{name}</Text>
                        </View>
                        <View style={tw`flex flex-row`}>
                            <Text style={tw`text-gray-700`}>{nearestFaculty}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`mr-4`} onPress={toggleIsFavourite}>
                        <Icon name="heart" size={20} color={heartColor} />
                    </TouchableOpacity>
                </View>
                {/* {isCanteenInformationOpen && (
                    <View style={tw`flex flex-col py-1`}>
                        {stalls.map((stall) => (
                            <View key={stall.stall} style={tw`pl-4`}>
                                <Text style={tw`mb-1 text-orange-600`}>{stall.stall}</Text>
                            </View>
                        ))}
                    </View>
                )} */}
            </View>
        </TouchableOpacity>
    );
};
