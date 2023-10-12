<script>
	import { activeSlide, dir } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";
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
	import Icon from "$components/helpers/Icon.svelte";
	import { onMount, tick } from "svelte";
	import _ from "lodash";

	let mounted = false;
	let offset;

	const bleed = [
		11, 12, 14, 15, 16, 17, 20, 21, 23, 25, 26, 28, 29, 30, 31, 32, 33
	];
	const ranks = [0, 1, 2, 3, 4, 5];
	const table = [18, 27];
	const svg = [6, 13, 22, 24, 30];
	const columns = [7];
	const line = [8, 9, 10];
	const mountain = [11, 12, 28];
	const bubbles = [14, 15, 16, 17, 20, 21, 23];
	const quote = [19];
	const video = [25, 26, 31, 32, 33];
	const image = [29, 35];
	const sample = [34];

	$: $activeSlide, $viewport.width, getSlideHeight();
	$: previousSlide =
		$activeSlide === 0
			? undefined
			: $dir === "left"
			? $activeSlide + 1
			: $activeSlide - 1;

	const lookup = {
		ranks: ranks,
		table: table,
		svg: svg,
		columns: columns,
		line: line,
		mountain: mountain,
		bubbles: bubbles,
		quote: quote,
		video: video,
		image: image,
		sample: sample
	};
	const getSlidesArr = (slideNumber) => {
		for (const [key, list] of Object.entries(lookup)) {
			if (list.includes(slideNumber)) {
				return list;
			}
		}
		return null;
	};
	const arraysAreEqual = (arr1, arr2) => {
		if (!arr1 || !arr2) return false;
		if (arr1.length !== arr2.length) return false;
		return arr1.every((value, index) => value === arr2[index]);
	};
	const filterConsecutive = (arr, x) => {
		return arr.filter((d, i, a) => {
			if (d === x) return true;
			if (i === 0) return a[i + 1] - d === 1 && d <= x;
			if (i === a.length - 1) return d - a[i - 1] === 1 && d >= x;
			return (
				(a[i + 1] - d === 1 || d - a[i - 1] === 1) &&
				(d >= x || a[i + 1] >= x || a[i - 1] >= x)
			);
		});
	};

	const getSlideHeight = async () => {
		if (mounted) {
			await tick();

			const newFigure = !arraysAreEqual(
				getSlidesArr($activeSlide),
				getSlidesArr(previousSlide)
			);

			if (newFigure) {
				const slides = getSlidesArr($activeSlide);
				const filtered = filterConsecutive(slides, $activeSlide);
				const slideEls = filtered.map((d) =>
					document.getElementById(`slide-${d}`)
				);
				const maxHeight = Math.max(...slideEls.map((d) => d.clientHeight));
				offset = maxHeight + 50;
			}
		}
	};

	onMount(() => {
		mounted = true;
		getSlideHeight();
	});
</script>

<figure
	style={`--offset: ${offset}px; --buffer: 2rem`}
	class:bleed={bleed.includes($activeSlide)}
	class:visible={offset}
>
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
		<div class="row">
			<strong>Tap to continue</strong>
			{@html pointer}
		</div>

		{#if $mq.desktop}
			<div class="row keyboard">
				<strong>Or use the keyboard</strong>
				<div class="key"><Icon name="chevron-left" /></div>
				<div class="key"><Icon name="chevron-right" /></div>
			</div>
		{/if}
	</div>
</figure>

<style>
	figure {
		position: absolute;
		top: calc(var(--offset) + var(--buffer));
		height: calc(100% - var(--offset) - var(--buffer));
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		width: 45rem;
		padding: 1rem;
		z-index: 3;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}
	figure.visible {
		opacity: 1;
	}
	.bleed {
		overflow: visible;
		padding: 0;
		width: 100%;
	}
	.tap {
		font-size: 1.3rem;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
	}
	.tap.visible {
		opacity: 1;
	}
	.row {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
	}
	.keyboard {
		font-size: 1rem;
	}
	.key {
		display: flex;
		padding: 4px;
		margin-left: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		background-color: #f9f9f9;
		text-align: center;
	}
	.key:first-of-type {
		margin-left: 10px;
	}
</style>
