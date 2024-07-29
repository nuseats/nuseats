import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VotingPage = () => {

    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [userVotes, setUserVotes] = useState([]);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        fetchLoggedInUserId();
        fetchUsers();
        fetchAwards();
        fetchUserVotes();
    }, []);

    const fetchLoggedInUserId = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        setLoggedInUserId(userId);
    };

    const fetchUsers = async () => {
        try {
        const response = await fetch('http://localhost:5000/dashboard/users');
        const data = await response.json();
        setUsers(data.data);
        } catch (error) {
        console.error('Error fetching users:', error);
        }
    };

    const fetchAwards = async () => {
        try {
          const response = await fetch('http://localhost:5000/dashboard/awards');
          const data = await response.json();
          setAwards(data.data);
        } catch (error) {
          console.error('Error fetching awards:', error);
        }
    };

    const fetchUserVotes = async () => {
        if (!loggedInUserId) return;
        
        try {
            const response = await fetch(`http://localhost:5000/dashboard/user-votes/${loggedInUserId}`);
            const data = await response.json();
            setUserVotes(data.votes);
            console.log(data.votes)
        } catch (error) {
            console.error('Error fetching user votes:', error);
        }
    };

    const hasVotedForAward = (awardId) => {
        return userVotes.some(vote => vote.award_id === awardId);
    };

    const hasVotedUserForAward = (awardId, contestantId) => {
        return userVotes.some(vote => vote.award_id === awardId && vote.user_id === contestantId);
    };

    const handleVotePress = async (award, contestant) => {
        if (hasVotedForAward(award.id)) {
            Alert.alert('You have already voted for this award.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/dashboard/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voter_id: loggedInUserId,
                    user_id: contestant.id,
                    award_id: award.id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("voted")
                fetchUserVotes();
            } else {
                Alert.alert('Error', data.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error voting:', error);
            Alert.alert('Error', 'Something went wrong while voting.');
        }

        Alert.alert('Great Choice!', `You have voted for ${contestant.username}`);
        fetchUserVotes();
    };

    // style for vote button
    const styles = {
        buttonContainer: {
          backgroundColor: tw.color('orange-500'),
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          borderRadius: 20,
          marginTop: 8,
        },
        votedButtonContainer: {
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

                        {users.map((contestant, cIndex) => (
                            <View key={cIndex} style={tw`mb-1`}>
                                <View style={styles.contestantContainer}>
                                    <Text style={tw`text-lg`}> {contestant.username}</Text>
                                </View>
                                <View style={tw`flex-row-reverse mb-1`}>
                                    <TouchableOpacity 
                                        style={hasVotedUserForAward(award.id, contestant.id) ? styles.buttonContainer : styles.votedButtonContainer}
                                        onPress={() => handleVotePress(award, contestant)}>
                                        <Text style={styles.buttonText}>
                                            {hasVotedUserForAward(award.id, contestant.id) ? 'Voted' : 'Vote'}
                                        </Text>
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