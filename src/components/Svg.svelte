<script>
	import latin from "$svg/charts/latin.svg";
	import regions from "$svg/charts/regions.svg";
	import hyperpop from "$svg/pics/hyperpop.svg";
	import madeUp from "$svg/pics/made-up.svg";
	import { activeSlide } from "$stores/misc.js";

	$: currentSvg =
		$activeSlide === 6
			? regions
			: $activeSlide === 13
			? latin
			: $activeSlide === 23
			? madeUp
			: $activeSlide === 25
			? hyperpop
			: null;
</script>

<div>
	{@html currentSvg}
</div>

<style>
	div {
		max-width: 500px;
		margin: auto;
	}
</style>
