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
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 100;
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
	{label} 🎵
	<div
		class="progress"
		class:curved={percentLeft === 100}
		style:width={`${percentLeft}%`}
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
		background: var(--color-accent);
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
		background: #31ea86;
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
</style>
