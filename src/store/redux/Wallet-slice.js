// import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
// // Cookies.get('wallet') ? JSON.parse(Cookies.get('wallet')) : null;
// // Cookies.set('wallet', JSON.stringify(values), { expires: 7 });
// // Cookies.remove('wallet');

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState: { wallet: Cookies.get('wallet') ? JSON.parse(Cookies.get('wallet')) : null },
//   reducers: {
//     updateWallet: (state, action) => {
//       state.wallet = action.payload;
//     },
//   },
// });

// export const { updateWallet } = walletSlice.actions;
// export default walletSlice;

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import userService from '../../service/api/userService';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    loading: false,
    wallet: Cookies.get('wallet') || null,
    error: { message: null, status: null },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const walletAction = walletSlice.actions;
const { setLoading, setWallet, setError } = walletAction;

export default walletSlice.reducer;
export const getWalletData = () => {
  return async (dispatch) => {
    dispatch(
      setLoading({
        loading: true,
      })
    );
    const getWalletData = async () => {
      setLoading(true);
      await userService.getWallet();
    };
    try {
      const res = await getWalletData();
      // console.log(res, 'slice');
      dispatch(
        setLoading({
          loading: false,
        }),
        Cookies.set('wallet', JSON.stringify(res.data.data), { expires: 7 })
      );
    } catch (err) {
      dispatch(
        setLoading({
          loading: false,
        }),
        setError({
          message: err.message,
          status: 'error',
        })
      );
    }
  };
};
