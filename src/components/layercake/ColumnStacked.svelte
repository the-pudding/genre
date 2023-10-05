<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";
	import { timeFormat } from "d3-time-format";
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";

	const { data, padding } = getContext("LayerCake");

	const formatLabel = timeFormat("%Y");

	const colors = {
		"west/english": "var(--color-primary)",
		latin: "var(--color-secondary)",
		asia: "var(--color-secondary)",
		africa: "var(--color-secondary)"
	};
	$: annotation = copy.slides.find(
		(d) => +d.slide === $activeSlide + 1
	).annotation;

	$: console.log($data);
</script>

<div class="wrapper">
	{#each $data as { date, genres }, i}
		<div class="column">
			<strong class="year">{formatLabel(new Date(date))}</strong>
			{#each genres as genre}
				{@const color = colors[genre.region] || "var(--color-gray-600)"}
				{@const highlight = genre.genre === "filmi" && date === "8/9/2023"}
				<div class="block" style:background={color} class:highlight>
					{#if i === 0 && genre.rank % 10 === 1}
						<strong class="tick">#{genre.rank}</strong>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	<div class="annotation" style={`max-width: ${$padding.right - 10}px`}>
		<span class="arrow"><Icon name="arrow-left" /></span>
		{annotation}
	</div>
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
		margin-right: 1rem;
	}
	.column:last-of-type {
		margin-right: 0;
	}
	.block {
		height: 4px;
		width: 100%;
		background: black;
		margin: 1px 0;
		position: relative;
	}
	.highlight {
		outline: 3px solid black;
		transform: scale(1.05);
	}
	.tick {
		font-size: 0.9rem;
		position: absolute;
		line-height: 1;
		top: 0;
		left: -2rem;
	}
	.annotation {
		color: black;
		position: absolute;
		right: 0;
		top: 1.5rem;
		transform: translate(110%, 0);
	}
	.arrow {
		position: absolute;
		left: 0;
		top: 2px;
		transform: translate(-110%, 0);
	}

	@media (max-width: 600px) {
		.year {
			font-size: 14px;
		}
		.column {
			margin-right: 4px;
		}
		.annotation {
			font-size: 15px;
		}
	}
</style>
