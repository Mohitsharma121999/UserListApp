import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const Shimmer = createShimmerPlaceholder(LinearGradient);
const { width,height } = Dimensions.get('window');

const HomeLoader = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          <Shimmer style={styles.shimmerImage} />
        
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical:8,paddingRight:16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    overflow: 'hidden',
  },
  shimmerImage: {
    width: '100%',
    height: height/3,
  },
 
});

export default HomeLoader;