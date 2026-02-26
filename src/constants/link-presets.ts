import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: i18n(I18nKey.home),
		url: "/",
	},
	[LinkPreset.About]: {
		name: i18n(I18nKey.about),
		url: "/about/",
	},
	[LinkPreset.Archive]: {
		name: i18n(I18nKey.archive),
		url: "/archive/",
	},
	[LinkPreset.Friends]: {
		name: i18n(I18nKey.friends),
		url: "/friends/",
	},
	[LinkPreset.Sponsor]: {
		name: i18n(I18nKey.sponsor),
		url: "/sponsor/",
	},
	[LinkPreset.Guestbook]: {
		name: i18n(I18nKey.guestbook),
		url: "/guestbook/",
	},
	[LinkPreset.Bangumi]: {
		name: i18n(I18nKey.bangumi),
		url: "/bangumi/",
	},
};
