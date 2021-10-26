/*
 * @Description: 
 * @Autor: Wangxinyu
 * @Date: 2021-10-16 21:17:57
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 20:15:37
 */
import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab, AtTabBar } from 'taro-ui'
import { connect, useDispatch } from 'react-redux'
import { AssociationActions } from './models'
import game from '@/assets/images/game.svg'
import qiulei from '@/assets/images/qiulei.svg'
import jianshen from '@/assets/images/jianshen.svg'
import huaxue from '@/assets/images/huaxue.svg'
import './index.less'

const firstTabList = [
	{
		title: '游戏',
		image: game,
		children: [{ title: '剧本杀', code: '01' }, { title: '王者荣耀', code: '02' }, { title: '英雄联盟', code: '03' }] },
	{
		title: '球类',
		image: qiulei,
	}, 
	{
		title: '健身',
		image: jianshen,
	},
	{
		title: '滑雪',
		image: huaxue,
	}]
 
const Association = (props) =>{
	const dispatch = useDispatch();

	const { currentFirstLevel, currentSecondLevel, bannerData, associationData } = props.association;

	useEffect(() => {
		const firstTab = firstTabList[currentFirstLevel];
		const secondaryTab = firstTab.children;
		dispatch({
			type: AssociationActions.getBanner,
		})
		dispatch({
			type: AssociationActions.getAllCommunity,
			payload: {
				primaryClassify: firstTab.title,
				secondClassify: secondaryTab && secondaryTab[currentSecondLevel].title
			}
		})
	}, [])

	const handleClick = (index: number) => {
		dispatch({
			type: AssociationActions.update,
			payload: { currentFirstLevel: index }
		})
	}

	const handleSecondaryClick = (index: number) => {
		const firstTab = firstTabList[currentFirstLevel];
		const secondaryTab = firstTab.children;
		dispatch({
			type: AssociationActions.update,
			payload: { currentSecondLevel: index }
		})
		dispatch({
			type: AssociationActions.getAllCommunity,
			payload: {
				primaryClassify: firstTab.title,
				secondClassify: secondaryTab && secondaryTab[index].title
			}
		})
	}

	return (
		<View className="association-page">
			<View className="banner-wrap">
				<Swiper
					indicatorActiveColor={'#fff'}
					circular
					autoplay
				>
					{
						bannerData.map((banner, index) => (
							<SwiperItem key={index}>
								<Image className="banner-image" src={banner.image} />
							</SwiperItem>
						))
					}
					{/* <SwiperItem>
						<Image className="banner-image" src={Banner1} />
					</SwiperItem> */}
					{/* <SwiperItem>
						<Image className="banner-image" src={Banner2} />
					</SwiperItem>
					<SwiperItem>
						<Image className="banner-image" src={Banner3} />
					</SwiperItem> */}
				</Swiper>
			</View>
			<View className="association-classification-wrap">
				<AtTabBar
					tabList={firstTabList}
					onClick={handleClick}
					iconSize={44}
					color={'rgb(23, 27, 37)'}
					current={currentFirstLevel}
				/>
				{/* <AtTabs current={currentFirstLevel} tabList={firstTabList} onClick={handleClick}>
					{
						firstTabList.map((tab, index) => (
							<AtTabsPane current={currentFirstLevel} key={index} index={index}> */}
								<View className="second-classification-wrap">
									<AtTabs current={currentSecondLevel} tabList={firstTabList[currentFirstLevel].children || []} onClick={handleSecondaryClick} tabDirection='vertical' height='calc(100vh - 188px)' scroll>
									{
										firstTabList[currentFirstLevel].children ?
										firstTabList[currentFirstLevel].children?.map((secondaryTab, secondaryIndex) => (
											<AtTabsPane current={currentSecondLevel} key={secondaryIndex} index={secondaryIndex} tabDirection='vertical'>
												{
													associationData.map((association, index) => (
														<View className="activity-item common_display_flex" key={index}>
															<View className="activity-image">
																<Image src={association.image} />
															</View>
															<View className="activity-introduction">
																<View className="activity-title common_ellipsis">{association.title}</View>
																<View className="activity-info common_ellipsis">复古&nbsp;悬疑&nbsp;侦探</View>
																<View className="activity-price common_ellipsis">{association.price}积分</View>
																<View className="activity-info common_ellipsis">容量：{association.content}人间</View>
																<View className="activity-info common_ellipsis">时间：{association.time}</View>
																<View className="activity-info common_ellipsis">地点：{association.location}</View>
															</View>
														</View>
													))
												}
														{/* <View className="activity-item common_display_flex">
															<View className="activity-image">
																<Image src={Banner1} />
															</View>
															<View className="activity-introduction">
																<View className="activity-title common_ellipsis">想要成为SuperStar吗？哈哈哈哈哈哈哈</View>
																<View className="activity-info common_ellipsis">复古&nbsp;悬疑</View>
																<View className="activity-price common_ellipsis">78元/位</View>
																<View className="activity-info common_ellipsis">容量：8人间</View>
																<View className="activity-info common_ellipsis">时间：2021.02.14 20:00</View>
																<View className="activity-info common_ellipsis">地点：njk</View>
															</View>
														</View> */}
													
												{/* </AtTabs> */}
											</AtTabsPane>
										)) : null
									}
									</AtTabs>
								</View>
							{/* </AtTabsPane>
						))
					}
				</AtTabs> */}
				<AtFab className="association-fix-btn">加入社团</AtFab>
			</View>
		</View>
	)
}

export default connect(
	({
		association,
		loading
	}: {
		association: any,
		loading: any
	})=>({
		association,
		loading
}))(Association)
 