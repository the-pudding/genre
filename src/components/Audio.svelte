<script>
	export let label;
	export let url;
	export let color = "#45FE9A";

	let audioEl;
	let paused = true;

	const toggle = () => {
		if (paused) audioEl.play();
		else audioEl.pause();
		paused = !paused;
	};
</script>

<button class="audio" style={`--color: ${color}`} on:click={toggle}
	>{label} 🎵</button
>
<audio src={url} preload="auto" bind:this={audioEl} />

<style>
	button {
		background: var(--color);
		padding: 4px;
		font-family: var(--sans);
		font-weight: bolder;
	}
	button:hover {
		background: #44c086;
	}
</style>
