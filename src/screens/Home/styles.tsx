import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

 
 export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  listPadding: {
    paddingRight: 16, 
    paddingTop: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    overflow: 'hidden',
  },
  brandContainer: {
    padding: 12,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  brandText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 1,
  },
  footer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  loadMoreBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});