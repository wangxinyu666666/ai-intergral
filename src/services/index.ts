/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 17:08:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 15:20:52
 */
import * as Request from '@/utils/request'; 

export const indexApi = {
	getAllMall (data: any) {
		return Request
            .get(`/mall?page=${data.pageIndex}&size=${data.pageSize}`)
            .then((res) => {
                return res;
            });
	}
};

import association from './association';
export const associationApi = association;

//export * as associationApi from './association';