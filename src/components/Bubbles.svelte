<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { scaleOrdinal, scaleBand } from "d3-scale";
	import CirclePack from "$components/layercake/todo/CirclePack.html.svelte";
	import ForceLayout from "$components/layercake/ForceLayout.svelte";

	// const data = [
	// 	{ category: "a", value: 0 },
	// 	{ category: "a", value: 2 },
	// 	{ category: "a", value: 5 },
	// 	{ category: "a", value: 23 },
	// 	{ category: "a", value: 12 },
	// 	{ category: "a", value: 50 },
	// 	{ category: "a", value: 7 },
	// 	{ category: "a", value: 20 },
	// 	{ category: "a", value: 15 },
	// 	{ category: "a", value: 30 },
	// 	{ category: "a", value: 2 },
	// 	{ category: "b", value: 10 },
	// 	{ category: "b", value: 12 },
	// 	{ category: "b", value: 15 },
	// 	{ category: "b", value: 3 },
	// 	{ category: "b", value: 2 },
	// 	{ category: "b", value: 5 },
	// 	{ category: "b", value: 35 },
	// 	{ category: "b", value: 2 },
	// 	{ category: "b", value: 5 },
	// 	{ category: "b", value: 20 },
	// 	{ category: "b", value: 12 },
	// 	{ category: "c", value: 5 },
	// 	{ category: "c", value: 4 },
	// 	{ category: "c", value: 2 },
	// 	{ category: "c", value: 32 },
	// 	{ category: "c", value: 25 },
	// 	{ category: "c", value: 40 },
	// 	{ category: "c", value: 35 },
	// 	{ category: "c", value: 25 },
	// 	{ category: "c", value: 19 },
	// 	{ category: "c", value: 25 },
	// 	{ category: "c", value: 10 }
	// ];
	const data = [
		{ fruit: "apples", value: 3240 },
		{ fruit: "bananas", value: 1920 },
		{ fruit: "cherries", value: 1290 },
		{ fruit: "oranges", value: 403 },
		{ fruit: "dates", value: 400 },
		{ fruit: "pears", value: 230 }
	];

	// const xKey = "category";
	// const rKey = "value";
	// const zKey = "category";

	// let groupBy = "true";

	// const seriesNameSet = new Set();
	// const seriesColors = ["#f0c", "#0cf", "#fc0"];

	// data.forEach((d) => {
	// 	seriesNameSet.add(d[zKey]);
	// });
	// const seriesNames = [...seriesNameSet];

	// let manyBodyStrength = 3;
	// let xStrength = 0.1;

	// *** CirclePack ***
	const idKey = "fruit";
	const valueKey = "value";

	data.forEach((d) => {
		d[valueKey] = +d[valueKey];
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 0, bottom: 20, left: 30 }} {data}>
		<Html>
			<CirclePack
				{idKey}
				{valueKey}
				fill="#ff00cc"
				stroke="#9f0080"
				textColor="#61004e"
				textStroke="#ffdbf8"
				textStrokeWidth={1}
				spacing={-10}
			/>
		</Html>
	</LayerCake>
</div>

<!-- <div class="chart-container">
	<LayerCake
		{data}
		x={xKey}
		r={rKey}
		z={zKey}
		xScale={scaleBand()}
		xDomain={seriesNames}
		rRange={[3, 12]}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
	>
		<Svg>
			<ForceLayout
				{manyBodyStrength}
				{xStrength}
				groupBy={JSON.parse(groupBy)}
				nodeStroke="#000"
			/>
		</Svg>
	</LayerCake>
</div> -->

<style>
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>
