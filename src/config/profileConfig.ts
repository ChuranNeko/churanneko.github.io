import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.png",

	// 名字
	name: "初然",

	// 个人签名
	bio: "什么都想学一点，但又什么都不精通。",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问 https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "http://space.bilibili.com/443211409",
			showName: false,
		},
		{
			name: "抖音",
			icon: "ri:tiktok-fill",
			url: "https://www.douyin.com/user/MS4wLjABAAAAYg2_rbV7wda0T-zgdj6vP6TcgFU-j1_ocwzt30mU4ow",
			showName: false,
		},
		{
			name: "Steam",
			icon: "fa7-brands:steam",
			url: "https://steamcommunity.com/id/bilibiliUID443211409/",
			showName: false,
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/ChuranNeko",
			showName: false,
		},
	],
};
