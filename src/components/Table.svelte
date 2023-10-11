<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import table1 from "$data/table1.csv";
	import table2 from "$data/table2.csv";

	$: title = copy.slides.find((d) => +d.slide === $activeSlide + 1).title;
	$: footer = copy.slides.find((d) => +d.slide === $activeSlide + 1).footer;
	$: data = $activeSlide === 18 ? table1 : table2;
</script>

<div class="table-wrapper">
	<table class:top-border={!title}>
		{#if title}
			<tr>
				<th colspan="2"><h4>{@html title}</h4></th>
			</tr>
		{/if}

		{#each data as row}
			<tr>
				{#each Object.values(row) as cell, i}
					<td>{@html cell}</td>
				{/each}
			</tr>
		{/each}
	</table>

	{#if footer}
		<div class="footer">{@html footer}</div>
	{/if}
</div>

<style>
	.table-wrapper {
		width: 100%;
	}
	.top-border {
		border-top: 2px solid black;
	}
	.top-border tr:first-child td {
		padding-top: 0.5rem;
	}
	table {
		width: 100%;
		max-width: 35rem;
		table-layout: auto;
	}
	th {
		font-size: 1.2rem;
	}
	td {
		padding: 2px 0;
		padding-left: 1rem;
	}
	td:first-of-type {
		font-family: var(--sans);
		font-weight: 500;
		text-align: right;
		color: var(--color-gray-700);
		white-space: nowrap;
	}
	td:last-of-type {
		font-family: var(--serif);
		font-weight: 700;
		text-align: left;
		width: 100%;
	}
	tr {
		border-bottom: 1px dashed var(--color-gray-600);
	}
	.footer {
		margin-top: 1rem;
		font-family: var(--sans);
	}
</style>
