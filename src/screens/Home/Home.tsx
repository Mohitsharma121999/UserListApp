import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { listImages } from '../../redux/actions/auth';
import navigationString from '../../constants/navigationString';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { AutoHeightImage } from '../../components/AutoHeightImage';
import HomeLoader from '../../components/HomeLoader';
import ListFooter from '../../components/ListFooterComp';

const { width } = Dimensions.get('window');

const Home = ({ navigation }: any) => {
  const [state, setState] = useState({
    images: [],
    loading: false,
    offset: 0,
    isListEnd: false,
  });

  const { images, loading, offset, isListEnd } = state;
  const updateState = (data: any) => setState(prev => ({ ...prev, ...data }));

  useEffect(() => {
    getData(0);
  }, []);

const getData = async (currentOffset: number) => {
  if (loading || (isListEnd && currentOffset !== 0)) return;

  try {
    updateState({ loading: true });
    const payload = {
      user_id: '108',
      offset: currentOffset.toString(), 
      type: 'popular'
    };
    console.log(`--- Fetching Data | Offset: ${currentOffset} ---`);
    const res: any = await listImages(payload);

    if (res && res.status === "success") {
      const newImages = res.images || [];
      if (newImages.length === 0) {
        updateState({ isListEnd: true, loading: false });
        return;
      }

      const existingIds = new Set(images.map((img: any) => img.id));
      const uniqueNewImages = newImages.filter((img: any) => !existingIds.has(img.id));
      updateState({
        images: currentOffset === 0 ? newImages : [...images, ...uniqueNewImages],
        offset: currentOffset + 1, 
        loading: false,
        isRefreshing: false,
        isListEnd: newImages.length < 10, 
      });

    } else {
      updateState({ loading: false, isRefreshing: false, isListEnd: true });
    }
  } catch (error) {
    console.error('Pagination Error:', error);
    updateState({ loading: false, isRefreshing: false });
  }
};
console.log(images,'imageseseseeseseeseseesese')

  const renderItem = useCallback(({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate(navigationString.DETAILS, { imageUrl: item?.xt_image })}
    >
      <AutoHeightImage url={item?.xt_image} />
      
  
    </TouchableOpacity>
  ), [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {loading && images.length === 0 ? (
      <HomeLoader />
    ) : (
      <FlatList
        data={images}
        renderItem={renderItem}
      keyExtractor={(item, index) => item?.id?.toString() + index}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
  maxToRenderPerBatch={10} 
  windowSize={5}
  removeClippedSubviews={false}
  updateCellsBatchingPeriod={50}
      ListFooterComponent={() => (
    <ListFooter
      loading={loading}
      isListEnd={isListEnd}
      onLoadMore={() => getData(offset)}
      dataLength={images.length}
    />
  )}
      />)}
    </SafeAreaView>
  );
};


export default Home;