<script>
	import Button from "$components/Button.svelte";

	export let label;
	export let url;
	export let color;

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

<Button
	onClick={toggle}
	style={`position: relative; display: inline; padding: 4px 6px; background: ${color}`}
>
	<div class="label">{label}</div>
	<div class="note">🎵</div>
</Button>

<audio
	src={url}
	preload="auto"
	bind:this={audioEl}
	bind:duration
	bind:currentTime
/>

<style>
	div {
		display: inline-block;
	}
	.note {
		margin-left: 2px;
		padding-left: 4px;
		border-left: 2px solid black;
	}
</style>
