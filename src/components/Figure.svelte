<script>
	import { activeSlide, slideHeights } from "$stores/misc.js";
	import Table from "$components/Table.svelte";
	import Line from "$components/Line.svelte";
	import Mountain from "$components/Mountain.svelte";
	import pointer from "$svg/pointer.svg";

	// TODO: use slideHeights to check if this will cause overlap with slide text or set breakpoints
	$: offset = $activeSlide === 0 ? "28%" : "15%";
</script>

<figure style={`--offset: ${offset}`}>
	{#if $activeSlide < 4 || $activeSlide === 5 || $activeSlide === 6 || $activeSlide === 12}
		<Table />
	{:else if $activeSlide <= 9 && $activeSlide >= 7}
		<Line />
	{:else if $activeSlide === 13 || $activeSlide === 14}
		<Mountain />
	{/if}

	<div class="tap" class:visible={$activeSlide === 0}>
		<strong>Tap to continue</strong>
		{@html pointer}
	</div>
</figure>

<style>
	p {
		position: absolute;
	}
	figure {
		position: absolute;
		top: calc(var(--offset) + 2rem);
		height: calc(100% - 2rem - var(--offset));
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		width: 45rem;
		padding: 1rem;
		transition: top var(--1s) ease-in-out;
	}
	.tap {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		opacity: 0;
	}
	.visible {
		opacity: 1;
	}
</style>
