<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";

	export let genre;
	export let color;
	export let originTop;
	export let originLeft;
	export let tableOffset;
	export let destinationOffsetX = 0;
	export let destinationOffsetY = 0;

	let wordHeight = 0;
	let floorPadding = 15;
	let dropped = false;

	let x = 0;
	let y = 0;

	$: floorY =
		window.innerHeight -
		originTop -
		tableOffset -
		wordHeight -
		floorPadding -
		y;
	$: floorX = x;

	onMount(() => {
		dropped = true;
	});

	// TODO:
	// - i'd like to define a % for the x value and a y offset
	// - i'd like to define a rotation angle
	// - do we have to position inside the table? or is that fine? can we do %?
	// - do i have to make a fake table? maybe track those things on the real table
</script>

<div
	style:color
	style:left={`${originLeft}px`}
	style:top={`${originTop + 1}px`}
	style={`--floorX: ${floorX}px; --floorY: ${floorY}px`}
	bind:clientHeight={wordHeight}
	class:dropped
>
	{genre}
</div>

<style>
	div {
		font-family: var(--sans);
		position: absolute;
		font-weight: bolder;
		padding: 2px 0;
		transform: translate(0, 0);
		transition: transform 2s 1s cubic-bezier(0.83, 0, 0.17, 1);
	}
	div.dropped {
		transform: translate(var(--floorX), var(--floorY));
	}
</style>
