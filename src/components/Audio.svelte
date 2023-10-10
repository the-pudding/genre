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
		duration && currentTime ? ((duration - currentTime) / duration) * 100 : 0;

	const toggle = () => {
		audioEl.volume = 0.05;
		if (paused) audioEl.play();
		else audioEl.pause();
		paused = !paused;
	};
</script>

<Button
	onClick={toggle}
	style={`position: relative; display: inline; padding: 4px 6px; background: ${color}`}
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
