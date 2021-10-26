/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-22 20:58:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 23:50:58
 */
import { indexApi } from '@/services/';

export const LevelActions = {
	update: 'level/updateState',
	updateIntergral: 'level/updateIntergral'
}

export default {
	namespace: 'level',
	state: {
		current: 0
	},

	effects: {
	},

	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
	},

};
