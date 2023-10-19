<script>
	import full from "$svg/mountain.svg";
	import { activeSlide, dir } from "$stores/misc.js";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { quintInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";

	let wrapperEl;
	let svgElement;
	let originalVB;
	let viewBox;
	const duration = 3000;

	$: mobile = $viewport.width < 600;
	$: zoom = mobile ? 2.5 : 4;
	$: zoomedIn = $activeSlide === 11;
	$: zoomedVB = originalVB
		? [
				(originalVB[2] - originalVB[2] / zoom) / 2 +
					((originalVB[2] - originalVB[2] / zoom) / 2) * (mobile ? 0.06 : 0),
				0,
				originalVB[2] / zoom,
				originalVB[3] / zoom
		  ]
		: [];
	$: flyAnimate = !$mq.reducedMotion && $activeSlide !== 28;
	$: zoomAnimate =
		!$mq.reducedMotion &&
		(($activeSlide === 12 && $dir === "right") ||
			($activeSlide === 11 && $dir === "left"));
	$: if ($activeSlide === 11 && viewBox) {
		viewBox.set(zoomedVB, {
			duration: zoomAnimate ? duration : 0,
			easing: quintInOut
		});
	} else if (viewBox) {
		viewBox.set(originalVB, {
			duration: zoomAnimate ? duration : 0,
			easing: quintInOut
		});
	}
	$: if (svgElement) {
		svgElement.setAttribute("viewBox", $viewBox.join(" "));
	}

	onMount(async () => {
		svgElement = document.querySelector("svg#mountain");
		const vb = svgElement.getAttribute("viewBox");
		originalVB = vb.split(" ").map((d) => +d);
		viewBox = tweened(originalVB);
	});
</script>

<div
	class="wrapper"
	class:zoomed-in={zoomedIn}
	bind:this={wrapperEl}
	in:fly={{ y: 1000, duration: flyAnimate ? 1500 : 0 }}
>
	{@html full}
</div>

<style>
	.wrapper {
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100vw;
		min-width: 1200px;
		max-width: 1000px;
		max-width: 1500px;
		max-height: 90%;
		transition: transform calc(var(--1s) * 4) ease-in-out;
	}
	:global(svg#mountain) {
		overflow: visible;
	}

	@media (max-width: 600px) {
		.wrapper {
			min-width: 900px;
		}
	}
</style>
