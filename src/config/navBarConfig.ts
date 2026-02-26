import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";

// 导航栏链接配置
const links: (NavBarLink | LinkPreset)[] = [
	// 主页
	LinkPreset.Home,

	// 归档
	LinkPreset.Archive,

	// 关于
	LinkPreset.About,

	// 友链
	{
		name: "友链",
		url: "/friends/",
		external: false,
	},

	// 赞助
	{
		name: "赞助",
		url: "/sponsor/",
		external: false,
	},

	// 链接（外部链接子菜单）
	{
		name: "链接",
		url: "",
		external: false,
		children: [
			{
				name: "Umami 统计",
				url: "https://cloud.umami.is/share/rjAmkgZnqnW6Ixb4",
				external: true,
				icon: "material-symbols:bar-chart",
			},
			{
				name: "状态",
				url: "https://status.crneko.top/",
				external: true,
				icon: "material-symbols:check-circle",
			},
			{
				name: "Bilibili",
				url: "http://space.bilibili.com/443211409",
				external: true,
				icon: "fa7-brands:bilibili",
			},
			{
				name: "直播间",
				url: "https://live.bilibili.com/22827488",
				external: true,
				icon: "material-symbols:live-tv",
			},
			{
				name: "GitHub",
				url: "https://github.com/ChuranNeko",
				external: true,
				icon: "fa7-brands:github",
			},
		],
	},
];

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = { links };
