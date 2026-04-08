import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { styles } from './styles';

const Detail = ({ route }: any) => {
  const { userId } = route.params;
  console.log(userId, 'userIduserIduserIduserIduserIduserId')
  const allUsers = useSelector((state: any) => state.auth.userData);

  console.log('userrsrsrss', allUsers);

  const user = Array.isArray(allUsers)
    ? allUsers.find((item: any) => item.id === userId)
    : null;

  console.log(user, 'usersrrsrsrsrsrrsrs')

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>User not found</Text>
      </View>
    );
  }

  const DetailItem = ({ label, value, icon }: any) => (
    <View style={styles.itemRow}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userUsername}>@{user.username}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <DetailItem label="Email" value={user.email} icon="✉️" />
          <DetailItem label="Phone" value={user.phone} icon="📞" />
          <DetailItem label="Website" value={user.website} icon="🌐" />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Address Details</Text>
          <DetailItem
            label="Location"
            value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            icon="📍"
          />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Company</Text>
          <DetailItem label="Name" value={user.company.name} icon="🏢" />
          <DetailItem label="Business" value={user.company.bs} icon="💼" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};





export default Detail;