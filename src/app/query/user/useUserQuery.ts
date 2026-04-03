import { useQuery } from '@tanstack/vue-query';
import { userKeys } from './user.keys';

export function useUserQuery() {
	return useQuery({
		...userKeys.user(1),
		//TODO: ПОДУМАТЬ НАД АПИ НЕТУ МЕТОДА ПОИСКА ЮЗЕРА ПО АЙДИ
	});
}
