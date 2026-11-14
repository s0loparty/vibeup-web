import assert from 'node:assert/strict';
import { test } from 'node:test';
import { animateScrollToBottom } from '../src/shared/utils/animateScrollToBottom.ts';

function createViewport() {
	let frame = 0;
	const callbacks = new Map<number, FrameRequestCallback>();
	const listeners = new Map<string, EventListener>();
	const view = {
		requestAnimationFrame(callback: FrameRequestCallback) {
			callbacks.set(++frame, callback);
			return frame;
		},
		cancelAnimationFrame(id: number) {
			callbacks.delete(id);
		},
		matchMedia: () => ({ matches: false }),
	};
	const viewport = {
		ownerDocument: { defaultView: view },
		scrollTop: 0,
		scrollHeight: 1000,
		clientHeight: 200,
		addEventListener(type: string, listener: EventListener) {
			listeners.set(type, listener);
		},
		removeEventListener(type: string) {
			listeners.delete(type);
		},
	};
	return {
		viewport,
		tick(time: number) {
			const pending = [...callbacks.values()];
			callbacks.clear();
			pending.forEach((cb) => cb(time));
		},
		interrupt() {
			listeners.get('wheel')?.(new Event('wheel'));
		},
		pending: () => callbacks.size,
	};
}

test('smoothly reaches the bottom even when measured content height changes', () => {
	const animation = createViewport();
	let finished = 0;
	animateScrollToBottom(
		animation.viewport as unknown as HTMLElement,
		() => finished++,
	);
	animation.tick(0);
	animation.tick(225);
	assert.ok(
		animation.viewport.scrollTop > 0 && animation.viewport.scrollTop < 800,
	);
	animation.viewport.scrollHeight = 1200;
	animation.tick(450);
	assert.equal(animation.viewport.scrollTop, 1000);
	assert.equal(finished, 1);
	assert.equal(animation.pending(), 0);
});

test('user input cancels the animation and releases the scrolling lock', () => {
	const animation = createViewport();
	let finished = 0;
	animateScrollToBottom(
		animation.viewport as unknown as HTMLElement,
		() => finished++,
	);
	animation.tick(0);
	animation.tick(100);
	const position = animation.viewport.scrollTop;
	animation.interrupt();
	animation.tick(450);
	assert.equal(animation.viewport.scrollTop, position);
	assert.equal(finished, 1);
	assert.equal(animation.pending(), 0);
});
