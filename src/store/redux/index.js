import { configureStore } from '@reduxjs/toolkit';
import WalletSlice from './Wallet-slice';

const store = configureStore({
  reducer: { wallet: WalletSlice.reducer },
});
export default store;
