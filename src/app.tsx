/*
 * @Description: 入口文件
 * @Autor: Wangxinyu
 * @Date: 2021-10-13 22:23:43
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-22 17:26:16
 */
import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import dva from './utils/dva'
import models from './models/model'
import { Provider } from 'react-redux'
import BottomBar from '@/components/BottomBar'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.less';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();

function App (props) {

	return (
		<Provider store={store}>
			{props.children}
		</Provider>
	)
}

export default App;