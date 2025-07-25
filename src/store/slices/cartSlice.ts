import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@/store/store'; 
import { type CartItem } from '@/entities';

// Тип для состояния всей корзины
type CartState = {
  items: CartItem[];
};

// --- 2. Начальное состояние ---
const initialState: CartState = {
  items: [],
};

// --- 3. Создание Redux Slice ---
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление товара в корзину или увеличение его количества
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.id === newItem.id);
      existingItem ? existingItem.quantity += 1 : state.items.push({ ...newItem, quantity: newItem.quantity ? newItem.quantity : 1 });
    },
    // Удаление товара из корзины по ID
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Очистка всей корзины
    clearCart(state) {
      state.items = [];
    },
    // Увеличение количества товара по ID
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Уменьшение количества товара по ID и удаление, если количество <= 0
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((cartItem) => cartItem.id !== item.id);
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;

// --- 6. Селекторы (Selectors) ---

// Базовый селектор для получения состояния корзины из корневого стейта
// Указываем, что он принимает RootState и возвращает CartState
const selectCartState = (state: RootState): CartState => state.cart;

// 1. Селектор для получения всех товаров в корзине
// Зависит от selectCartState и возвращает массив CartItem
export const selectCartItems = createSelector(
  [selectCartState],
  (cartState): CartItem[] => cartState.items
);

// 2. Селектор для получения общего количества всех единиц товаров в корзине
// Зависит от selectCartItems и возвращает число
export const selectTotalQuantity = createSelector(
  [selectCartItems],
  (items: CartItem[]): number => items.reduce((total, item) => total + item.quantity, 0)
);

// 3. Селектор для получения общей стоимости всех товаров в корзине
// Зависит от selectCartItems и возвращает число
export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items: CartItem[]): number => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

// 4. Селектор для проверки, пуста ли корзина
// Зависит от selectCartItems и возвращает булево значение
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items: CartItem[]): boolean => items.length === 0
);

// 5. Селектор для получения конкретного товара по ID
// Принимает RootState и string (itemId)
// Возвращает CartItem или undefined
export const selectCartItemById = createSelector(
  [selectCartItems, (_state: RootState, itemId: string) => itemId], // Зависимости: массив товаров и itemId
  (items: CartItem[], itemId: string): CartItem | undefined => items.find((item) => item.id === itemId)
);