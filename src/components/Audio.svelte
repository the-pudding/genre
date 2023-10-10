<script>
	export let label;
	export let url;
	export let color = "var(--accent)";

	let audioEl;
	let paused = true;
	let duration;
	let currentTime;

	$: percentLeft =
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 0;

	const toggle = () => {
		audioEl.volume = .05;
		if (paused) audioEl.play();
		else audioEl.pause();
		paused = !paused;
	};
</script>

<button class="audio" on:click={toggle}
	>{label} 🎵
	<div
		class="progress"
		style={`--color: ${color}`}
		style:width={`${100-percentLeft}%`}
	/>
	<div class="bg" />
</button>

<audio
	src={url}
	preload="auto"
	bind:this={audioEl}
	bind:duration
	bind:currentTime
/>

<style>
	button {
		background: none;
		padding: 4px;
		position: relative;
		z-index: 3;
		font-weight: bold;
		font-size: 16px;
	}
	.progress {
		position: absolute;
		border-radius: 2px;
		line-height: 1.15;
		top: 0;
		left: 0;
		background: var(--color);
		height: 100%;
		z-index: -1;
	}
	.bg {
		background: var(--color-gray-100);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
	}
</style>
