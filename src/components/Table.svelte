<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import table1 from "$data/table1.csv";
	import table2 from "$data/table2.csv";

	$: title = copy.slides.find((d) => +d.slide === $activeSlide).title;
	$: footer = copy.slides.find((d) => +d.slide === $activeSlide).footer;
	$: data = $activeSlide === 18 ? table1 : table2;
</script>

<div class:latest={$activeSlide === 18} class:race={$activeSlide === 27}>
	<table>
		{#if title}
			<caption>{@html title}</caption>
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
	table {
		width: 100%;
		max-width: 35rem;
		table-layout: auto;
		font-family: var(--sans);
		color: black;
	}
	caption {
		font-family: var(--sans);
		font-weight: 700;
		font-size: 1.125rem;
		margin-bottom: 0.5rem;
	}
	td {
		padding: 0.3rem 0;
		padding-left: 1rem;
	}
	td:first-of-type {
		text-align: right;
		white-space: nowrap;
	}
	td:last-of-type {
		text-align: left;
		width: 100%;
	}
	.latest td:first-of-type {
		color: var(--color-gray-700);
		font-weight: 500;
	}
	.latest td:last-of-type {
		font-family: var(--serif);
		font-weight: 700;
	}
	.race td:first-of-type {
		font-weight: 700;
	}
	.race td:last-of-type {
		font-weight: 400;
	}
	tr:first-of-type {
		border-top: 1px solid var(--color-gray-600);
	}
	tr:first-child td {
		padding-top: 0.5rem;
	}
	tr {
		border-bottom: 1px dashed var(--color-gray-600);
	}
	.footer {
		margin-top: 1rem;
		font-family: var(--sans);
	}

	@media (max-width: 600px) {
		td {
			padding: 2px 0;
			line-height: 0.9;
		}
		.race td,
		.latest td {
			line-height: 1.2;
		}
		.latest td {
			line-height: 1;
			font-size: 14px;
			letter-spacing: -0.04em;
		}
	}
</style>
