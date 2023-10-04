<script>
	import { onMount } from "svelte";

	export let id;

	const src = `assets/video/${id}.mp4`;

	let videoEl;
	let currentTime = 0;
	let duration = 0;
	let autoplay = true;
	let paused = true;
	let loaded = false;
	let muted = false;
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
	<video
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		on:pause={onPause}
		on:play={onPlay}
		on:ended={onEnded}
	>
		<track kind="captions" src={`assets/captions/${id}.vtt`} srclang="en" />
	</video>

	<div class="progress" style:width={`${percentRemaining}%`} />
	<div class="controls">
		<button
			aria-label="Closed Captions"
			class="btn-captions"
			class:active={captioned}
			on:click={onCaptions}
			>CC
		</button>

		<button
			aria-label={muteText}
			class="btn-mute"
			class:active={!muted}
			on:click={onMute}
			>{muteText}
		</button>

		<button
			aria-label={playPauseText}
			class="btn-playpause"
			class:playing
			on:click={onPlayPause}
		>
			{playPauseText}
		</button>
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
	}
	.wrapper.loaded {
		visibility: visible;
	}
	video::cue {
		font-size: var(--18px);
		font-family: var(--sans);
	}
	.progress {
		background: var(--accent);
		height: 20px;
	}
</style>
