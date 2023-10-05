<script>
	import Slide from "$components/Bubbles.Slide.svelte";
	import { activeSlide, dir } from "$stores/misc.js";
	import latin1 from "$svg/bubbles/latin1.svg";
	import latin2 from "$svg/bubbles/latin2.svg";
	import hiphop1 from "$svg/bubbles/hiphop1.svg";
	import hiphop2 from "$svg/bubbles/hiphop2.svg";
	import escapeRoom from "$svg/bubbles/escape-room.svg";
	import rock from "$svg/bubbles/rock.svg";
	import stompAndHoller from "$svg/bubbles/stomp-and-holler.svg";

	const svgs = {
		14: latin1,
		15: latin2,
		16: hiphop1,
		17: hiphop2,
		20: escapeRoom,
		21: rock,
		24: stompAndHoller
	};
	$: currentSvg = svgs[$activeSlide];
	$: special =
		($activeSlide === 17 && $dir === "right") ||
		($activeSlide === 16 && $dir === "left");
</script>

{#key currentSvg}
	<Slide svg={currentSvg} {special} />
{/key}
