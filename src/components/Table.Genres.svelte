<script>
	import Icon from "$components/helpers/Icon.svelte";
	import viewport from "$stores/viewport.js";
	import data from "$data/table1.csv";
	import _ from "lodash";

	const shuffledData = _.shuffle(data);

	$: numColumns = $viewport.width < 446 ? 1 : $viewport.width < 682 ? 2 : 3;
	$: columnLength = Math.floor(data.length / numColumns);
	$: columns = _.range(numColumns).map((i) =>
		shuffledData.slice(i * columnLength, (i + 1) * columnLength)
	);
</script>

<div class="table">
	{#each columns as col, i}
		<div class="col" class:last={i + 1 === numColumns}>
			{#each col as { genre }}
				<div class="genre">{genre}</div>
			{/each}
		</div>
	{/each}

	<div class="annotation" class:visible={numColumns === 1}>
		Keep scrolling
		<span class="icon"><Icon name="arrow-down" /></span>
	</div>
</div>

<style>
	.table {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		font-weight: 500;
		font-family: var(--sans);
	}
	.col {
		margin-right: 0.5rem;
	}
	.last {
		margin: 0;
	}
	.annotation {
		visibility: hidden;
		position: absolute;
		top: 5%;
		left: 50%;
		font-size: 1.25rem;
		display: flex;
		align-items: center;
	}
	.visible {
		visibility: visible;
	}
	.icon {
		display: flex;
		margin-left: 5px;
	}

	@media (max-width: 600px) {
		.table {
			font-size: 14px;
			justify-content: flex-start;
		}

		.col {
			max-width: calc(50% - 0.25rem);
		}
	}

	@media (max-width: 446px) {
		.col {
			margin: 0;
		}
		.col:first-of-type {
			margin-right: 0.5rem;
		}
	}
</style>
