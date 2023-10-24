<script>
	import { activeSlide } from "$stores/misc.js";

	const items = [
		{
			color: "var(--color-english)",
			label: "Genre&rsquo;s artists primarily from European countries, US/Canada"
		},
		{
			color: "var(--color-nonenglish)",
			label: "from Latin American, African, and Asian countries"
		},
		{ color: "var(--color-gray-700)", label: "Both" }
	];

	$: type = $activeSlide === 5 ? "table" : "bars";
	$: displayItems = type === "table" ? items.slice(0, 0) : items;
	$: console.log($activeSlide)
</script>

<div class="legend">
	{#each displayItems as { color, label }}
		<div class="item">
			<div
				class="square"
				style:background={type === "bars" && color === "var(--color-english)"
					? "#B79E8F"
					: color}
			/>
			<div class="label" style:color>{@html label}</div>
		</div>
	{/each}
</div>

<style>
	.legend {
		display: flex;
		flex-wrap: wrap;
		margin: 0.5rem 0;
		font-family: var(--sans);
	}
	.item {
		display: flex;
		align-items: center;
		margin-right: 1.25rem;
		font-size: 14px;
		margin-bottom: 5px;

	}
	.item:last-child {
		margin-right: 0;
	}
	.square {
		height: 14px;
		width: 14px;
		margin-right: 0.3rem;
	}
	.label {
		font-weight: 600;
		line-height: 1.2;
	}

	@media (max-width: 600px) {
		.square {
			height: 10px;
			width: 10px;
		}
	}
</style>
