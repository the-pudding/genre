<script>
	import { activeSlide } from "$stores/misc.js";
	import Clip from "$components/Video.Clip.svelte";

	$: id = $activeSlide === 26 ? "oates" : "tyler";
</script>

{#key id}
	<Clip {id} />
{/key}
