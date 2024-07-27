import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, TextInput,  TouchableOpacity, } from 'react-native';
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
        const response = await fetch(`http://localhost:5000/dashboard/canteens/${canteenId}`);
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
      const response = await fetch(`http://localhost:5000/dashboard/canteens/${canteenId}/add-review`, {
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
    <View style={tw`flex flex-col h-full bg-white`}>
      {canteen && (
        <ScrollView style={tw`p-6`}>
          <Text style={tw`text-2xl mb-6 p-2 font-bold`}>{canteen.name}</Text>
          <View style={tw`w-full mb-4 p-2`}>
            <TextInput
              style={tw`w-full p-3 mb-4 border border-gray-300 rounded`}
              placeholder="Review Title"
              value={reviewTitle}
              onChangeText={text => setReviewTitle(text)}
            />
            <TextInput
              style={tw`w-full h-24 p-3 mb-4 border border-gray-300 rounded`}
              placeholder="Review Content"
              multiline
              value={reviewContent}
              onChangeText={text => setReviewContent(text)}
            />
            <TouchableOpacity style={tw`mb-2 p-3 bg-orange-500 rounded`} onPress={handleAddReview}>
              <Text style={tw`text-white`}>Add Review</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View key={item._id} style={tw`w-full mb-4 p-2`}>
                <Text style={tw`text-lg font-semibold mb-2`}>{item.title}</Text>
                <View style={tw`p-3 border border-gray-300 rounded bg-gray-100`}>
                  <Text>{item.review}</Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};


//   return (
//     <View style={tw`flex flex-col h-full bg-white`}>
//       {
//         canteen && (
//           <>
//           <ScrollView>
//             <Text style={styles.title}>{canteen.name}</Text>
//             <View style={styles.reviewForm}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Review Title"
//                 value={reviewTitle}
//                 onChangeText={text => setReviewTitle(text)}
//               />
//               <TextInput
//                 style={[styles.input, { height: 100 }]}
//                 placeholder="Review Content"
//                 multiline
//                 value={reviewContent}
//                 onChangeText={text => setReviewContent(text)}
//               />
//               <TouchableOpacity style={styles.button} onPress={handleAddReview}>
//                 <Text>Add Review</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//                 data={reviews}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <View key={item._id} style={styles.reviewContainer}>
//                       <Text style={styles.reviewTitle}>{item.title}</Text>
//                       <View style={styles.reviewBox}>
//                         <Text>{item.review}</Text>
//                       </View>
//                     </View>
//                 )}
//               />
//             </ScrollView>
//           </>
//         )
//       }
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 24,
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   button: {
//     margin: 4
//   },
//   reviewContainer: {
//     width: 500,
//     marginBottom: 16
//   },
//   reviewTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   reviewBox: {
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     backgroundColor: '#f0f0f0',
//   },
//   reviewForm: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   reviewTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
// });