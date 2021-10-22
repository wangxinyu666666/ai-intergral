import * as homePageApi from '@/services/';
 
 export default {
   namespace: 'homePage',
   state: {
   },
 
   effects: {
   },
 
   reducers: {
	 save(state, { payload }) {
	   return { ...state, ...payload };
	 },
   },
 
 };
 