<script>
	import latin from "$svg/charts/latin.svg";
	import regions from "$svg/charts/regions.svg";
	import hyperpop from "$svg/pics/hyperpop.svg";
	import madeUp from "$svg/pics/made-up.svg";
	import indie from "$svg/charts/indie.svg";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { onMount } from "svelte";

	$: currentSvg =
		$activeSlide === 6
			? regions
			: $activeSlide === 13
			? latin
			: $activeSlide === 22
			? madeUp
			: $activeSlide === 24
			? hyperpop
			: $activeSlide === 30
			? indie
			: null;
	$: title = copy.slides.find((d) => +d.slide === $activeSlide)?.title;
	$: bottom = $activeSlide === 30;

	onMount(() => {
		if ($activeSlide === 22 || $activeSlide === 24) {
			const pics = document.querySelectorAll("svg > a");
			pics.forEach((pic) => {
				// pic.addEventListener("mouseenter", (e) => {
				// 	e.target.style.transform = "translate(-5px, -5px)";
				// });
				// pic.addEventListener("mouseleave", (e) => {
				// 	e.target.style.transform = "translate(0, 0)";
				// });
			});
		}
	});
</script>

<div
	class:bottom
	class:latin={$activeSlide === 13}
	class:indie={$activeSlide === 30}
>
	{#if title}<h4>{title}</h4>{/if}
	{@html currentSvg}
</div>

<style>
	div {
		max-width: 500px;
		margin: auto;
		pointer-events: auto;
	}
	.bottom {
		position: absolute;
		bottom: -6px;
		width: 100%;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	h4 {
		width: 43rem;
		margin: auto;
		padding: 0 1rem;
	}
	.indie {
		max-width: none;
	}

	@media (max-width: 600px) {
		.latin {
			max-width: 300px;
		}
	}
</style>
