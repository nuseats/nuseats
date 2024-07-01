import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput,  TouchableOpacity, } from 'react-native';
import tw from 'twrnc';

export default function ReviewsScreen({ route }) {
  const { canteenId } = route.params;
  const [canteen, setCanteen] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://192.168.1.75:5000/dashboard/canteens/${canteenId}`);
        const results = await response.json();
        setCanteen(results.data.canteen)
        setReviews(results.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [canteenId]);

  const handleAddReview = async () => {
    try {
      const response = await fetch(`http://192.168.1.75:5000/dashboard/canteens/${canteenId}/add-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: reviewTitle,
          review: reviewContent,
          canteen_id: canteenId
        }),
      });

      const result = await response.json();
      console.log('Review added successfully:', result);

      // Update local state with the new review
      setReviews([...reviews, { id: result.id, canteen_id: result.canteen_id, title: reviewTitle, review: reviewContent }]);
      
      // Clear input fields
      setReviewTitle('');
      setReviewContent('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };


  return (
    <View style={styles.container}>
      {
        canteen && (
          <>
          <Text style={styles.title}>{canteen.name}</Text>
          <View style={styles.reviewForm}>
            <TextInput
              style={styles.input}
              placeholder="Review Title"
              value={reviewTitle}
              onChangeText={text => setReviewTitle(text)}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Review Content"
              multiline
              value={reviewContent}
              onChangeText={text => setReviewContent(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddReview}>
              <Text>Add Review</Text>
            </TouchableOpacity>
          </View>
          <FlatList
                data={reviews}
                keyExtractor={(item) => item._id} // Assuming each review has a unique _id
                renderItem={({ item }) => (
                    // <View style={tw`border-b border-gray-300 mb-2 p-2`}>
                    //     <Text>{item.title}</Text>
                    //     <Text>{item.review}</Text>
                    // </View>
                    <View key={item._id} style={styles.reviewContainer}>
                      <Text style={styles.reviewTitle}>{item.title}</Text>
                      <View style={styles.reviewBox}>
                        <Text>{item.review}</Text>
                      </View>
                    </View>
                )}
            />
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    margin: 4
  },
  reviewContainer: {
    width: 500,
    marginBottom: 16
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewBox: {
    borderRadius: 10, // Adjust border radius for curved corners
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    backgroundColor: '#f0f0f0', // Background color of the review box
  },
  reviewForm: {
    width: '100%',
    marginBottom: 16,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});