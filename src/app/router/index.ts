import { direction } from '@/app/composables/useRouteTransition';
import AuthLayout from '@/app/layouts/AuthLayout.vue';
import LoginUser from '@/app/pages/auth/LoginUser.vue';
import RegisterUser from '@/app/pages/auth/RegisterUser.vue';
import asideRoutes from '@/modules/aside/routes';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import type {
	GenerateRoutesMap,
	NamedRouteRecordRaw,
} from 'vue-routes-to-types';
import { useAuthStore } from '../stores/useAuthStore';

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
	...asideRoutes,
] as const satisfies NamedRouteRecordRaw[];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => {
	const { isAuthenticated } = storeToRefs(useAuthStore());

	const toLevel = to.meta.level ?? 0;
	const fromLevel = from.meta.level ?? 0;

	// Если аутентифицирован и идёт на auth страницы — редирект на main
	if (
		isAuthenticated.value &&
		(to.name === 'auth:login' || to.name === 'auth:register')
	) {
		return { name: 'main' };
	}

	// Если не аутентифицирован и идёт на защищённый маршрут — редирект на login
	const requiresAuth = to.matched.some((record) => record.meta.auth === true);
	if (!isAuthenticated.value && requiresAuth) {
		return { name: 'auth:login' };
	}

	direction.value = toLevel > fromLevel ? 'forward' : 'back';

	return true;
});

export type RoutesMap = GenerateRoutesMap<typeof routes>;

export default router;
