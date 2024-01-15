import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Book {
  id: string;
  title: string;
  isbn: string;
  author: string[] | string;
  genre: string;
  coverImage: string;
}

export interface User {
  username: string;
  password: string;
  role: "user" | "admin";
}

interface AppState {
  books: Book[];
  users: User[];
  login: boolean;
  currentUser: User | null;
}

const initialState: AppState = {
  books: [],
  users: [],
  login: false,
  currentUser: null,
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      const bookIdToDelete = action.payload;
      state.books = state.books.filter((book) => book.id !== bookIdToDelete);
    },
    bookUpdate: (
      state,
      action: PayloadAction<{
        bookId: string;
        title: string;
        isbn: string;
        author: string[] | string;
        genre: string;
        coverImage: string;
      }>
    ) => {
      const { bookId, ...bookUpdateData } = action.payload;
      const bookIndex = state.books.findIndex((u) => u.id === bookId);

      if (bookIndex !== -1) {
        state.books = state.books.map((book, index) => {
          if (index === bookIndex) {
            return { ...book, ...bookUpdateData };
          } else {
            return book;
          }
        });
      } else {
        console.error(`Book with ID ${bookId} not found.`);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const usernameToDelete = action.payload;
      state.users = state.users.filter((user) => user.username !== usernameToDelete);
    },
    userUpdate: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        role: "user" | "admin";
        oldUsername: string;
      }>
    ) => {
      const { username, password, role, oldUsername } = action.payload;
      const bookIndex = state.users.findIndex(
        (u) => u.username === oldUsername
      );

      if (bookIndex !== -1) {
        state.users = state.users.map((user, index) => {
          if (index === bookIndex) {
            return { ...user, username, password, role };
          } else {
            return user;
          }
        });
      } else {
        console.error(`User with username ${oldUsername} not found.`);
      }
    },
    addBook: (state, action: PayloadAction<Book>) => {
      const newBook = { ...action.payload, id: generateUniqueId() };
      state.books.push(newBook);
    },
    loginUser: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.login = false;
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        state.login = true;
        state.currentUser = user;
      } else {
        state.login = false;
        state.currentUser = null;
      }
    },
    clearBooks: (state) => {
      state.books = [];
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appSlice.reducer);

export const {
  addBook,
  clearBooks,
  addUser,
  loginUser,
  clearUsers,
  deleteUser,
  userUpdate,
  deleteBook,
  bookUpdate,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectLogin = (state: RootState) => state.app.login;
export const selectCurrentUser = (state: RootState) => state.app.currentUser;
export const selectUsers = (state: RootState) => state.app.users;
export const selectBooks = (state: RootState) => state.app.books;