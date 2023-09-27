<script>
	import d3Cloud from "d3-cloud";
	import { descending, extent, rollups } from "d3-array";
	import { onMount } from "svelte";
	import _ from "lodash";

	export let id;
	export let text;
	export let color;
	export let height;

	let cloud;
	let w;
	let h;
	let words = [];
	const wordPadding = 5;
	const tokens = text.trim().split(/\s+/g);
	const data = rollups(
		tokens,
		(g) => g.length,
		(w) => w.toLowerCase()
	)
		.sort(([, a], [, b]) => descending(a, b))
		.map(([key, size]) => ({ text: key, size }));
	const margin = {
		top: 10,
		right: 10,
		bottom: 2,
		left: 10
	};

	onMount(() => {
		cloud = d3Cloud()
			.size([w - margin.left - margin.right, h - margin.top - margin.bottom])
			.words(data)
			.padding(wordPadding)
			.rotate((d) => _.random(-15, 15))
			.font("Arial")
			.fontSize((d) => Math.sqrt(d.size) * 20)
			.text((d) => d.text)
			.on("word", ({ size, x, y, rotate, text }) => {
				words = [...words, { size, x, y, rotate, text }];
			});

		cloud.start();
	});
</script>

<div
	class="wrapper"
	class:shift={id === "the-rest"}
	style:height={`${height}`}
	bind:clientWidth={w}
	bind:clientHeight={h}
>
	<svg viewBox={`0 0 ${w} ${h}`}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			{#each words as word}
				<text
					font-size={word.size}
					transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
					fill={color}>{word.text}</text
				>
			{/each}
		</g>
	</svg>
</div>

<style>
	div {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.shift {
		transform: translate(0, 100%);
	}
	svg {
		height: 100%;
		width: 100%;
		text-anchor: middle;
		font-family: Arial;
	}
	text {
		font-weight: bolder;
	}
</style>
