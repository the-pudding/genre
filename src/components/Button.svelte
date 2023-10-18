<script>
	import variables from "$data/variables.json";

	export let color = variables.color.audio;
	export let onClick;
	export let ariaLabel;
	export let style;

	const darkenColor = (color, amount) =>
		"#" +
		["1", "3", "5"]
			.map((i) =>
				Math.max(0, parseInt(color.substr(i, 2), 16) - amount)
					.toString(16)
					.padStart(2, "0")
			)
			.join("");
	const hoverColor = darkenColor(color, 20);
</script>

<button
	on:click={onClick}
	aria-label={ariaLabel}
	style={`--color: ${color}; --hover: ${hoverColor}; ${style}`}
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
