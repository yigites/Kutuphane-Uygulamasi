import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

// Redux actions ve selectors
import {
  userUpdate,
  deleteUser,
  selectUsers,
  addUser,
  clearUsers,
  User,
} from "../store";

// React Navigation veya başka bir navigasyon çözümü kullanılıyorsa ilgili import eklenmeli

interface UserManagementProps {}

const UserManagement: React.FC<UserManagementProps> = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState<User>({
    username: "",
    password: "",
    role: "user",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleUpdate = (oldUsername: string) => {
    const { username, password, role } = updateUser;
    const payload = { username, password, role, oldUsername };
    dispatch(userUpdate(payload));
    setUpdateUser({ username: "", password: "", role: "user" });
  };

  const handleClear = () => {
    dispatch(clearUsers());
  };

  const handleDelete = (usernameToDelete: string) => {
    dispatch(deleteUser(usernameToDelete));
  };

  const handleAddUser = () => {
    dispatch(addUser(updateUser));
    setUpdateUser({ username: "", password: "", role: "user" });
    setIsFormOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Ekleme ve Silme Butonları */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsFormOpen(true)}
      >
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.buttonText}>Sil (Tüm Kullanıcılar)</Text>
      </TouchableOpacity>

      {/* Kullanıcı Listesi */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            {/* Kullanıcı Bilgileri */}
            <Text style={styles.label}>Kullanıcı Adı:</Text>
            <TextInput
              style={styles.input}
              placeholder={item.username}
              onChangeText={(text) =>
                setUpdateUser({ ...item, username: text })
              }
            />
            <Text style={styles.label}>Şifre:</Text>
            <TextInput
              style={styles.input}
              placeholder={item.password}
              onChangeText={(text) =>
                setUpdateUser({ ...item, password: text })
              }
            />
            <Text style={styles.label}>Yetki:</Text>
            <RNPickerSelect
              value={item.role}
              onValueChange={(value) =>
                setUpdateUser({ ...item, role: value as "user" | "admin" })
              }
              items={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
              ]}
            />

            {/* Güncelleme ve Silme Butonları */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdate(item.username)}
            >
              <Text style={styles.buttonText}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(item.username)}
            >
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Kullanıcı Ekleme Modal */}
      <Modal visible={isFormOpen} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setIsFormOpen(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={updateUser.username}
            onChangeText={(text) =>
              setUpdateUser({ ...updateUser, username: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={updateUser.password}
            onChangeText={(text) =>
              setUpdateUser({ ...updateUser, password: text })
            }
          />
          <RNPickerSelect
            style={{ inputAndroid: { alignSelf: "center" } }}
            value={updateUser.role}
            onValueChange={(value) =>
              setUpdateUser({ ...updateUser, role: value as "user" | "admin" })
            }
            items={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
          {/* Ekleme ve İptal Butonları */}
          <TouchableOpacity style={styles.button} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsFormOpen(false)}
          >
            <Text style={styles.buttonText}>İptal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  clearButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: 900,
    height: 60,
    top: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4caf50",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default UserManagement;
