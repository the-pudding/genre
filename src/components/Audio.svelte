<script>
	export let label;
	export let url;
	export let color = "#45FE9A";

	let audioEl;
	let paused = true;
	let duration;
	let currentTime;

	$: percentLeft =
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 100;

	const toggle = () => {
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
		style:width={`${percentLeft}%`}
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
		transition: width 0.1s ease-in-out;
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
