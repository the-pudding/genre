<script>
	const items = [
		
		{ color: "var(--color-english)", label: "English-speaking or European Origin" },
		{
			color: "var(--color-nonenglish)",
			label: "Latin American, African, and Asian Origin"
		},
		{ color: "var(--color-gray-600)", label: "No Geographic Origin" },
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
		font-size: 14px;
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
	}

	@media (max-width: 600px) {
		.square {
			height: 10px;
			width: 10px;
		}
	}
</style>
