<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import Button from "$components/Button.svelte";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";

	export let id;
	export let label;
	export let slide;
	export let inline = false;

	let audioEl;
	let paused = true;
	let duration;
	let currentTime;

	$: mobile = $viewport.width < 600;
	$: onScreen = slide === $activeSlide;
	$: url = copy.artists[id];
	$: percentLeft =
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 100;
	$: padding = inline ? "4px 8px" : mobile ? "6px 12px" : "10px 14px";
	$: if (slide && !onScreen && audioEl) {
		audioEl.pause();
		currentTime = 0;
		paused = true;
	}

	const toggle = () => {
		if (paused) {
			const toPause = Array.from(document.querySelectorAll("audio")).filter(
				(d) => !d.paused
			);
			toPause.forEach((d) => d.pause());

			audioEl.play();
		} else audioEl.pause();
		paused = !paused;
	};
	const onEnded = () => {
		paused = true;
		currentTime = 0;
	};
</script>

<Button
	color={"#EFEFEF"}
	onClick={toggle}
	style={`position: relative; display: inline; padding: ${padding}; color: transparent`}
>
	<div class="ghost-words">{label.concat(" 🎵")}</div>
	<div
		class="progress"
		class:curved={percentLeft === 100 || $mq.reducedMotion}
		style:width={`${$mq.reducedMotion ? 100 : percentLeft}%`}
	/>
	<div class="words" style:padding>{label} 🎵</div>
</Button>

<audio
	src={url}
	preload="auto"
	bind:this={audioEl}
	bind:duration
	bind:currentTime
	on:ended={onEnded}
/>

<style>
	.progress {
		background: var(--color-audio);
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		border-radius: 10px 0 0 10px;
		transition: border-radius calc(var(--1s) * 2) ease-in-out;
		z-index: 1;
	}
	.progress.curved {
		transition: none;
		border-radius: 10px;
	}
	.progress:hover {
		background: var(--color-audio-dark);
	}
	.words {
		color: black;
		z-index: 2;
		top: 0;
		left: 0;
		position: absolute;
		white-space: nowrap;
		pointer-events: none;
	}

	@media (max-width: 600px) {
		.words,
		.ghost-words {
			font-size: 14px;
		}
	}
</style>
