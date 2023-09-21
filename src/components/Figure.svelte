<script>
	import { activeSlide } from "$stores/misc.js";
	import Table from "$components/Table.svelte";
	import pointer from "$svg/pointer.svg";
</script>

<figure>
	{#if $activeSlide < 4}
		<Table />
	{/if}

	<div class="tap" class:visible={$activeSlide === 0}>
		<strong>Tap to continue</strong>
		{@html pointer}
	</div>
</figure>

<style>
	figure {
		--offset: 30%; /* this can change with screen sizes */
		position: absolute;
		top: var(--offset);
		height: calc(100% - var(--offset));
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
		width: 45rem;
		padding: 1rem;
	}
	.tap {
		position: absolute;
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
