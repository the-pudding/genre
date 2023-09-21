<script>
	import _ from "lodash";

	export let total;
	export let current;
</script>

<div class="chapters">
	{#each _.range(total) as i}
		<div class="block" class:active={i === current} />
	{/each}
</div>

<style>
	.chapters {
		position: absolute;
		top: 14px;
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
