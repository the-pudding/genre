<script>
	export let color = "var(--color-audio)";
	export let hover = "var(--color-audio-dark)";
	export let onClick;
	export let ariaLabel;
	export let style;
</script>

<button
	on:click={onClick}
	aria-label={ariaLabel}
	style={`--color: ${color}; --hover: ${hover}; ${style}`}
>
	<slot />
</button>

<style>
	button {
		display: flex;
		background: var(--color);
		font-family: var(--sans);
		font-weight: 700;
		border-radius: 10px;
		padding: 0.7rem;
		pointer-events: auto;
		font-size: 1rem;
	}
	button:hover {
		background: var(--hover);
	}
</style>
