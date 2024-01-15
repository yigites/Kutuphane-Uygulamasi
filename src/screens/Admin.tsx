// src/components/Admin.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const Admin: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateTo = (screen: string) => () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateTo('Kitap Yönetimi')}>
        <Text style={styles.buttonText}>Kitapları Yönet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateTo('Kullanici Yönetimi')}>
        <Text style={styles.buttonText}>Kullanıcıları Yönet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e3d57',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '120%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Admin;
