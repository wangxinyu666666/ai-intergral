/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-16 21:17:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 19:49:29
 */
import * as Request from '@/utils/request';

const associationApi = {
	getAllCommunity (data: any) {
		return Request
            .get(`/community/primaryClassify=${data.primaryClassify}/secondClassify=${data.secondClassify}`)
            .then((res) => {
                return res;
            });
	},
	getBanner () {
		return Request
            .get(`/communityBanner`)
            .then((res) => {
                return res;
            });
	},
}

export default associationApi;