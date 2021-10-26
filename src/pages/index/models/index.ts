/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:14:03
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 00:20:23
 */
import { indexApi } from '@/services/';
import Taro from '@tarojs/taro'

export const IndexActions = {
	update: 'index/updateState',
	getAllMall: 'index/getAllMall',
	getHomeBanner: 'index/getHomeBanner',
	getUserInfo: 'index/getUserInfo',
	updateIntergral: 'index/updateIntergral'
}
 
 
export default {
   namespace: 'index',
   state: {
	   userName: Taro.getStorageSync('userName') || '',
	   userLevel: 3,
	   userIntergral: 0,
	   current: 0,
	   avatarUrl: Taro.getStorageSync('avatarUrl') || '', // 用户头像
	   ifLogin: Taro.getStorageSync('userName')  || false,
	   currentBottonBar: 0,
	   goodsData: [], // 田螺商城的商品
	   pageIndex: 0,
	   totalPages: 0,
	   homeBannerData: [], // 首页banner图
   },
 
   effects: {
		*getUserInfo({ payload }, { call, put }) {
			const res = yield call(indexApi.getUserInfo, payload);
			if(res) {
				Taro.setStorageSync('userId', res.id)
				yield put({
					type: 'updateState',
					payload: {
						userIntergral: res.integral || 0
					}
				})
			}
			else {
				Taro.removeStorageSync('userId')
			}
		},
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
		},
		*getHomeBanner({payload}, {call, put}) {
			const res = yield call(indexApi.getHomeBanner)
			if(res && res.length) {
				yield put({
					type: 'updateState',
					payload: {
						homeBannerData: res
					}
				})
			}
			else {
				yield put({
					type: 'updateState',
					payload: {
						homeBannerData: []
					}
				})
			}
		},
		*updateIntergral({ payload }, { call, put }) {
			const res = yield call(indexApi.updateIntergral, payload);
			if(res) {
				yield put({
					type: 'updateState',
					payload: {
						userIntergral: res.integral || 0
					}
				})
			}
		},
   },
 
   reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
   },
 
};
 