<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";

	$: explore = $activeSlide === 35;
	$: fish = $activeSlide === 29;
	$: src =
		$activeSlide === 29 ? "assets/img/fish.jpg" : "assets/img/explore.jpg";
	$: alt = fish
		? "Fish"
		: "A screenshot of the Google Sheet with the genre data";
</script>

<div class="img-wrapper" class:explore class:fish>
	{#if explore}<h4>Explore the data from 2016-2023</h4>{/if}
	<img {src} {alt} />
</div>

{#if explore}
	<a href={copy.dataLink} target="_blank"
		>Go to the Google Sheet
		<span class="icon">
			<Icon name="external-link" />
		</span>
	</a>
{/if}

<style>
	.img-wrapper.explore {
		width: 100%;
		max-width: 40rem;
		margin: auto;
		position: absolute;
		aspect-ratio: 0.5;
		overflow: visible;
		top: 80px;
		left: 1rem;
	}
	.img-wrapper.fish {
		height: 100%;
		width: auto;
	}
	.explore img {
		width: 100%;
	}
	.fish img {
		height: 100%;
		width: auto;
		margin: auto;
	}
	strong {
		font-size: 18px;
		width: calc(100% - 2rem);
		margin: 0 auto;
		display: block;
	}
	a {
		font-family: var(--sans);
		background: var(--color-emphasis);
		color: white;
		font-weight: 500;
		width: 100%;
		max-width: 240px;
		font-size: 18px;
		border-radius: 20px;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 4rem;
		left: 50%;
		transform: translate(-50%, 0);
		pointer-events: auto;
	}
	a:hover {
		background: #4333c0;
		cursor: pointer;
	}
	.icon {
		margin-left: 0.5rem;
	}
</style>
