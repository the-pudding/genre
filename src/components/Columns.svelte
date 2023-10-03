<script>
	import { LayerCake, Html } from "layercake";
	import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
	import Legend from "$components/Table.Legend.svelte";
	import rank from "$data/rank.csv";
	import geo from "$data/geo.csv";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";

	const dates = ["4/23/2016", "3/30/2019", "6/15/2021", "8/9/2023"];
	const data = rank
		.filter((d) => dates.includes(d.genre))
		.reduce((acc, current) => {
			const genres = Object.keys(current)
				.filter((d) => d !== "genre" && current[d] && +current[d] > 0)
				.sort((a, b) => +current[a] - +current[b])
				.slice(0, 100)
				.map((d) => ({
					genre: d,
					rank: +current[d],
					region: geo.find((g) => g.genre === d)?.region
				}));
			return [
				...acc,
				{
					date: current.genre,
					genres
				}
			];
		}, []);
	const yTicks = [1, 11, 21, 31];

	$: annotation = copy.slides.find(
		(d) => +d.slide === $activeSlide + 1
	).annotation;
</script>

<div class="chart-container">
	<strong>Genre's Popularity Ranking on Spotify</strong>
	<Legend />
	<LayerCake
		padding={{ top: 0, right: 200, bottom: 0, left: 50 }}
		xDomain={dates}
		{data}
	>
		<Html>
			<ColumnStacked />
		</Html>

		<div class="annotation">
			{annotation}
		</div>
	</LayerCake>
</div>

<style>
	.chart-container {
		font-family: var(--sans);
		width: 100%;
		height: 100%;
	}
	.annotation {
		position: absolute;
		top: 1rem;
		right: 0;
		max-width: 10rem;
	}
</style>
