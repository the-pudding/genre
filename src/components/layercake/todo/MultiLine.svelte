<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { onMount, getContext } from "svelte";
	import { draw, fade } from "svelte/transition";
	import { activeSlide, dir } from "$stores/misc.js";
	import _ from "lodash";
	import mq from "$stores/mq.js";

	const { data, xGet, yGet, zGet, z, y } = getContext("LayerCake");

	export let visible = [];

	let mounted = false;

	$: animateDraw =
		!$mq.reducedMotion && (!$activeSlide || (10 && $dir !== "left"));
	$: path = (values) => {
		return (
			"M" +
			values
				.map((d) => {
					return $xGet(d) + "," + $yGet(d);
				})
				.join("L")
		);
	};

	onMount(() => {
		mounted = true;
	});
</script>

<g class="line-group">
	{#each $data as group}
		{@const isVisible = visible.includes($z(group))}
		{@const includeNumber = $z(group) === "k-pop" || $z(group) === "reggaeton"}
		{@const faded = $z(group) === "k-pop" && $activeSlide === 10}

		{#if isVisible && mounted}
			<path
				class="path-line"
				class:faded
				d={path(group.values)}
				stroke={$zGet(group)}
				in:draw={{ duration: animateDraw ? 1500 : 0 }}
				out:fade={{ duration: 500 }}
			/>
			<circle
				cx={$xGet(_.first(group.values))}
				cy={$yGet(_.first(group.values))}
				r="5"
				fill={$zGet(group)}
				class:faded
			/>
			<circle
				cx={$xGet(_.last(group.values))}
				cy={$yGet(_.last(group.values))}
				r="5"
				fill={$zGet(group)}
				class:faded
			/>
			{#if includeNumber}
				<text
					x={$xGet(_.first(group.values)) + 10}
					y={$yGet(_.first(group.values))}
					class="label-rank"
					class:faded
					fill={$zGet(group)}>#{$y(_.first(group.values))}</text
				>
				<text
					x={$xGet(_.last(group.values)) + 10}
					y={$yGet(_.last(group.values))}
					class="label-rank"
					class:faded
					fill={$zGet(group)}>#{$y(_.last(group.values))}</text
				>
			{/if}
			<text
				x={$xGet(_.last(group.values)) + 10}
				y={includeNumber
					? $yGet(_.last(group.values)) + 16
					: $yGet(_.last(group.values))}
				class="label-genre"
				class:faded
				fill={$zGet(group)}>{$z(group) === "k-pop" ? "K-pop" : $z(group)}</text
			>
		{/if}
	{/each}
</g>

<style>
	text {
		font-weight: bold;
	}
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3px;
	}
	path,
	circle,
	text {
		transition: opacity var(--1s), stroke var(--1s), fill var(--1s);
	}
	path.faded,
	text.faded {
		opacity: 0.3;
	}
	circle.faded {
		fill: #c5c5dc;
	}
	.label-rank {
		font-size: 14px;
		alignment-baseline: middle;
	}
	.label-genre {
		alignment-baseline: middle;
	}
</style>
