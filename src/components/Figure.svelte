<script>
	import { activeSlide, slideHeights } from "$stores/misc.js";
	import Table from "$components/Table.svelte";
	import Line from "$components/Line.svelte";
	import Mountain from "$components/Mountain.svelte";
	import Bubbles from "$components/Bubbles.svelte";
	import Columns from "$components/Columns.svelte";
	import Quote from "$components/Quote.svelte";
	import Video from "$components/Video.svelte";
	import pointer from "$svg/pointer.svg";

	// TODO: use slideHeights to check if this will cause overlap with slide text or set breakpoints
	$: offset = $activeSlide === 0 ? "28%" : "18%";
	$: table = $activeSlide <= 5;
	$: columns = $activeSlide === 7;
	$: line = $activeSlide >= 8 && $activeSlide <= 10;
	$: mountain = $activeSlide === 11 || $activeSlide === 12;
	$: bubbles =
		($activeSlide >= 14 && $activeSlide <= 17) ||
		$activeSlide === 20 ||
		$activeSlide === 21 ||
		$activeSlide === 24;
	$: quote = $activeSlide === 19;
	$: video = $activeSlide === 26;
</script>

<figure style={`--offset: ${offset}`}>
	{#if table}
		<Table />
	{:else if columns}
		<Columns />
	{:else if line}
		<Line />
	{:else if mountain}
		<Mountain />
	{:else if bubbles}
		<Bubbles />
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
		padding: 1rem;
		transition: top var(--1s) ease-in-out;
		z-index: 100;
	}
	.tap {
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
