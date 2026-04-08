import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const UserCard = ({ item, onPress }: any) => {
  const initial = item?.name?.charAt(0) || 'U';
  console.log(item,'dskdkkkdkdkkdkkkddd')

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: 12,
    height: 110, 
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#6200ee15', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  phone: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  }
});

export default UserCard;