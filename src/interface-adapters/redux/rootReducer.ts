import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import organizationReducer from './slices/organizationSlice';
import referralsReducer from './slices/referralsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  // Add other reducers here
});

export default rootReducer;