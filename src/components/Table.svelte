<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import table1 from "$data/table1.csv";
	import table2 from "$data/table2.csv";

	$: header = copy.slides.find((d) => +d.slide === $activeSlide + 1).header;
	$: footer = copy.slides.find((d) => +d.slide === $activeSlide + 1).footer;
	$: data = $activeSlide === 18 ? table1 : table2;
</script>

<div class="table-wrapper">
	<table>
		<tr>
			<th colspan="2">{header}</th>
		</tr>
		{#each data as row}
			<tr>
				{#each Object.values(row) as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</table>

	{#if footer}
		<div>{footer}</div>
	{/if}
</div>

<style>
	.table-wrapper {
		font-family: var(--sans);
		transform: translate(0, 0);
		width: calc(100% - 2rem);
		margin: 0 auto;
		transition: transform calc(var(--1s) * 2) ease-in-out;
	}
	table {
		max-width: 20rem;
	}
	table.full {
		max-width: 40rem;
	}
</style>
