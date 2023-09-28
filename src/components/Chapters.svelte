<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import _ from "lodash";
</script>

<div class="chapters">
	{#each copy.slides as { section }, i}
		{@const sectionStarter = i === 0 || section > copy.slides[i - 1].section}
		{@const sectionActive = copy.slides[$activeSlide].section === section}
		<div class="block" class:active={i === $activeSlide}>
			{#if sectionStarter}
				<div class="title">
					{section}<span class:visible={sectionActive}>
						{" — "}{copy.sections[section]}</span
					>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.chapters {
		position: absolute;
		top: 2rem;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 1rem;
	}
	.block {
		position: relative;
		flex: 1;
		height: 3px;
		margin: 0 3px;
		background: var(--color-black);
		opacity: 0.3;
		transition: opacity calc(var(--1s) * 0.4);
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
	.title {
		position: absolute;
		bottom: 0.5rem;
		left: 0;
		font-size: 12px;
		white-space: nowrap;
	}
	.title span {
		visibility: hidden;
	}
	span.visible {
		visibility: visible;
	}
	@media (max-width: 600px) {
		.title {
			font-size: 10px;
		}
	}
</style>
