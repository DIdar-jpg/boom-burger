import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем localStorage по умолчанию
import cartReducer from './slices/cartSlice'; // Убедись, что путь правильный
import clietntReducer from './slices/clientSlice'; // Убедись, что путь правильный

// --- 1. Конфигурация persist ---
const persistConfig = {
  key: 'root', // Ключ для хранения в localStorage. Можно назвать как угодно.
  storage,    // Какой тип хранилища использовать. Здесь - localStorage.
  whitelist: ['cart'], // Какие редьюсеры (срезы) ты хочешь сохранять.
  // Если у тебя много срезов и ты хочешь сохранять только 'cart', раскомментируй эту строку.
  // blacklist: ['user'], // Какие редьюсеры ты НЕ хочешь сохранять.
};

// --- 2. Объединяем редьюсеры ---
// Используем combineReducers, чтобы скомбинировать все твои редьюсеры.
// Это важно, даже если у тебя пока только один 'cartReducer'.
const rootReducer = combineReducers({
  cart: cartReducer,
  client: clietntReducer,
  // Добавь здесь другие редьюсеры, если они у тебя есть
  // user: userReducer,
  // products: productsReducer,
});

// --- 3. Оборачиваем rootReducer в persistReducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- 4. Настраиваем Redux Store ---
export const store = configureStore({
  reducer: persistedReducer, // Используем обернутый редьюсер
  middleware: (getDefaultMiddleware) =>
    // Этот параметр позволяет тебе настроить промежуточное ПО (middleware) для Redux Store. Middleware — это функции, которые выполняются между отправкой экшена и его достижением редьюсера. Они используются для логирования, асинхронных операций, обработки ошибок и т.д.
    
    // (getDefaultMiddleware) => ...: configureStore по умолчанию включает некоторые полезные middleware (например, Redux Thunk). Функция getDefaultMiddleware предоставляет доступ к этому набору стандартных middleware. Ты можешь добавить свои middleware к ним или настроить стандартные.
    getDefaultMiddleware({
      // Игнорируем экшены redux-persist для сериализации, чтобы избежать ошибок
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// --- 5. Создаем "персистор" ---
// Этот объект будет управлять сохранением и восстановлением состояния.
export const persistor = persistStore(store);

// --- 6. Типизация RootState и AppDispatch ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;