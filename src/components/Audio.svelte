<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import Button from "$components/Button.svelte";

	export let id;
	export let label;
	export let slide;
	export let inline = false;

	let audioEl;
	let paused = true;
	let duration;
	let currentTime;

	$: onScreen = slide === $activeSlide;
	$: url = copy.artists[id];
	$: percentLeft =
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 0;
	$: padding = inline ? "4px 8px" : "10px 14px";
	$: if (slide && !onScreen && audioEl) {
		audioEl.pause();
		currentTime = 0;
		paused = true;
	}

	const toggle = () => {
		audioEl.volume = 0.05;
		if (paused) {
			const toPause = Array.from(document.querySelectorAll("audio")).filter(
				(d) => !d.paused
			);
			toPause.forEach((d) => d.pause());

			audioEl.play();
		} else audioEl.pause();
		paused = !paused;
	};
</script>

<Button
	onClick={toggle}
	style={`position: relative; display: inline; padding: ${padding};`}
>
	{label} 🎵
</Button>

<audio
	src={url}
	preload="auto"
	bind:this={audioEl}
	bind:duration
	bind:currentTime
/>

<style>
</style>
