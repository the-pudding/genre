<script>
	import latin from "$svg/charts/latin.svg";
	import regions from "$svg/charts/regions.svg";
	import hyperpop from "$svg/pics/hyperpop.svg";
	import madeUp from "$svg/pics/made-up.svg";
	import indie from "$svg/charts/indie.svg";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";

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
	$: maxWidth =
		$activeSlide === 13 ? "300px" : $activeSlide === 30 ? "none" : "500px";
</script>

<div class:bottom style:max-width={maxWidth}>
	{#if title}<h4>{title}</h4>{/if}
	{@html currentSvg}
</div>

<style>
	div {
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
		margin: auto;
		padding: 0 1rem;
	}
</style>
