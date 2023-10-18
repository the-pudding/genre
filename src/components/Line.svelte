<script>
	import { LayerCake, Svg, groupLonger, flatten } from "layercake";
	import ExplodingHead from "$components/Line.ExplodingHead.svelte";
	import rank from "$data/rank.csv";
	import MultiLine from "$components/layercake/todo/MultiLine.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { timeFormat } from "d3-time-format";
	import { scaleOrdinal } from "d3-scale";
	import { activeSlide, dir } from "$stores/misc.js";
	import { tweened } from "svelte/motion";
	import _ from "lodash";

	const data = rank.map((d) => ({
		date: new Date(d.genre),
		"k-pop": +d["k-pop"],
		reggaeton: +d.reggaeton,
		edm: +d.edm,
		"r&b": +d["r&b"]
	}));

	const xKey = "date";
	const yKey = "value";
	const zKey = "genre";
	const yDomain = tweened($dir === "right" ? [1, 300] : [1, 75], {
		duration: 1000
	});
	const formatTickX = timeFormat("%Y");
	const formatTickY = (d) => `#${d}`;
	const allGenres = Object.keys(data[0]).filter((d) => d !== xKey);
	const colors = [
		"var(--color-emphasis)",
		"var(--color-emphasis)",
		"var(--color-gray-600)",
		"var(--color-gray-600)"
	];

	const groupedData = groupLonger(data, allGenres, {
		groupTo: zKey,
		valueTo: yKey
	});

	$: $yDomain = $activeSlide <= 8 ? [1, 300] : [1, 75];
	$: yTicks =
		$activeSlide === 8
			? [1, ..._.range(50, 350, 50)]
			: [1, ..._.range(25, 100, 25)];
	$: visible =
		$activeSlide === 8
			? ["k-pop"]
			: $activeSlide === 9
			? ["k-pop", "r&b", "edm"]
			: $activeSlide === 10
			? ["k-pop", "reggaeton", "r&b", "edm"]
			: [];
</script>

<h4>Genres, ranked by streams on Spotify</h4>
<div class="chart-container">
	<LayerCake
		padding={{ top: 20, right: 95, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		z={zKey}
		yDomain={$yDomain}
		yReverse={false}
		zScale={scaleOrdinal()}
		zRange={colors}
		flatData={flatten(groupedData, "values")}
		data={groupedData}
		xNice={true}
	>
		<Svg>
			<AxisX gridlines={false} ticks={3} formatTick={formatTickX} />
			<AxisY formatTick={formatTickY} ticks={yTicks} />
			<MultiLine {visible} />
		</Svg>
	</LayerCake>
</div>

{#if $activeSlide === 9}
	{#each _.range(3) as i}
		{@const positions = [
			[10, 20, 10],
			[50, 60, -10],
			[70, 10, 10]
		]}
		<ExplodingHead
			x={positions[i][0]}
			y={positions[i][1]}
			deg={positions[i][2]}
		/>
	{/each}
{/if}

<style>
	h4 {
		margin: 0 auto;
		width: 100%;
		display: block;
	}
	.chart-container {
		margin: 0 auto;
		margin-top: 1rem;
		font-family: var(--sans);
		width: 100%;
		height: 85%;
	}
</style>
