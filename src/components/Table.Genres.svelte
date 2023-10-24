<script>
	import data from "$data/table1.csv";
	import _ from "lodash";

	const columns = 3;
	const columnLength = Math.floor(data.length / 4);
	const shuffledData = _.shuffle(data);
</script>

<div class="table">
	{#each _.range(columns) as col}
		<div class="col">
			{#each shuffledData.slice(col * columnLength, (col + 1) * columnLength) as { genre }}
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
		justify-content: space-evenly;
		font-weight: 500;
	}
	.col {
		margin-right: 0.5rem;
	}
	.col:last-of-type {
		margin-right: 0;
	}

	@media (max-width: 600px) {
		.table {
			font-size: 14px;
		}
	}
</style>
