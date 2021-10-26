/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-16 21:17:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 19:59:58
 */
import { associationApi } from '@/services/';

export const AssociationActions = {
	update: 'association/updateState',
	getAllCommunity: 'association/getAllCommunity',
	getBanner: 'association/getBanner',
}
 
export default {
	namespace: 'association',
	state: {
		currentFirstLevel: 0,
		currentSecondLevel: 0,
		bannerData: [],
		associationData: []
	},
 
	effects: {
		*getAllCommunity({ payload }, { call, put }) {
			const res = yield call(associationApi.getAllCommunity, payload);
			if(res && res.length) {
				yield put({
					type: 'updateState',
					payload: {
						associationData: res
					}
				})
			}
			else {
				yield put({
					type: 'updateState',
					payload: {
						associationData: []
					}
				})
			}
		},
		*getBanner({payload}, {call, put}) {
			const res = yield call(associationApi.getBanner)
			if(res && res.length) {
				yield put({
					type: 'updateState',
					payload: {
						bannerData: res
					}
				})
			}
			else {
				yield put({
					type: 'updateState',
					payload: {
						bannerData: []
					}
				})
			}
		}
	},
 
   reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
   },
 
};
 