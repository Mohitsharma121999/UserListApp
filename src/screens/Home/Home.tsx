import React, { useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Text,

  StatusBar
} from 'react-native';
import { listUsers, saveUserData } from '../../redux/actions/auth';
import navigationString from '../../constants/navigationString';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListEmpty, ListFooter, UserListRow } from '../../components/HomeComponents';
const Home = ({ navigation }: any) => {
  const [state, setState] = React.useState({
    users: [],
    loading: false,
    page: 1,
    searchText: '',
    isRefreshing: false,
    isListEnd: false,
  });

  const { users, loading, page, searchText, isRefreshing, isListEnd } = state;
  const updateState = (data: any) => setState(prev => ({ ...prev, ...data }));

  useEffect(() => {
    console.log('cheeleleleel')
    getData(1);
  }, []);

  const getData = async (currentPage: number) => {
    console.log('firstststtsttss')
    if (loading || (isListEnd && currentPage !== 1)) return;

    console.log('shshhshshshhsh')
    try {
      console.log('jjjjjjjjj')
      updateState({ loading: true });
      const query = `?_page=${currentPage}&_limit=5`;
        console.log('preeveveveveve')
      const res: any = await listUsers(query);
      console.log(res,'reseseseseeseseesese')

      if (res && res.length > 0) {
        saveUserData(currentPage === 1 ? res : [...users, ...res])
        updateState({
          users: currentPage === 1 ? res : [...users, ...res],
          page: currentPage + 1,
          loading: false,
          isRefreshing: false,
          isListEnd: res.length < 5
        });
      } else {
        updateState({ loading: false, isRefreshing: false, isListEnd: true });
      }
    } catch (error) {
      updateState({ loading: false, isRefreshing: false });
    }
  };

  const filteredData = users.filter((item: any) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = useCallback(({ item }: any) => (
    <UserListRow
      item={item} 
      onPress={() => navigation.navigate(navigationString.DETAILS, { userId: item.id })} 
    />
  ), [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      <View style={styles.header}>
        <Text style={styles.title}>List Users</Text>
        <TextInput
          style={styles.searchBox}
          placeholder="Search by name..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(val) => updateState({ searchText: val })}
        />
      </View>

      {loading && users.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.blackLoadingText}>Loading Users...</Text>
        </View>
      ) : (
       <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          contentContainerStyle={styles.listContent}
          onEndReached={() => !loading && !isListEnd && searchText === '' && getData(page)}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing} 
              onRefresh={() => {
                updateState({ isRefreshing: true, page: 1, isListEnd: false });
                getData(1);
              }} 
              colors={['#000']} 
            />
          }
          ListFooterComponent={<ListFooter loading={loading} isRefreshing={isRefreshing} />}
          ListEmptyComponent={<ListEmpty loading={loading} isRefreshing={isRefreshing} />}
        />
      )}
    </SafeAreaView>
  );
};



export default Home;