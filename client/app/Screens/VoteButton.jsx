import React, { useState } from "react";
import tw from 'twrnc';

const VoteButton = () => {

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
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Vote</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VoteButton;