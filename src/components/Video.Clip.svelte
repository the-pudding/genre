<script>
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { onMount } from "svelte";
	import { videoMuted } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let id;
	export let overlay;

	const src = `assets/video/${id}.mp4`;
	const progressH = 10;

	let videoEl;
	let currentTime = 0;
	let duration = 0;
	let autoplay = true;
	let paused = true;
	let loaded = false;
	let captioned = true;

	const onMute = () => {
		$videoMuted = !$videoMuted;
		videoEl.muted = $videoMuted;
	};
	const onEnded = () => {
		currentTime = 0;
	};

	$: hasCC = id === "oates" || id === "tyler";
	$: muteText = $videoMuted ? "Unmute video" : "Mute video";
	$: percentComplete = (currentTime / duration) * 100;
	$: if (autoplay && currentTime === 0 && paused && loaded) {
		autoplay = false;
		videoEl.play();
	}

	onMount(() => {
		const request = new XMLHttpRequest();
		request.open("GET", src, true);

		request.responseType = "blob";
		request.onload = function () {
			if (this.status === 200) {
				const videoBlob = this.response;
				const videoUrl = URL.createObjectURL(videoBlob);
				videoEl.src = videoUrl;
				if (hasCC)
					videoEl.textTracks[0].mode = captioned ? "showing" : "hidden";
				loaded = true;
			}
		};
		request.send();
	});
</script>

<div class="wrapper" class:loaded>
	{#if !$mq.reducedMotion}
		<div
			class="progress"
			style:width={`${percentComplete}%`}
			style:height={`${progressH * 2}px`}
		/>
	{/if}
	<video
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		muted={$videoMuted}
		loop
		on:ended={onEnded}
		class:has-captions={hasCC}
	>
		{#if hasCC}
			<track kind="captions" src={`assets/captions/${id}.vtt`} srclang="en" />
		{/if}
	</video>

	{#if overlay}
		<div class="gradient">
			<p class="overlay">{@html overlay}</p>
		</div>
	{/if}

	<div class="controls" style:top={`${progressH + 10}px`}>
		<Button style={"font-size: 1.5rem"} onClick={onMute} ariaLabel={muteText}>
			<Icon name={$videoMuted ? "volume-x" : "volume-2"} />
		</Button>
	</div>
</div>

<style>
	.wrapper {
		visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: start;
		width: fit-content;
		margin: auto;
		position: relative;
	}
	.wrapper.loaded {
		visibility: visible;
	}
	video {
		width: 600px;
	}
	video.has-captions {
		width: 500px;
	}
	video::cue {
		font-size: 1.3rem;
		font-family: var(--sans);
	}
	.progress {
		background: var(--color-audio);
		position: absolute;
		top: -10px;
	}
	.controls {
		width: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
	}
	.gradient {
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 100%
		);
		width: 100%;
		height: 200px;
		position: absolute;
		bottom: 0;
	}
	.overlay {
		width: calc(100% - 2rem);
		margin: 0 auto;
		left: 0;
		right: 0;
		position: absolute;
		bottom: 1.5rem;
		text-align: center;
		color: white;
		font-family: var(--sans);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1;
		font-size: 18px;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}
	:global(.overlay span.sub) {
		font-size: 16px;
		display: block;
		margin-top: 0.5rem;
		line-height: 130%;
	}

	@media (max-width: 600px) {
		video {
			height: 100%;
			object-fit: cover;
			object-position: top;
		}
		.wrapper {
			height: 100%;
			background-color: black;
		}
	}
</style>
