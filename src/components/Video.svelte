<script>
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import Clip from "$components/Video.Clip.svelte";

	const videoIds = {
		25: "oates",
		26: "tyler",
		31: "delight",
		32: "stooges",
		33: "nsync"
	};
	$: id = videoIds[$activeSlide];
	$: overlay = copy.slides.find((d) => +d.slide === $activeSlide).overlay;
</script>

{#key id}
	<Clip {id} {overlay} />
{/key}
