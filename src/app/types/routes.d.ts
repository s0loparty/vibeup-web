import type { RoutesMap } from '@/app/router';

declare module 'vue-router' {
	interface TypesConfig {
		RouteNamedMap: RoutesMap;
	}
}
