<script>
	const items = [
		{ color: "var(--color-gray-500)", label: "Global Genres" },
		{ color: "var(--color-primary", label: "English-speaking or European" },
		{
			color: "var(--color-secondary)",
			label: "Latin America, Africa, and Asia"
		}
	];
</script>

<div class="legend">
	{#each items as { color, label }}
		<div class="item">
			<div class="square" style:background={color} />
			<div class="label" style:color>{label}</div>
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
	}
	.item:last-child {
		margin-right: 0;
	}
	.square {
		height: 18px;
		width: 18px;
		margin-right: 0.3rem;
	}
</style>
