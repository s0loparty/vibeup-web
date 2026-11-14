/** Animates against the current scroll height as virtual rows are measured. */
export function animateScrollToBottom(
	viewport: HTMLElement,
	onFinish: () => void,
): () => void {
	const view = viewport.ownerDocument.defaultView;
	if (!view) {
		onFinish();
		return () => {};
	}

	let frame = 0;
	let startTime: number | undefined;
	let finished = false;
	const start = viewport.scrollTop;
	const duration = 450;

	function finish() {
		if (finished) return;
		finished = true;
		view!.cancelAnimationFrame(frame);
		viewport.removeEventListener('wheel', finish);
		viewport.removeEventListener('touchstart', finish);
		viewport.removeEventListener('pointerdown', finish);
		onFinish();
	}

	if (view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
		viewport.scrollTop = viewport.scrollHeight;
		finish();
		return finish;
	}

	function tick(time: number) {
		startTime ??= time;
		const progress = Math.min((time - startTime) / duration, 1);
		const eased = 1 - (1 - progress) ** 3;
		const target = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
		viewport.scrollTop = start + (target - start) * eased;
		if (progress < 1) frame = view!.requestAnimationFrame(tick);
		else finish();
	}

	viewport.addEventListener('wheel', finish, { passive: true });
	viewport.addEventListener('touchstart', finish, { passive: true });
	viewport.addEventListener('pointerdown', finish, { passive: true });
	frame = view.requestAnimationFrame(tick);
	return finish;
}
