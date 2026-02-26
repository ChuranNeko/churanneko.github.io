import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 显示列数：2列或3列
	columns: 2,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "占位站点",
		imgurl: "https://api.iowen.cn/favicon/blog.crneko.top.png",
		desc: "Ciallo～(∠・ω< )⌒☆",
		siteurl: "https://blog.crneko.top",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "LeonXieの小窝",
		imgurl: "https://www.leonxie.cn/upload/avatar.jpg",
		desc: "保持热爱，奔赴山海！",
		siteurl: "https://www.leonxie.cn",
		tags: ["Blog"],
		weight: 9,
		enabled: true,
	},
	{
		title: "里世界",
		imgurl: "https://leenet.xyz/avatar.png",
		desc: "Welcome To The World Of Lee",
		siteurl: "https://leenet.xyz",
		tags: ["Blog"],
		weight: 8,
		enabled: true,
	},
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight);
};
