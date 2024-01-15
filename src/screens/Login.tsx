import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectLogin } from '../store';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const loginState = useSelector(selectLogin);
  const [loginButtonPressed, setLoginButtonPressed] = useState(false);

  const handleLogin = async () => {
    setLoginButtonPressed(true);
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (loginButtonPressed) {
      const alertMessage = loginState ? 'Giriş Başarılı' : 'Kullanıcı adı veya şifre yanlış!';
      alert(alertMessage);
      navigation.navigate(loginState ? 'Kitaplar' : 'Login');
      setLoginButtonPressed(false);
    }
  }, [loginState, loginButtonPressed, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kütüphane Uygulaması</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#95a5a6"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#95a5a6"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    width: '80%',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Login;
