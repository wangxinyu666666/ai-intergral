/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-20 20:30:26
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 13:53:22
 */
import * as dailyApi from '@/services/';

export const DailyActions = {
	update: 'daily/updateState'
}

export default {
	namespace: 'daily',
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
