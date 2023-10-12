<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import _ from "lodash";

	const chapters = _.groupBy(copy.slides, "section");
</script>

<div class="chapters">
	{#each Object.keys(chapters) as chapter}
		{@const chapterActive = copy.slides[$activeSlide].section === chapter}
		<div class="chapter" class:active={chapterActive}>
			<span class="text">
				{chapter}<span class="title"> — {copy.sections[chapter]}</span>
			</span>
			{#if chapterActive}
				{#each chapters[chapter] as slide}
					<div class="block" class:active={$activeSlide === +slide.slide} />
				{/each}
			{:else}
				<div class="block" />
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
	.chapter {
		display: flex;
		align-items: end;
		flex: 1;
		margin: 0 3px;
	}
	.chapter:first-of-type {
		margin-left: 0;
	}
	.chapter:last-of-type {
		margin-right: 0;
	}
	.chapter.active {
		flex: 5;
	}
	.text {
		position: absolute;
		top: -1.2rem;
		font-size: 12px;
		white-space: nowrap;
		opacity: 0.3;
		font-family: var(--sans);
		font-weight: 600;
		text-transform: uppercase;
	}
	.chapter.active .text {
		opacity: 1;
	}
	.title {
		visibility: hidden;
	}
	.chapter.active .title {
		visibility: visible;
	}
	.block {
		position: relative;
		flex: 1;
		height: 2px;
		border-radius: 1px;
		margin: 0 1px;
		background: rgba(0, 0, 0, 0.3);
		transition: background calc(var(--1s) * 0.4);
	}
	.block:first-of-type {
		margin-left: 0;
	}
	.block:last-of-type {
		margin-right: 0;
	}
	.block.active {
		background: rgba(0, 0, 0, 1);
	}

	@media (max-width: 600px) {
		.text {
			font-size: 10px;
		}
	}
</style>
