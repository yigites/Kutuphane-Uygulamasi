import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import { RootState, selectCurrentUser } from "../store";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

interface Book {
  id: string;
  title: string;
  author: string[] | string;
  genre: string;
  coverImage: string;
  isbn: string;
}

const formatISBN = (isbn: string): string => {
  if (isbn && isbn.length === 13) {
    return `${isbn.slice(0, 3)}-${isbn.slice(3, 5)}-${isbn.slice(5, 14)}-${isbn.slice(14)}`;
  }
  return isbn;
};

const BookList: React.FC = () => {
  const books: Book[] = useSelector((state: RootState) => state.app.books);
  const currentUser = useSelector(selectCurrentUser);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchText, setSearchText] = useState("");
  const [sortingOption, setSortingOption] = useState("title");
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    applyFilterAndSort();
  }, [searchText, sortingOption]);

  const applyFilterAndSort = () => {
    let filtered = [...books];

    if (searchText && searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase();
      filtered = books.filter((book) => {
        const hasTitle = book.title.toLowerCase().includes(searchLower);
        const hasISBN = book.isbn.includes(searchText);
        const hasAuthor =
          book.author &&
          (Array.isArray(book.author)
            ? (book.author as string[]).some((author) => author.toLowerCase().includes(searchLower))
            : (book.author as string).toLowerCase().includes(searchLower));

        return hasTitle || hasISBN || hasAuthor;
      });
    }

    if (sortingOption === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "author") {
      filtered.sort((a, b) => {
        const authorA = Array.isArray(a.author) ? (a.author as string[])[0] : a.author;
        const authorB = Array.isArray(b.author) ? (b.author as string[])[0] : b.author;
        return authorA.localeCompare(authorB);
      });
    }

    setFilteredBooks([...filtered]);
  };

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity>
      <View style={styles.itemContainerWrapper}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.authorText}>Yazar: {item.author}</Text>
            <Text style={styles.genreText}>Tür: {item.genre}</Text>
            <Text style={styles.isbnText}>ISBN: {formatISBN(item.isbn)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAdminButtonPress = () => {
    navigation.navigate("Yonetici Paneli");
  };

  return (
    <View style={styles.container}>
      {currentUser?.role === "admin" && (
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminButtonPress}>
          <Text style={styles.adminButtonText}>Yönetici Paneli</Text>
        </TouchableOpacity>
      )}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Kitap Adı, ISBN, Yazar Ara"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <RNPickerSelect
          value={sortingOption}
          onValueChange={(value) => {
            setSortingOption(value as string);
            applyFilterAndSort();
          }}
          items={[
            { label: "Kitap Adına Göre Sırala", value: "title" },
            { label: "Yazar Adına Göre Sırala", value: "author" },
          ]}
          style={{ inputAndroid: styles.picker }}
          placeholder={{}}
        />
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    padding: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  picker: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemContainerWrapper: {
    width: "48%",
    margin: 8,
  },
  itemContainer: {
    backgroundColor: "#fff",
    width: "100%",
    minWidth: 225,
    maxWidth: 250,
    maxHeight: 275,
    minHeight: 275,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  coverImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    padding: 14,
    height: "100%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#18283b",
  },
  authorText: {
    fontSize: 14,
    color: "#555",
  },
  genreText: {
    fontSize: 14,
    color: "#555",
  },
  isbnText: {
    fontSize: 14,
    color: "#555",
  },
  adminButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: "120%",
    alignSelf: "center",
  },
  adminButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BookList;