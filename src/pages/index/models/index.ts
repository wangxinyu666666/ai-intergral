/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:14:03
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 15:37:26
 */
import { indexApi } from '@/services/';
import Taro from '@tarojs/taro'

export const IndexActions = {
	update: 'index/updateState',
	getAllMall: 'index/getAllMall'
}
 
 
export default {
   namespace: 'index',
   state: {
	   userName: '王心雨',
	   userLevel: 4,
	   userIntergral: 1000,
	   current: 0,
	   ifLogin: Taro.getStorageSync('avatarUrl') || false,
	   currentBottonBar: 0,
	   goodsData: [], // 田螺商城的商品
	   pageIndex: 0,
	   totalPages: 0
   },
 
   effects: {
		*getAllMall({ payload }, { call, put, select }) {
			const res = yield call(indexApi.getAllMall, payload);
			if(res && res.content && res.content.length) {
				let { goodsData } = yield select((state: any) => state.index)
				let tmpData = goodsData.concat(res.content)
				yield put({
					type: 'updateState',
					payload: {
						goodsData: tmpData,
						pageIndex: payload.pageIndex,
						totalPages: res.totalPages || 0,
					}
				})
			}
			else {
				yield put({
					type: 'updateState',
					payload: {
						goodsData: [],
						pageIndex: 0,
						totalPages: 0
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
 