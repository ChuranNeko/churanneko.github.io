import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "初然の博客",
	subtitle: "初然",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 200, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "https://t.alcy.cc/pc", // Relative to the /src directory. Relative to the /public directory if it starts with '/'. Used as background image
		position: "center", // Equivalent to background-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "初然のGithub", // Credit text to be displayed
			url: "https://github.com/ChuranNeko", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: true, // Enable background image
		src: "https://t.alcy.cc/pc", // Background image URL (supports HTTPS)
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 0.3, // Background opacity (0-1)
		cardOpacity: 0.85, // Card transparency when background is enabled (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
		   src: '/favicon/favicon.svg',    // Path of the favicon, relative to the /public directory
		   theme: 'dark',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		   // sizes: '30x30',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		}
	],
	analytics: {
		enable: true, // Enable analytics tracking
		type: "umami", // Type of analytics: 'umami', 'google', or 'custom'
		url: "https://cloud.umami.is", // Umami或自定义分析服务的URL
		siteId: "fb5e3c6e-e56a-4082-a231-5dd736010208", // Umami site ID
		// trackingId: "", // Google Analytics tracking ID (if using Google)
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/links/", // Internal links should not include the base path, as it is automatically added
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "赞助",
			url: "/support/", // Internal links should not include the base path, as it is automatically added
			external: false, // Show an external link icon and will open in a new tab
		},
		{
			name: "浏览统计",
			url: "https://cloud.umami.is/share/rjAmkgZnqnW6Ixb4", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "状态",
			url: "https://status.crneko.top/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "GitHub",
			url: "https://github.com/ChuranNeko/churanneko.github.io", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "初然",
	bio: "什么都想学一点,但又什么都不精通。",
	links: [
		//	{
			//	name: "Twitter",
			//	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
			//	You will need to install the corresponding icon set if it's not already included
			//	`pnpm add @iconify-json/<icon-set-name>`
			//	url: "https://twitter.com",
		// },
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/bilibiliUID443211409/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/saicaca/fuwari",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
