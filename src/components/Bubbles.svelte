<script>
	import Slide from "$components/Bubbles.Slide.svelte";
	import { activeSlide } from "$stores/misc.js";
	import latin1 from "$svg/latin1.svg";
	import latin2 from "$svg/latin2.svg";
	import hiphop1 from "$svg/hiphop1.svg";
	import hiphop2 from "$svg/hiphop2.svg";

	const svgs = {
		14: latin1,
		15: latin2,
		16: hiphop1,
		17: hiphop2
	};
	$: currentSvg = svgs[$activeSlide];
</script>

{#key currentSvg}
	<Slide svg={currentSvg} />
{/key}
