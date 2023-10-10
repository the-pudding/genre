<script>
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { onMount } from "svelte";

	export let id;

	const src = `assets/video/${id}.mp4`;
	const progressH = 20;

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
	<div
		class="progress"
		style:width={`${percentRemaining}%`}
		style:height={`${progressH}px`}
	/>
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

	<div class="controls" style:top={`${progressH + 10}px`}>
		<!-- <Button
			style={"font-size: 1.5rem"}
			onClick={onPlayPause}
			ariaLabel={playPauseText}
		>
			<Icon name={playing ? "pause" : "play"} />
		</Button> -->

		<div class="right">
			<Button style={"font-size: 1.5rem"} onClick={onMute} ariaLabel={muteText}>
				<Icon name={muted ? "volume-x" : "volume-2"} />
			</Button>

			<!-- <Button
				style={"font-size: 1.5rem; line-height: 1; margin-left: 4px; font-weight: 500"}
				onClick={onCaptions}
				ariaLabel={"Closed Captions"}>CC</Button
			> -->
		</div>
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
	}
	.controls {
		width: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
	}
	.right {
		display: flex;
		align-items: center;
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
