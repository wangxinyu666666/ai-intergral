/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-19 16:08:40
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 23:49:45
 */
import { associationApi } from '@/services/';

export const ParadiseActions = {
	update: 'paradise/updateState',
	getBanner: 'paradise/getBanner',
}

export default {
	namespace: 'paradise',
	state: {
		current: 0,
		bannerData: [],
	},

	effects: {
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
