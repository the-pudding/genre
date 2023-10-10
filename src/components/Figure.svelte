<script>
	import { activeSlide, slideHeights } from "$stores/misc.js";
	import Svg from "$components/Svg.svelte";
	import Ranks from "$components/Ranks.svelte";
	import Table from "$components/Table.svelte";
	import Line from "$components/Line.svelte";
	import Mountain from "$components/Mountain.svelte";
	import Bubbles from "$components/Bubbles.svelte";
	import Explore from "$components/Explore.svelte";
	import Columns from "$components/Columns.svelte";
	import Quote from "$components/Quote.svelte";
	import Video from "$components/Video.svelte";
	import pointer from "$svg/pointer.svg";

	$: offset =
		$activeSlide === 0
			? "28%"
			: $activeSlide === 1 || $activeSlide === 2 || $activeSlide === 3
			? "18%"
			: line
			? "18%"
			: $activeSlide === 16 || $activeSlide === 17
			? "20%"
			: `${$slideHeights[$activeSlide] + 50}px`;
	$: slide = $activeSlide === 0 || $activeSlide === 1;
	$: ranks = $activeSlide <= 5;
	$: table = $activeSlide === 18 || $activeSlide === 28;
	$: svg =
		$activeSlide === 6 ||
		$activeSlide === 13 ||
		$activeSlide === 23 ||
		$activeSlide === 25;
	$: explore = $activeSlide === 22;
	$: columns = $activeSlide === 7;
	$: line = $activeSlide >= 8 && $activeSlide <= 10;
	$: mountain = $activeSlide === 11 || $activeSlide === 12;
	$: bubbles =
		($activeSlide >= 14 && $activeSlide <= 17) ||
		$activeSlide === 20 ||
		$activeSlide === 21 ||
		$activeSlide === 24;
	$: quote = $activeSlide === 19;
	$: video = $activeSlide === 26 || $activeSlide === 27;
</script>

<figure style={`--offset: ${offset}`} class:slide>
	{#if ranks}
		<Ranks />
	{:else if table}
		<Table />
	{:else if svg}
		<Svg />
	{:else if columns}
		<Columns />
	{:else if line}
		<Line />
	{:else if mountain}
		<Mountain />
	{:else if bubbles}
		<Bubbles />
	{:else if explore}
		<Explore />
	{:else if quote}
		<Quote />
	{:else if video}
		<Video />
	{/if}

	<div class="tap" class:visible={$activeSlide === 0}>
		<strong>Tap to continue</strong>
		{@html pointer}
	</div>
</figure>

<style>
	figure {
		position: absolute;
		top: calc(var(--offset) + 2rem);
		height: calc(100% - 2rem - var(--offset));
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		width: 45rem;
		padding: 0rem;
		z-index: 100;
	}
	.slide {
		transition: all var(--1s) ease-in-out;
		transition: top .5s ease-in-out;
	}
	.tap {
		font-size: 1.3rem;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		opacity: 0;
	}
	.visible {
		opacity: 1;
	}
</style>
