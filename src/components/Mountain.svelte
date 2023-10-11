<script>
	import full from "$svg/full-mountain.svg";
	import { activeSlide, dir } from "$stores/misc.js";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";

	let svgElement;
	let originalVB;
	const zoom = 4;
	const viewBox = tweened(originalVB);

	$: zoomedVB = originalVB
		? [
				(originalVB[2] - originalVB[2] / zoom) / 2,
				0,
				originalVB[2] / zoom,
				originalVB[3] / zoom
		  ]
		: [];
	$: animate =
		($activeSlide === 12 && $dir === "right") ||
		($activeSlide === 11 && $dir === "left");
	$: if ($activeSlide === 11) {
		viewBox.set(zoomedVB, {
			duration: animate ? 2000 : 0
		});
	} else {
		viewBox.set(originalVB, { duration: animate ? 2000 : 0 });
	}

	$: if (svgElement) {
		svgElement.setAttribute("viewBox", $viewBox.join(" "));
	}

	onMount(() => {
		svgElement = document.querySelector("svg#mountain");
		const vb = svgElement.getAttribute("viewBox");
		originalVB = vb.split(" ").map((d) => +d);
	});
</script>

<div class="wrapper">
	{@html full}
</div>

<style>
	.wrapper {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100vw;
	}
</style>
