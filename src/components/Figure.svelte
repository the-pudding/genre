<script>
	import { activeSlide, dir } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import Tap from "$components/Tap.svelte";
	import Svg from "$components/Svg.svelte";
	import Ranks from "$components/Ranks.svelte";
	import Genres from "$components/Table.Genres.svelte";
	import Race from "$components/Table.Race.svelte";
	import Line from "$components/Line.svelte";
	import Mountain from "$components/Mountain.svelte";
	import Bubbles from "$components/Bubbles.svelte";
	import Image from "$components/Image.svelte";
	import Columns from "$components/Columns.svelte";
	import Quote from "$components/Quote.svelte";
	import Video from "$components/Video.svelte";
	import Sample from "$components/Sample.svelte";
	import Footer from "$components/Footer.svelte";
	import { onMount, tick } from "svelte";
	import _ from "lodash";
	import copy from "$data/copy.json";

	let mounted = false;
	let offset;

	const scroll = [
		1, 2, 3, 4, 5, 7, 13, 18, 19, 22, 24, 27, 34, 25, 26, 31, 32, 33
	];
	const bleed = [
		11, 12, 14, 15, 16, 17, 20, 21, 23, 25, 26, 28, 29, 30, 31, 32, 33
	];

	const ranks = [0, 1, 2, 3, 4, 5];
	const genreTable = [18];
	const raceTable = [27];
	const svg = [6, 13, 22, 24, 30];
	const columns = [7];
	const line = [8, 9, 10];
	const mountain = [11, 12, 28];
	const bubbles = [14, 15, 16, 17, 20, 21, 23];
	const quote = [19];
	const video = [25, 26, 31, 32, 33];
	const image = [29, 35];
	const sample = [34];
	const footer = [36];

	$: mobile = $viewport.width < 600;
	$: animate = $activeSlide <= 5 && ($activeSlide !== 5 || $dir !== "left");
	$: figcaption = copy.slides[$activeSlide].figcaption;
	$: buffer = mobile ? 10 : 50;
	$: $activeSlide, $viewport.width, getSlideHeight();
	$: previousSlide =
		$activeSlide === 0
			? undefined
			: $dir === "left"
			? $activeSlide + 1
			: $activeSlide - 1;

	const lookup = {
		ranks: ranks,
		genreTable: genreTable,
		raceTable: raceTable,
		svg: svg,
		columns: columns,
		line: line,
		mountain: mountain,
		bubbles: bubbles,
		quote: quote,
		video: video,
		image: image,
		sample: sample,
		footer: footer
	};
	const getSlidesArr = (slideNumber) => {
		// special case for ranking table
		if (slideNumber === 0) return [0];
		else if (slideNumber === 1 || slideNumber === 2 || slideNumber === 3)
			return [1, 2, 3];
		else if (slideNumber === 4) return [4];
		else if (slideNumber === 5) return [5];

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
				offset = maxHeight + buffer;
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
	class:scroll={scroll.includes($activeSlide)}
	class:bleed={bleed.includes($activeSlide)}
	class:visible={offset}
	class:animate
	class:min-height={columns.includes($activeSlide)}
>
	{#if figcaption}
		<figcaption class="sr-only" aria-live="polite">
			{figcaption}
		</figcaption>
	{/if}

	{#if ranks.includes($activeSlide)}
		<Ranks />
	{:else if genreTable.includes($activeSlide)}
		<Genres />
	{:else if raceTable.includes($activeSlide)}
		<Race />
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
	{:else if footer.includes($activeSlide)}
		<Footer />
	{/if}

	<Tap />
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
		transition: opacity calc(var(--1s) * 0.5) ease-in-out;
	}
	figure.visible {
		opacity: 1;
	}
	figure.animate {
		transition: opacity calc(var(--1s) * 0.5) ease-in-out,
			top calc(var(--1s) * 0.5) ease-in-out;
	}
	figure.bleed {
		padding: 0;
		width: 100%;
	}
	figure.scroll {
		height: auto;
		overflow: scroll;
	}
	figure.min-height {
		min-height: 600px;
	}
</style>
