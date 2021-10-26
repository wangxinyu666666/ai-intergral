/*
 * @Description: 会员等级
 * @Autor: Wangxinyu
 * @Date: 2021-10-22 20:58:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-23 11:38:44
 */
import React, { useEffect } from 'react';
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect, useDispatch } from 'react-redux'
import { LevelActions } from './models'
import Blank from '@/components/Blank'
import Privilege from '@/assets/images/privilege.png'
import LevelCard from '@/assets/images/level.png'

import './index.less';

const tabList = [{ title: '一级特权' }, { title: '二级特权' }, { title: '三级特权' }, { title: '四级特权' }]

const Level = (props) =>{
	const dispatch = useDispatch();
	const { current } = props.level;

	useEffect(() => {
		dispatch({
			type: LevelActions.update,
			payload: { current: 2 }
		})
	}, [])

	const handleClick = (index: number) => {
		dispatch({
			type: LevelActions.update,
			payload: { current: index }
		})
	}
	return (
		<View className="level-page">
			<Image className="level-card" src={LevelCard} />
			<AtTabs current={current} tabList={tabList} onClick={handleClick} tabDirection='vertical' height='calc(100vh - 220px)' scroll>
				<AtTabsPane current={current} index={0}  tabDirection='vertical'>
					<Blank />
				</AtTabsPane>
				<AtTabsPane current={current} index={1}  tabDirection='vertical'>
					<Blank />
				</AtTabsPane>
				<AtTabsPane current={current} index={2}  tabDirection='vertical'>
					<View className="level-wrap">
						<Image src={Privilege} onClick={() => Taro.showToast({title: '暂未开放特权详情功能～', icon: 'none'})}/>
					</View>
				</AtTabsPane>
				<AtTabsPane current={current} index={3}  tabDirection='vertical'>
					<Blank />
				</AtTabsPane>
			</AtTabs>
		</View>
	)
}

export default connect(
	({
		level,
		loading
	}: {
		level: any,
		loading: any
	})=>({
		level,
		loading
}))(Level)
