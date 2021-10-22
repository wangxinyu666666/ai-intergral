/*
 * @Description: 底部导航
 * @Autor: Wangxinyu
 * @Date: 2021-10-22 13:25:18
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 16:14:54
 */
import React from 'react';
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect, useDispatch } from 'react-redux'
import { AtTabBar } from 'taro-ui'
import { IndexActions } from '@/pages/index/models'
import Activity from '@/assets/images/activity.svg'
import Shop from '@/assets/images/shop.svg'
import Homepage from '@/assets/images/homepage.svg'
import Home from '@/assets/images/home.svg'
import ActivityActive from '@/assets/images/activity-active.svg'
import ShopActive from '@/assets/images/shop-active.svg'
import HomepageActive from '@/assets/images/homepage-active.svg'
import HomeActive from '@/assets/images/home-active.svg'

import './index.less'

const BottomBar = (props) => {

	const dispatch = useDispatch();
	const { currentBottonBar } = props.index;

	const toOtherPage = (index) => {
		dispatch({
			type: IndexActions.update,
			payload: { currentBottonBar: index }
		})
		switch (index) {
			case 0:
				Taro.navigateTo({
					url: '/pages/index/index'
				})
				break
			case 1:
				Taro.navigateTo({
					url: '/pages/activity/index'
				})
				break
			case 2:
				break
			case 3:
				break
		}
	}

	return (
		<View>
			<AtTabBar
				className="index-bar-fixed"
				fixed
				tabList={[
					{ title: '田螺首页', image: currentBottonBar === 0 ? HomeActive : Home},
					{ title: '我的活动', image: currentBottonBar === 1 ? ActivityActive : Activity},
					{ title: '购物车', image: currentBottonBar === 2 ? ShopActive : Shop },
					{ title: '个人中心', image: currentBottonBar === 3 ? HomepageActive : Homepage }
				]}
				onClick={toOtherPage}
				current={currentBottonBar}
			/>
		</View>
	)
}

export default connect(
	({
		index,
		loading
	}: {
		index: any,
		loading: any
	})=>({
		index,
		loading
}))(BottomBar)