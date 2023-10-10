<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import table1 from "$data/table1.csv";
	import table2 from "$data/table2.csv";

	$: header = copy.slides.find((d) => +d.slide === $activeSlide + 1).header;
	$: footer = copy.slides.find((d) => +d.slide === $activeSlide + 1).footer;
	$: data = $activeSlide === 18 ? table1 : table2;

	$: console.log(data);
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
	}
	table.full {
		max-width: 40rem;
	}
</style>
