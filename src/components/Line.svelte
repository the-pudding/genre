<script>
	import { LayerCake, Svg, groupLonger, flatten } from "layercake";
	import rank from "$data/rank.csv";
	import MultiLine from "$components/layercake/todo/MultiLine.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { timeParse, timeFormat } from "d3-time-format";
	import { scaleOrdinal } from "d3-scale";

	const data = rank.map((d) => ({
		date: new Date(d.genre),
		edm: +d.edm,
		rb: +d["r&b"],
		reggaeton: +d.reggaeton,
		kpop: +d["k-pop"]
	}));

	const xKey = "date";
	const yKey = "value";
	const zKey = "genre";

	const dateParser = timeParse("%Y-%m-%d");
	const formatTickX = timeFormat("%Y");
	const allGenres = Object.keys(data[0]).filter((d) => d !== xKey);
	const colors = ["#ffe4b8", "#ffb3c0", "#ff7ac7", "#ff00cc"];

	const groupedData = groupLonger(data, allGenres, {
		groupTo: zKey,
		valueTo: yKey
	});

	$: console.log(groupedData);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		z={zKey}
		yDomain={[0, null]}
		zScale={scaleOrdinal()}
		zRange={colors}
		flatData={flatten(groupedData, "values")}
		data={groupedData}
	>
		<Svg>
			<AxisX gridlines={false} ticks={5} formatTick={formatTickX} />
			<AxisY />
			<MultiLine />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		font-family: var(--sans);
		width: 100%;
		height: 250px;
	}
</style>
