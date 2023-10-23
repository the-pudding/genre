<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";
	import { timeFormat } from "d3-time-format";
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";

	const { data, padding } = getContext("LayerCake");

	const formatLabel = timeFormat("%Y");

	const colors = {
		"west/english": "#B79E8F",
		latin: "#BE3AA7",
		asia: "#BE3AA7",
		africa: "#BE3AA7"
	};
	$: annotation = copy.slides.find((d) => +d.slide === $activeSlide).annotation;
</script>

<div class="wrapper">
	{#each $data as { date, genres }, i}
		<div class="column">
			<span class="year">{formatLabel(new Date(date))}</span>
			{#each genres as genre, j}
				{@const color = colors[genre.region] || "var(--color-gray-700)"}
				{@const highlight = genre.genre === "filmi" && date === "8/9/2023"}
				<div
					class="block"
					style:background={color}
					style="margin-top:{genre.rank % 10 === 1 && genre.rank > 2
						? '7px'
						: ''};"
				>
					{#if highlight}
						<div class:highlight />
					{/if}
					{#if i === 0 && genre.rank % 10 === 1}
						<span class="tick">#{genre.rank}</span>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	<div class="annotation" style:max-width={`${$padding.right - 10}px`}>
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
		height: 3px;
		width: 100%;
		background: black;
		margin: 1px 0 0 0;
		position: relative;
	}
	.highlight {
		outline: 3px solid black;
		transform: 1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		z-index: 1000;
	}
	.tick {
		font-size: 12px;
		position: absolute;
		line-height: 1;
		top: 0;
		left: -0.7rem;
		font-weight: 500;
		transform: translate(-100%, -50%);
		text-align: right;
		width: 40px;
	}

	.tick:after {
		content: "";
		position: absolute;
		width: 5px;
		height: 1px;
		background: black;
		top: 50%;
		right: -2px;
		transform: translate(100%, 50%);
	}
	.annotation {
		color: black;
		position: absolute;
		right: 0;
		top: 40px;
		transform: translate(110%, 0);
		letter-spacing: -0.04em;
		line-height: 1.2;
	}
	.arrow {
		position: absolute;
		left: 0;
		top: 2px;
		transform: translate(-110%, 0);
	}

	.year {
		font-weight: 500;
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
