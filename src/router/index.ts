import UserChatList from '@/components/aside-tabs/UserChatList.vue';
import UserEditProfile from '@/components/aside-tabs/UserEditProfile.vue';
import UserGeneral from '@/components/aside-tabs/UserGeneral.vue';
import UserGeneralWallpaper from '@/components/aside-tabs/UserGeneralWallpaper.vue';
import UserNotify from '@/components/aside-tabs/UserNotify.vue';
import UserPrivacy from '@/components/aside-tabs/UserPrivacy.vue';
import UserPrivacyBlacklist from '@/components/aside-tabs/UserPrivacyBlacklist.vue';
import UserPrivacyChangeEmail from '@/components/aside-tabs/UserPrivacyChangeEmail.vue';
import UserSettings from '@/components/aside-tabs/UserSettings.vue';
import UserStorage from '@/components/aside-tabs/UserStorage.vue';
import { direction } from '@/composables/useRouteTransition';
import AsideLayout from '@/layouts/AsideLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoginUser from '@/views/auth/LoginUser.vue';
import RegisterUser from '@/views/auth/RegisterUser.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import type {
	GenerateRoutesMap,
	NamedRouteRecordRaw,
} from 'vue-routes-to-types';

const routes = [
	{
		path: '/auth',
		name: 'auth',
		redirect: () => ({ path: '/auth/login' }),
		component: AuthLayout,
		children: [
			{
				path: '/auth/login',
				component: LoginUser,
				name: 'auth:login',
			},
			{
				path: '/auth/register',
				component: RegisterUser,
				name: 'auth:register',
			},
		],
	},
	{
		path: '/',
		component: AsideLayout,
		name: 'main',
		meta: { auth: true },
		children: [
			{
				path: '/',
				component: UserChatList,
				name: 'chatlist',
				meta: { level: 1 },
			},
			{
				path: '/settings',
				component: UserSettings,
				name: 'settings',
				meta: { level: 2 },
			},
			{
				path: '/settings/profile-edit',
				component: UserEditProfile,
				name: 'settings:profile-edit',
				meta: { level: 3 },
			},
			{
				path: '/settings/notify',
				component: UserNotify,
				name: 'settings:notify',
				meta: { level: 3 },
			},
			{
				path: '/settings/storage',
				component: UserStorage,
				name: 'settings:storage',
				meta: { level: 3 },
			},
			{
				path: '/settings/privacy',
				component: UserPrivacy,
				name: 'settings:privacy',
				meta: { level: 3 },
			},
			{
				path: '/settings/general',
				component: UserGeneral,
				name: 'settings:general',
				meta: { level: 3 },
			},
			{
				path: '/settings/privacy/change-email',
				component: UserPrivacyChangeEmail,
				name: 'settings:privacy:change-email',
				meta: { level: 4 },
			},
			{
				path: '/settings/privacy/blacklist',
				component: UserPrivacyBlacklist,
				name: 'settings:privacy:blacklist',
				meta: { level: 4 },
			},
			{
				path: '/settings/general/wallpaper',
				component: UserGeneralWallpaper,
				name: 'settings:general:wallpaper',
				meta: { level: 4 },
			},
		],
	},
] as const satisfies NamedRouteRecordRaw[];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => {
	const toLevel = to.meta.level ?? 0;
	const fromLevel = from.meta.level ?? 0;

	direction.value = toLevel > fromLevel ? 'forward' : 'back';

	return true;
});

export type RoutesMap = GenerateRoutesMap<typeof routes>;

export default router;
