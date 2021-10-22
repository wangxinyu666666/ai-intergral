/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-19 16:08:40
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-19 17:57:05
 */
import * as paradiseApi from '@/services/';

export const ParadiseActions = {
	update: 'paradise/updateState'
}

export default {
	namespace: 'paradise',
	state: {
		current: 0,
	},

	effects: {
	},

	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
	},

};
