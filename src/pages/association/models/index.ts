/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-16 21:17:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 08:35:10
 */
import { associationApi } from '@/services/';

export const AssociationActions = {
	update: 'association/updateState',
	getAllCommunity: 'association/getAllCommunity'
}
 
export default {
	namespace: 'association',
	state: {
		currentFirstLevel: 0,
		currentSecondLevel: 0
	},
 
   effects: {
	*getAllCommunity({ payload }, { call, put }) {
		const res = yield call(associationApi.getAllCommunity, payload);
	}
   },
 
   reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
   },
 
};
 