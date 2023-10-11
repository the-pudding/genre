<script>
	import { activeSlide, slideHeights } from "$stores/misc.js";
	import Svg from "$components/Svg.svelte";
	import Ranks from "$components/Ranks.svelte";
	import Table from "$components/Table.svelte";
	import Line from "$components/Line.svelte";
	import Mountain from "$components/Mountain.svelte";
	import Bubbles from "$components/Bubbles.svelte";
	import Image from "$components/Image.svelte";
	import Columns from "$components/Columns.svelte";
	import Quote from "$components/Quote.svelte";
	import Video from "$components/Video.svelte";
	import Sample from "$components/Sample.svelte";
	import pointer from "$svg/pointer.svg";

	$: bleed =
		$activeSlide === 11 ||
		$activeSlide === 12 ||
		($activeSlide >= 14 && $activeSlide <= 17) ||
		$activeSlide === 20 ||
		$activeSlide === 21 ||
		$activeSlide === 24 ||
		$activeSlide === 26 ||
		$activeSlide === 27 ||
		$activeSlide === 29 ||
		($activeSlide >= 30 && $activeSlide <= 34);
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

	const ranks = [0, 1, 2, 3, 4, 5];
	const table = [18, 28];
	const svg = [6, 13, 23, 25, 31];
	const columns = [7];
	const line = [8, 9, 10];
	const mountain = [11, 12, 29];
	const bubbles = [14, 15, 16, 17, 20, 21, 24];
	const quote = [19];
	const video = [26, 27, 32, 33, 34];
	const image = [30, 36];
	const sample = [35];
</script>

<figure style={`--offset: ${offset}`} class:slide class:bleed>
	{#if ranks.includes($activeSlide)}
		<Ranks />
	{:else if table.includes($activeSlide)}
		<Table />
	{:else if svg.includes($activeSlide)}
		<Svg />
	{:else if columns.includes($activeSlide)}
		<Columns />
	{:else if line.includes($activeSlide)}
		<Line />
	{:else if mountain.includes($activeSlide)}
		<Mountain />
	{:else if bubbles.includes($activeSlide)}
		<Bubbles />
	{:else if image.includes($activeSlide)}
		<Image />
	{:else if quote.includes($activeSlide)}
		<Quote />
	{:else if video.includes($activeSlide)}
		<Video />
	{:else if sample.includes($activeSlide)}
		<Sample />
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
		height: calc(100% - 3rem - var(--offset));
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		width: 45rem;
		padding: 1rem;
		z-index: 100;
		margin-top: 1rem;
	}
	.bleed {
		overflow: visible;
		padding: 0;
	}
	.slide {
		transition: all var(--1s) ease-in-out;
		transition: top 0.5s ease-in-out;
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
