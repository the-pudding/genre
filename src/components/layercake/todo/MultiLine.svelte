<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { onMount, getContext } from "svelte";
	import { draw, fade } from "svelte/transition";
	import _ from "lodash";

	const { data, xGet, yGet, zGet, z, y } = getContext("LayerCake");

	export let visible = [];

	let mounted = false;

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

		{#if isVisible && mounted}
			<path
				class="path-line"
				d={path(group.values)}
				stroke={$zGet(group)}
				in:draw={{ duration: 1500 }}
				out:fade={{ duration: 500 }}
			/>
			<circle
				cx={$xGet(_.first(group.values))}
				cy={$yGet(_.first(group.values))}
				r="5"
				fill={$zGet(group)}
			/>
			<circle
				cx={$xGet(_.last(group.values))}
				cy={$yGet(_.last(group.values))}
				r="5"
				fill={$zGet(group)}
			/>
			{#if includeNumber}
				<text
					x={$xGet(_.first(group.values)) + 10}
					y={$yGet(_.first(group.values))}
					class="label-rank"
					fill={$zGet(group)}>#{$y(_.first(group.values))}</text
				>
				<text
					x={$xGet(_.last(group.values)) + 10}
					y={$yGet(_.last(group.values))}
					class="label-rank"
					fill={$zGet(group)}>#{$y(_.last(group.values))}</text
				>
			{/if}
			<text
				x={$xGet(_.last(group.values)) + 10}
				y={includeNumber
					? $yGet(_.last(group.values)) + 24
					: $yGet(_.last(group.values))}
				class="label-genre"
				fill={$zGet(group)}>{$z(group)}</text
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
	.label-rank {
		font-size: 0.8rem;
		alignment-baseline: middle;
	}
	.label-genre {
		alignment-baseline: middle;
	}
</style>
