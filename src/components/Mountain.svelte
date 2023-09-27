<script>
	import WordCloud from "$components/Mountain.WordCloud.svelte";
	import rank from "$data/rank.csv";
	import _ from "lodash";
	import { activeSlide } from "$stores/misc.js";

	const startWords = [
		"hip-hop",
		"filmi",
		"sad-sierreno",
		"urbano-latino",
		"k-pop",
		"reggaeton"
	].join(" ");
	const moreGenres = _.sampleSize(
		Object.keys(rank.find((d) => d.genre === "8/9/2023")).map((d) =>
			_.kebabCase(d)
		),
		200
	).join(" ");
	const allTogether = startWords + moreGenres;

	$: up = $activeSlide === 12;

	//  688 x 109
	// 	const words1 = [
	//     {
	//         "size": 20,
	//         "x": 304,
	//         "y": 62,
	//         "rotate": 7,
	//         "text": "hip-hop"
	//     },
	//     {
	//         "size": 20,
	//         "x": 382,
	//         "y": 48,
	//         "rotate": 18,
	//         "text": "filmi"
	//     },
	//     {
	//         "size": 20,
	//         "x": 438,
	//         "y": 27,
	//         "rotate": 5,
	//         "text": "sad-sierreno"
	//     },
	//     {
	//         "size": 20,
	//         "x": 194,
	//         "y": 65,
	//         "rotate": 13,
	//         "text": "urbano-latino"
	//     },
	//     {
	//         "size": 20,
	//         "x": 244,
	//         "y": 35,
	//         "rotate": -15,
	//         "text": "k-pop"
	//     },
	//     {
	//         "size": 20,
	//         "x": 84,
	//         "y": 55,
	//         "rotate": 2,
	//         "text": "reggaeton"
	//     }
	// ]
</script>

<div class="mountain" class:up>
	<WordCloud
		id="start"
		text={startWords}
		color={"var(--color-primary)"}
		height={"15%"}
	/>
	<WordCloud
		id="the-rest"
		text={moreGenres}
		color={"var(--color-primary)"}
		height={"85%"}
	/>
</div>

<style>
	.mountain {
		height: 100%;
		width: 100%;
		position: relative;
		transform: translate(0, 0);
		transition: transform calc(var(--1s) * 3) ease-in-out;
	}
	.up {
		transform: translate(0, -85%);
	}
</style>
