<script>
	import full from "$svg/full-mountain.svg";
	import { activeSlide, dir } from "$stores/misc.js";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { quintInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import viewport from "$stores/viewport.js";

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
	$: animate =
		($activeSlide === 12 && $dir === "right") ||
		($activeSlide === 11 && $dir === "left");
	$: if ($activeSlide === 11 && viewBox) {
		viewBox.set(zoomedVB, {
			duration: animate ? duration : 0,
			easing: quintInOut
		});
	} else if (viewBox) {
		viewBox.set(originalVB, {
			duration: animate ? duration : 0,
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
	in:fly={{ y: 1000, duration: 1500 }}
>
	{@html full}
</div>

<style>
	.wrapper {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100vw;
		min-width: 1200px;
		max-width: 1500px;
		max-height: 90%;
		transition: transform 4s ease-in-out;
	}

	/* @media (max-width: 600px) {
		.zoomed-in {
			transform: translate(-55%, 0);
		}
	} */
</style>
