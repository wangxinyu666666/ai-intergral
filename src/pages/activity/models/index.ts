/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-18 17:01:51
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-18 19:09:33
 */
import * as activityApi from '@/services/';

export const ActivityActions = {
	update: 'activity/updateState'
}

export default {
	namespace: 'activity',
	state: {
		current: 0,
		ifShowCode: false, // 是否显示二维码
	},

	effects: {
	},

	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
	},

};
