<script>
	export let onClick;
	export let ariaLabel;
	export let style;
</script>

<button on:click={onClick} aria-label={ariaLabel} {style}>
	<slot />
</button>

<style>
	button {
		display: flex;
		background: var(--accent);
		font-family: var(--sans);
		font-weight: 700;
		border-radius: 10px;
		padding: 0.7rem;
		pointer-events: auto;
	}
	button:hover {
		background: var(--accent-dark);
	}
</style>
