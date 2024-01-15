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
import { bookUpdate, deleteBook, selectBooks, Book, addBook } from "../store";
import { useSelector, useDispatch } from "react-redux";

interface BookManagementProps {}

const BookManagement: React.FC<BookManagementProps> = () => {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();
  const [updateBook, setUpdateBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    genre: "",
    coverImage: "",
    isbn: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleUpdate = (bookId: string) => {
    const { title, author, genre, coverImage, isbn } = updateBook;
    const payload = { bookId, title, author, genre, coverImage, isbn };
    dispatch(bookUpdate(payload));
    setUpdateBook({
      id: "",
      title: "",
      author: "",
      genre: "",
      coverImage: "",
      isbn: "",
    });
  };

  const handleDelete = (bookIdToDelete: string) => {
    dispatch(deleteBook(bookIdToDelete));
  };

  const handleAddBook = () => {
    dispatch(addBook(updateBook));
    setUpdateBook({
      id: "",
      title: "",
      author: "",
      genre: "",
      coverImage: "",
      isbn: "",
    });
    setIsFormOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setIsFormOpen(true)}>
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.label}>Adı:</Text>
            <TextInput style={styles.input} placeholder={item.title} onChangeText={(text) => setUpdateBook({ ...item, title: text })} />
            <Text style={styles.label}>Yazar:</Text>
            <TextInput style={styles.input} placeholder={item.author as string} onChangeText={(text) => setUpdateBook({ ...item, author: text })} />
            <Text style={styles.label}>Tür:</Text>
            <TextInput style={styles.input} placeholder={item.genre} onChangeText={(text) => setUpdateBook({ ...item, genre: text })} />
            <Text style={styles.label}>Kapak Fotoğrafı(URL) :</Text>
            <TextInput style={styles.input} placeholder={item.coverImage} onChangeText={(text) => setUpdateBook({ ...item, coverImage: text })} />
            <Text style={styles.label}>ISBN:</Text>
            <TextInput style={styles.input} placeholder={item.isbn} onChangeText={(text) => setUpdateBook({ ...item, isbn: text })} />

            <TouchableOpacity style={styles.button} onPress={() => handleUpdate(item.id)}>
              <Text style={styles.buttonText}>Güncelle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={isFormOpen} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setIsFormOpen(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TextInput style={styles.input} placeholder="Title" value={updateBook.title} onChangeText={(text) => setUpdateBook({ ...updateBook, title: text })} />
          <TextInput style={styles.input} placeholder="Author" value={updateBook.author as string} onChangeText={(text) => setUpdateBook({ ...updateBook, author: text })} />
          <TextInput style={styles.input} placeholder="Genre" value={updateBook.genre} onChangeText={(text) => setUpdateBook({ ...updateBook, genre: text })} />
          <TextInput style={styles.input} placeholder="Cover Image" value={updateBook.coverImage} onChangeText={(text) => setUpdateBook({ ...updateBook, coverImage: text })} />
          <TextInput style={styles.input} placeholder="ISBN" value={updateBook.isbn} onChangeText={(text) => setUpdateBook({ ...updateBook, isbn: text })} />
          <TouchableOpacity style={styles.button} onPress={handleAddBook}>
            <Text style={styles.buttonText}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsFormOpen(false)}>
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
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: 1800,
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

export default BookManagement;
