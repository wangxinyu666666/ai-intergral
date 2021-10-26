/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:08:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 00:04:50
 */
import * as Request from '@/utils/request'; 

export const indexApi = {
	getAllMall (data: any) {
		return Request
            .get(`/mall?page=${data.pageIndex}&size=${data.pageSize}`)
            .then((res) => {
                return res;
            });
	}, 
	getHomeBanner () {
		return Request
            .get(`homeBanner`)
            .then((res) => {
                return res;
            });
	},
	getUserInfo (data: any) {
		return Request
            .post(`/user`, data)
            .then((res) => {
                return res;
            });
	},
	updateIntergral (data: any) {
		return Request
            .put(`/user/${data.id}?integral=${data.integral}`)
            .then((res) => {
                return res;
            });
	}
};

import association from './association';
export const associationApi = association;

//export * as associationApi from './association';