<script>
	import { LayerCake, Svg, groupLonger, flatten } from "layercake";
	import rank from "$data/rank.csv";
	import MultiLine from "$components/layercake/todo/MultiLine.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { timeFormat } from "d3-time-format";
	import { scaleOrdinal } from "d3-scale";
	import { activeSlide } from "$stores/misc.js";
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
	const yDomain = tweened([1, 300], { duration: 1000 });
	const formatTickX = timeFormat("%Y");
	const formatTickY = (d) => `#${d}`;
	const allGenres = Object.keys(data[0]).filter((d) => d !== xKey);
	const colors = [
		"var(--color-secondary)",
		"var(--color-primary)",
		"var(--color-black)",
		"var(--color-black)"
	];

	const groupedData = groupLonger(data, allGenres, {
		groupTo: zKey,
		valueTo: yKey
	});

	$: $yDomain = $activeSlide === 8 ? [1, 300] : [1, 75];
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
			? ["reggaeton", "r&b", "edm"]
			: [];
</script>

<strong class="title">Genre's Popularity Ranking on Spotify</strong>
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

<div class="explode" class:visible={$activeSlide === 9}>🤯</div>

<style>
	.chart-container {
		margin-top: 1rem;
		font-family: var(--sans);
		width: 100%;
		height: 500px;
	}
	.explode {
		position: absolute;
		font-size: 5rem;
		top: 40%;
		left: 50%;
		opacity: 0;
		transform: translate(-50%, -50%) scale(0);
		transition: all var(--1s) ease-in-out;
	}
	.explode.visible {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1.5);
		transition: all var(--1s) var(--1s) ease-in-out;
		/* animation: shake calc(var(--1s) * 0.25) infinite; */
	}
	/* @keyframes shake {
		0% {
			transform: scale(1.5) translate(-50%, -50%) rotate(0deg);
		}
		25% {
			transform: scale(1.5) translate(-50%, -50%) rotate(-5deg);
		}
		75% {
			transform: scale(1.5) translate(-50%, -50%) rotate(5deg);
		}
		100% {
			transform: scale(1.5) translate(-50%, -50%) rotate(0deg);
		}
	} */
</style>
