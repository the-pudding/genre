<script>
	import latin from "$svg/charts/latin.svg";
	import regions from "$svg/charts/regions.svg";
	import hyperpop from "$svg/pics/hyperpop.svg";
	import madeUp from "$svg/pics/made-up.svg";
	import indie from "$svg/charts/indie.svg";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";

	$: mobile = $viewport.width < 600;
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
	$: $viewport.width, interactivePics();

	const interactivePics = () => {
		const pics = document.querySelectorAll("svg > a");
		const handleEnter = (e) => (e.target.style.opacity = 0.75);
		const handleLeave = (e) => (e.target.style.opacity = 1);

		pics.forEach((pic) => {
			if (mobile) {
				pic.removeEventListener("mouseenter", handleEnter);
				pic.removeEventListener("mouseleave", handleLeave);
			} else {
				pic.addEventListener("mouseenter", handleEnter);
				pic.addEventListener("mouseleave", handleLeave);
			}
		});
	};
	onMount(() => {
		if ($activeSlide === 22 || $activeSlide === 24) interactivePics();
	});
</script>

<div
	class:bottom
	class:articles={$activeSlide === 22 || $activeSlide === 24}
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
	}
	.bottom h4 {
		padding: 1rem;
	}
	.indie {
		max-width: none;
	}
	.articles {
		pointer-events: auto;
	}

	@media (max-width: 600px) {
		.latin {
			max-width: 300px;
		}
		.articles {
			pointer-events: none;
		}
	}
</style>
