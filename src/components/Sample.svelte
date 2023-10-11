<script>
	import copy from "$data/copy.json";
	import Audio from "$components/Audio.svelte";
	import { activeSlide } from "$stores/misc.js";
	import _ from "lodash";

	$: title = copy.slides.find((d) => +d.slide === $activeSlide + 1).title;

	const samples = [
		{ genre: "Bedroom Pop", artist: "Omar Apollo" },
		{ genre: "Santali Pop", artist: "Porayni Soren" },
		{ genre: "Dangnut", artist: "Hetty Koes Endang" },
		{ genre: "Fallen Angel", artist: "Elegy of Madness" },
		{ genre: "Zouk Riddim", artist: "DJ Eladji" },
		{ genre: "Traprun", artist: "NOIXES" },
		{ genre: "Ambient Psychill", artist: "Lauge" },
		{ genre: "Rap Cristao", artist: "James LR" },
		{ genre: "Groove Room", artist: "Anton Ishutin" },
		{ genre: "Sigilkore", artist: "Anthonyxmoore" },
		{ genre: "Funk MTG", artist: "DJ GUZIN" },
		{ genre: "Alt Z", artist: "OSTON" },
		{ genre: "Gym Phonk", artist: "Fyex" },
		{ genre: "Scenecore", artist: "Milord" },
		{ genre: "Tech House", artist: "Andruss" },
		{ genre: "Boom Bap", artist: "SmooVth" }
	];
</script>

<h4>{title}</h4>

<div class="sample">
	{#each samples as { artist, genre }}
		<div class="group">
			<div class="genre">{genre}</div>
			<Audio id={_.kebabCase(artist)} label={artist} />
		</div>
	{/each}
</div>

<style>
	.sample {
		display: flex;
		flex-wrap: wrap;
	}
	.genre {
		font-family: var(--sans);
		font-weight: 500;
		font-size: 14px;
		padding-left: 15px;
		margin-bottom: 2px;
	}
	.group {
		margin-right: .5rem;
		margin-top: .5rem;
	}
</style>
