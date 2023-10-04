<script>
	import { getContext } from "svelte";
	import { timeFormat } from "d3-time-format";

	const { data } = getContext("LayerCake");

	const formatLabel = timeFormat("%Y");

	const colors = {
		"west/english": "var(--color-primary)",
		latin: "var(--color-secondary)",
		asia: "var(--color-secondary)",
		africa: "var(--color-secondary)"
	};
</script>

<div class="wrapper">
	{#each $data as { date, genres }, i}
		<div class="column">
			<strong>{formatLabel(new Date(date))}</strong>
			{#each genres as genre}
				{@const color = colors[genre.region] || "var(--color-gray-600)"}
				<div class="block" style:background={color}>
					{#if i === 0 && genre.rank % 10 === 1}
						<strong class="tick">#{genre.rank}</strong>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		font-family: var(--sans);
	}
	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 5rem;
		margin-right: 1rem;
	}
	.column:last-of-type {
		margin-right: 0;
	}
	.block {
		height: 2px;
		width: 100%;
		background: black;
		margin: 2px 0;
		position: relative;
	}
	.tick {
		font-size: 0.9rem;
		position: absolute;
		line-height: 1;
		top: 0;
		left: -2.5rem;
		transform: translate(0, -50%);
	}
</style>
