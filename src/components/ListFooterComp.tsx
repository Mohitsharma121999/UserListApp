import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

interface ListFooterProps {
  loading: boolean;
  isListEnd: boolean;
  onLoadMore: () => void;
  dataLength: number;
}

const ListFooter = ({ loading, isListEnd, onLoadMore, dataLength }: ListFooterProps) => {
  if (dataLength === 0) return null;

  return (
    <View style={styles.footerContainer}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Fetching more...</Text>
        </View>
      ) : !isListEnd ? (
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.loadMoreBtn} 
          onPress={onLoadMore}
        >
          <Text style={styles.loadMoreText}>Click here to Loadmore...</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.endMessageContainer}>
          <View style={styles.divider} />
          <Text style={styles.endText}>No more items found</Text>
          <View style={styles.divider} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 12,
  },
  loadMoreBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  endMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  endText: {
    color: '#999',
    fontSize: 13,
    marginHorizontal: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
});

export default ListFooter;