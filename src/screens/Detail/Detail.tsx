import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, 
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import RNFS from 'react-native-fs';
import RNBlobUtil from 'react-native-blob-util';
import { SAVE_DATA } from '../../config/urls';
import { showError, showSuccess } from '../../utils/helperFunction';
import axios from 'axios';
const { width: screenWidth } = Dimensions.get('window');
const Details = ({ route, navigation }: any) => {
  const { imageUrl } = route.params; 
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  const [imgHeight, setImgHeight] = useState(300);
  useEffect(() => {
    if (imageUrl) {
      Image.getSize(imageUrl, (width, height) => {
        const scaleFactor = height / width;
        const dynamicHeight = screenWidth * scaleFactor;
        setImgHeight(dynamicHeight);
      }, (error) => {
        console.log("Image size error: ", error);
      });
    }
  }, [imageUrl]);
  const updateState = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    const { first_name, last_name, email, phone } = formData;

    if (!first_name.trim() || !last_name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Error", "Phone number must be 10 digits");
      return;
    }

    setLoading(true);


     const image =
      Platform.OS === "android"
        ? imageUrl
        : imageUrl;
    const filename =imageUrl.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    
      const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);

    

    data.append('user_image', {
      image,
      name: `image.${ext}`,
      type,
    } as any);
    try {
      const { data } = await axios.post(SAVE_DATA, formData);
      console.log(data,'datataatatatatatatatat')
      if (!data.isSuccess) {
        alert("Image upload failed!");
        return;
      }
      alert("Image Uploaded");
        setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
        setLoading(false);
    } finally {
        setLoading(false);
      // setSelectedImage(undefined);
    }

    // try {
    //   const localPath = `${RNFS.CachesDirectoryPath}/temp_upload_image.jpg`;

    //   await RNFS.downloadFile({
    //     fromUrl: imageUrl,
    //     toFile: localPath,
    //   }).promise;

    //   const res = await RNBlobUtil.fetch(
    //     'POST',
    //     SAVE_DATA,
    //     {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     [
    //       { name: 'first_name', data: formData.first_name },
    //       { name: 'last_name', data: formData.last_name },
    //       { name: 'email', data: formData.email },
    //       { name: 'phone', data: formData.phone },
    //       {
    //         name: 'user_image',
    //         filename: 'image.jpg',
    //         type: 'image/jpeg',
    //         data: RNBlobUtil.wrap(localPath), 
    //       },
    //     ]
    //   );

    //  showSuccess('Data submitted successfully!')
    //   navigation.goBack();

    // } catch (err) {
    //   console.log("Upload Error:", err);
    //     showError('Something went wrong while uploading')
    //   // Alert.alert("Error", "Something went wrong while uploading.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>{'←'}</Text> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details Screen</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
         <View style={[styles.imageContainer, { height: imgHeight }]}>
            <FastImage 
              source={{ uri: imageUrl }} 
              style={styles.image} 
              resizeMode={FastImage.resizeMode.contain} 
            />
          </View>

          <View style={styles.form}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>First name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter first name"
                placeholderTextColor="#999"
                onChangeText={(txt) => updateState('first_name', txt)} 
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Last name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter last name"
                placeholderTextColor="#999"
                onChangeText={(txt) => updateState('last_name', txt)} 
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(txt) => updateState('email', txt)} 
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Phone</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter Number"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(txt) => updateState('phone', txt)} 
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.submitBtn, loading && { opacity: 0.7 }]} 
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Details;