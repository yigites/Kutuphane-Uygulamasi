import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./src/store";
import {
  Login,
  BookList,
  Main,
  Register,
  Admin,
  UserManagement,
  BookManagement,
} from "./src/screens";

const Stack = createNativeStackNavigator();

const screenStyles = {
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e3d57",
    padding: 20,
  },
};

const App: React.FC = () => {
  const ScreenComponent = (Component: React.FC) => () =>
    (
      <View style={styles.screenContainer}>
        <Component />
      </View>
    );

  return (
    <Provider store={store}>
      <Router>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#0e3d57",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerShadowVisible: false,
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="Kütüphane Uygulaması"
                component={ScreenComponent(UserManagement)}
              />
              <Stack.Screen
                name="Yonetici Paneli"
                component={ScreenComponent(Admin)}
              />
              <Stack.Screen
                name="Kitap Yönetimi"
                component={ScreenComponent(BookManagement)}
              />
              <Stack.Screen
                name="Kitaplar"
                component={ScreenComponent(BookList)}
              />
              <Stack.Screen
                name="Kullanici Yönetimi"
                component={ScreenComponent(UserManagement)}
              />
              <Stack.Screen name="Giris" component={ScreenComponent(Login)} />
              <Stack.Screen
                name="Kayit"
                component={ScreenComponent(Register)}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e3d57",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e3d57",
    padding: 20,
  },
});

export default App;
