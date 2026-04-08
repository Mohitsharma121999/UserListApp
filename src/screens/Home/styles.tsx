import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  searchBox: { 
    height: 50, backgroundColor: '#fff', borderRadius: 15, 
    paddingHorizontal: 20, fontSize: 16, elevation: 3 
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 20, flexGrow: 1 },
  
  centerLoader: {
    flex: 1,              
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  blackLoadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#000',         
    fontWeight: '500',
  },

  footerLoader: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  blackFooterText: {
    fontSize: 12,
    color: '#000',         
    marginTop: 5,
  },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666' },
emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});