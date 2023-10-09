<script>
	import { onMount } from "svelte";
	import Icon from "$components/helpers/Icon.svelte";

	export let id;

	const src = `assets/video/${id}.mp4`;

	let videoEl;
	let currentTime = 0;
	let duration = 0;
	let autoplay = true;
	let paused = true;
	let loaded = false;
	let muted = true;
	let captioned = true;

	const onCaptions = () => {
		captioned = !captioned;
		videoEl.textTracks[0].mode = captioned ? "showing" : "hidden";
	};
	const onMute = () => {
		muted = !muted;
		videoEl.muted = muted;
	};
	const onPause = () => {
		paused = true;
	};
	const onPlay = () => {
		paused = false;
	};
	const onPlayPause = () => {
		if (paused) videoEl.play();
		else videoEl.pause();
	};
	const onEnded = () => {
		currentTime = 0;
	};

	$: muteText = muted ? "Unmute video" : "Mute video";
	$: playPauseText = paused ? "Play video" : "Pause video";
	$: playing = !paused;
	$: percentRemaining = 100 - (currentTime / duration) * 100;
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
				videoEl.textTracks[0].mode = captioned ? "showing" : "hidden";
				loaded = true;
			}
		};
		request.send();
	});
</script>

<div class="wrapper" class:loaded>
	<div class="progress" style:width={`${100-percentRemaining}%`} />
	<video
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		muted
		loop
		on:pause={onPause}
		on:play={onPlay}
		on:ended={onEnded}
	>
		<track kind="captions" src={`assets/captions/${id}.vtt`} srclang="en" />
	</video>

	<button
		aria-label={playPauseText}
		class="btn-playpause"
		class:playing
		on:click={onPlayPause}
	>
		<Icon height={'32px'} name={playing ? "pause" : "play"} />
	</button>

	<div class="right">
		<button
			aria-label={muteText}
			class="btn-mute"
			class:active={!muted}
			on:click={onMute}
		>
			<Icon strokeWidth={'1.5px'} height={'32px'} name={muted ? "volume-x" : "volume-2"} />
		</button>

		<!-- <button
			aria-label="Closed Captions"
			class="btn-captions"
			class:active={captioned}
			on:click={onCaptions}
			>CC
		</button> -->
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
	video::cue {
		font-size: 1.3rem;
		font-family: var(--sans);
	}
	.progress {
		background: var(--accent);
		height: 10px;
	}
	button {
		font-size: 2rem;
		display: flex;
		background: var(--accent);
		border-radius: 10px;
	}
	.btn-playpause {
		position: absolute;
		top: calc(20px + 1rem);
		left: 1rem;
		width: 50px;
		height: 50px;
		font-size: 24px;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	button:hover {
		background: var(--accent-dark);
	}
	.right {
		position: absolute;
		top: calc(20px + 1rem);
		right: 1rem;
		display: flex;
	}
	.btn-captions {
		font-size: 1.5rem;
		font-family: var(--sans);
		font-weight: 500;
		margin-left: 0.5rem;
	}
	.btn-mute {
		font-size: 28px;
		width: 50px;
		height: 50px;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
