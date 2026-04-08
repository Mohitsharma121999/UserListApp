import React from 'react';
import { View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { styles } from '../screens/Home/styles';
import UserCard from './UserCard';


export const UserListRow = ({ item, onPress }: any) => (
  <UserCard item={item} onPress={onPress} />
);

export const ListFooter = ({ loading, isRefreshing }: { loading: boolean; isRefreshing: boolean }) => {
  if (loading && !isRefreshing) {
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000" />
        <Text style={styles.blackFooterText}>Loading more...</Text>
      </View>
    );
  }
  return null;
};

export const ListEmpty = ({ loading, isRefreshing }: { loading: boolean; isRefreshing: boolean }) => {
  if (!loading && !isRefreshing) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No users found.</Text>
      </View>
    );
  }
  return null;
};