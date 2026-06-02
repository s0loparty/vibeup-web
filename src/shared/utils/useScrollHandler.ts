export function useScrollHander() {
	function scrollHandler(
		event: Event,
		cb: () => void,
		hasNextPage: boolean,
		isFetchingNextPage: boolean,
		isError: boolean,
	) {
		const el = event.target as HTMLElement;

		if (!hasNextPage || isFetchingNextPage || !el || isError) return;

		const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		const threshold = el.clientHeight * 1.5;

		if (distanceFromBottom < threshold) {
			cb();
		}
	}

	return {
		scrollHandler,
	};
}
