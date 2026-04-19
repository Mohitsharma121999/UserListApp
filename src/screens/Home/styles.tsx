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
    paddingBottom: 32,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
  },
});
