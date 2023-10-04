<script>
	import latin from "$svg/charts/latin.svg";
	import regions from "$svg/charts/regions.svg";
	import { activeSlide } from "$stores/misc.js";

	$: currentSvg = $activeSlide === 6 ? regions : latin;
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
