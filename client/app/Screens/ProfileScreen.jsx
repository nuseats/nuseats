import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import IconIonic from 'react-native-vector-icons/Ionicons'; 
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const navigation = useNavigation(); // useNavigation hook

  // temporary data
  const profile = {
    photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 
    username: 'Vege Crunch',
    name: 'Jingjing',
    email: 'vegecrunch@gmail.com',
    pastAwards: [
      'Best Vege Lover',
      'Crazy Frontier fan',
      'Funniest Username (Jul 2024)',
    ],
    bio: 'Add a cool description of yourself!',
  };

  // bottom tab to be added
  // const tabs = [
    //     { name: "Home", icon: "home", type: "feather" },
    //     { name: "Contest", icon: "award", type: "feather" },
    //     { name: "Add", icon: "plus-square", type: "feather" }, 
    //     { name: "Replies", icon: "inbox", type: "feather" },
    //     { name: "Profile", icon: "user", type: "feather" },
    // ];

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

    // const handleTabPress = (tab) => {
    //     navigation.navigate(tab.name); 
    // };
    // end of bottom tab
  
  return (
    <View style={tw`flex-1 bg-white px-3`}>
      <ScrollView style={tw`flex-1 px-4 py-4`}>
        <View style={tw`items-center mb-4`}>
          <Image
            source={{ uri: profile.photo }}
            style={tw`w-24 h-24 rounded-full mb-2`}
          />
          <Text style={tw`text-blue-500 mb-4`}>Edit profile image</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`font-bold text-lg mb-1`}>Name</Text>
          <Text>{profile.name}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`font-bold text-lg mb-1`}>Your coolest nickname</Text>
          <Text>@{profile.username}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`font-bold text-lg mb-1`}>Email</Text>
          <Text>{profile.email}</Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`font-bold text-lg mb-1`}>Past awards</Text>
          {profile.pastAwards.map((award, index) => (
            <Text key={index}>{award}</Text>
          ))}
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`font-bold text-lg mb-1`}>Bio</Text>
          <Text>{profile.bio}</Text>
        </View>
      </ScrollView>

      {/* <View style={tw`flex flex-row justify-around bg-orange-500 py-4`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handleTabPress(tab)}
            style={tw`flex items-center`}
          >
            {renderIcon(tab.icon, tab.type)}
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
};

export default ProfilePage;