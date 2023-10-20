<script>
	import { LayerCake, Html } from "layercake";
	import ColumnStacked from "$components/layercake/ColumnStacked.svelte";
	import Legend from "$components/Ranks.Legend.svelte";
	import rank from "$data/rank.csv";
	import geo from "$data/geo.csv";
	import viewport from "$stores/viewport.js";

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

	$: console.log(data.map((d) => d.genres.filter((g) => !g.region)));

	$: mobile = $viewport.width < 600;
	$: rightPadding = mobile ? 150 : 180;
</script>

<div class="chart-container">
	<h4>Genres, ranked by streams on Spotify</h4>
	<Legend />
	<LayerCake
		padding={{ top: 0, right: rightPadding, bottom: 0, left: 30 }}
		xDomain={dates}
		{data}
	>
		<Html>
			<ColumnStacked />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		font-family: var(--sans);
		width: 100%;
		margin: 0 auto;
		height: 100%;
	}
</style>
