<script>
	import viewport from "$stores/viewport.js";
	import data from "$data/table1.csv";
	import _ from "lodash";

	const shuffledData = _.shuffle(data);

	$: numColumns = $viewport.width < 446 ? 1 : $viewport.width < 564 ? 2 : 3;
	$: columnLength = Math.floor(data.length / numColumns);
	$: columns = _.range(numColumns).map((i) =>
		shuffledData.slice(i * columnLength, (i + 1) * columnLength)
	);
</script>

<div class="table">
	{#each columns as col}
		<div class="col">
			{#each col as { genre }}
				<div class="genre">{genre}</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.table {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		font-weight: 500;
	}
	.col {
		margin-right: 0.5rem;
		font-family: var(--sans);
	}
	.col:last-of-type {
		margin-right: 0;
	}
	.annotation {
		position: absolute;
		top: 0;
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
