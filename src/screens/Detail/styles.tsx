import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backBtn: {
    padding: 5,
  },
  backText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    // height: 400,
    borderRadius: 4, 
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',

  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    flex: 0.35,
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    flex: 0.65,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4, 
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    alignItems: 'center', 
    marginTop: 15,
  },
  submitBtn: {
   
    height: 50,
    borderRadius: 4,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    padding:12,
    width:108
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
});