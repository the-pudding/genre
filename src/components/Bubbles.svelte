<script>
	import Slide from "$components/Bubbles.Slide.svelte";
	import { activeSlide } from "$stores/misc.js";
	import latinCombined from "$svg/bubbles/latin-combined.svg";
	import hiphopCombined from "$svg/bubbles/hiphop-combined.svg";
	import escapeRoom from "$svg/bubbles/escape-room.svg";
	import rock from "$svg/bubbles/rock.svg";
	import stompAndHoller from "$svg/bubbles/stomp-and-holler.svg";

	const svgs = {
		14: latinCombined,
		15: latinCombined,
		16: hiphopCombined,
		17: hiphopCombined,
		20: escapeRoom,
		21: rock,
		23: stompAndHoller
	};
	$: constant =
		$activeSlide === 14 || $activeSlide === 15
			? ["chino-nacho", "becky-g", "juan-gabriel"]
			: $activeSlide === 16 || $activeSlide === 17
			? ["cloudymane", "kobelocks", "scarlxrd", "lei"]
			: [];
	$: step = { 14: 1, 15: 2, 16: 1, 17: 2 }[$activeSlide] || undefined;
	$: currentSvg = svgs[$activeSlide];
</script>

{#key currentSvg}
	<Slide svg={currentSvg} {step} {constant} />
{/key}
