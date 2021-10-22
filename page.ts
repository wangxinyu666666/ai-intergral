/*
 * @Description: 快速新建文件
 * @Autor: Wangxinyu
 * @Date: 2021-10-15 16:24:48
 * @LastEditors: Wangxinyu
 * @LastEditTime: 2021-10-20 20:30:07
 */
/**
 * pages模版快速生成脚本,执行命令 npm run temp `文件名`
 */
 const fs = require('fs');
 const dirName = process.argv[2];
 if (!dirName) {
   console.log('文件夹名称不能为空！');
   console.log('示例：npm run temp test');
   process.exit(0);
 }
 // 页面模版
 const indexTep = `import React from 'react';
import { View,Text } from '@tarojs/components';
import { connect, useDispatch } from 'react-redux'
import './index.less';

const ${titleCase(dirName)} = (props) =>{
	return (
		<View className="${dirName}-page">
			<Text>正如你所见这是你的${dirName}页面</Text>
		</View>
	)
}

export default connect(
	({
		${dirName},
		loading
	}: {
		${dirName}: any,
		loading: any
	})=>({
		${dirName},
		loading
}))(${titleCase(dirName)})
`;
// less文件模版
const lessTep = `

.${dirName}-page {
}
`;
 
// model文件模版
const modelTep = `import * as ${dirName}Api from '@/services/';

export const ${dirName}Actions = {
	update: '${dirName}/updateState'
}

export default {
	namespace: '${dirName}',
	state: {
	},

	effects: {
	},

	reducers: {
		updateState(state, { payload }) {
			return { ...state, ...payload };
		},
	},

};
`;
 
 
 // service页面模版
 const serviceTep = `import * as Request from '@/utils/request'; `;
 fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
 process.chdir(`./src/pages/${dirName}`); // cd $1
 fs.writeFileSync('index.tsx', indexTep);
 fs.writeFileSync('index.less', lessTep);

 fs.mkdirSync(`models`);
 fs.writeFileSync('./models/index.ts', modelTep);

 process.chdir(`../../services`); // cd $1
 fs.writeFileSync(`${dirName}.ts`, serviceTep);
 
 console.log(`模版${dirName}已创建,请手动按照格式增加到./src/models`);
 
 function titleCase(str) {
   const array = str.toLowerCase().split(' ');
   for (let i = 0; i < array.length; i++) {
	 array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
   }
   const string = array.join(' ');
   return string;
 }
 process.exit(0);