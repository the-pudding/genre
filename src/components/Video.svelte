<script>
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import Clip from "$components/Video.Clip.svelte";

	const videoIds = {
		26: "oates",
		27: "tyler",
		32: "delight",
		33: "stooges",
		34: "nsync"
	};
	$: id = videoIds[$activeSlide];
	$: overlay = copy.slides.find((d) => +d.slide === $activeSlide + 1).overlay;
</script>

{#key id}
	<Clip {id} {overlay} />
{/key}
