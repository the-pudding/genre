<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import _ from "lodash";
</script>

<div class="chapters">
	{#each _.range(copy.slides.length) as i}
		<div class="block" class:active={i === $activeSlide} />
	{/each}
</div>

<style>
	.chapters {
		position: absolute;
		top: 0.75rem;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 1rem;
	}
	.block {
		flex: 1;
		height: 3px;
		margin: 0 3px;
		background: var(--color-black);
		opacity: 0.3;
	}
	.block:first-child {
		margin-left: 0;
	}
	.block:last-child {
		margin-right: 0;
	}
	.active {
		opacity: 1;
	}
</style>
