import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { SAVE_DATA } from '../../config/urls';
import { showError, showSuccess } from '../../utils/helperFunction';

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

  const updateFormField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    const { first_name, last_name, email, phone } = formData;

    // Validation
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

    try {
      // Create FormData for multipart upload
      const form = new FormData();
      form.append('first_name', first_name);
      form.append('last_name', last_name);
      form.append('email', email);
      form.append('phone', phone);
      form.append('user_image', { uri: imageUrl, name: 'image.jpg', type: 'image/jpeg' } as any);

      const response = await fetch(SAVE_DATA, {
        method: 'POST',
        body: form,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const textResponse = await response.text();
      console.log('Server response:', textResponse);

      let result;
      try {
        result = JSON.parse(textResponse);
      } catch {
        console.log('Non-JSON response:', textResponse);
        showError('Server returned non-JSON response');
        return;
      }

      if (result.status === 'success') {
        showSuccess('Data submitted successfully!');
        navigation.goBack();
      } else {
        showError(result.message || 'Submission failed');
      }
    } catch (err) {
      console.log("Upload Error:", err);
      showError('Something went wrong while uploading');
    } finally {
      setLoading(false);
    }
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
                onChangeText={(txt) => updateFormField('first_name', txt)} 
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Last name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter last name"
                placeholderTextColor="#999"
                onChangeText={(txt) => updateFormField('last_name', txt)} 
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
                onChangeText={(txt) => updateFormField('email', txt)} 
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
                onChangeText={(txt) => updateFormField('phone', txt)} 
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
