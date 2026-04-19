import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from 'react-native';
import { listImages } from '../../redux/actions/auth';
import navigationString from '../../constants/navigationString';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { AutoHeightImage } from '../../components/AutoHeightImage';
import HomeLoader from '../../components/HomeLoader';
import ListFooterComp from '../../components/ListFooterComp';

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

  const getData = async (currentOffset: number, isRefresh = false) => {
    if (loading && !isRefresh) return;
    if (isListEnd && !isRefresh) return;

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
          isListEnd: newImages.length < 10,
        });
      } else {
        updateState({ loading: false });
      }
    } catch (error) {
      console.error('Pagination Error:', error);
      updateState({ loading: false });
    }
  };

  const handleLoadMore = () => {
    if (!loading && !isListEnd) {
      getData(offset);
    }
  };

  const renderItem = useCallback(({ item, index }: any) => (
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
          keyExtractor={(item) => item?.id?.toString()}
          getItemLayout={(_, index) => ({ length: 400, offset: 400 * index, index })}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          removeClippedSubviews={false}
          updateCellsBatchingPeriod={50}
          ListFooterComponent={
            isListEnd ? null : (
              <ListFooterComp
                loading={loading}
                isListEnd={false}
                onLoadMore={handleLoadMore}
                dataLength={images.length}
              />
            )
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No images found. Click load more.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
