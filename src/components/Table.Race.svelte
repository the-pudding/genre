<script>
	import copy from "$data/copy.json";
	import { activeSlide } from "$stores/misc.js";
	import data from "$data/table2.csv";

	$: title = copy.slides.find((d) => +d.slide === $activeSlide).title;
	$: footer = copy.slides.find((d) => +d.slide === $activeSlide).footer;
</script>

<div>
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
		padding: 0 0 0 1rem;
	}
	td:first-of-type {
		text-align: right;
		white-space: nowrap;
	}
	td:last-of-type {
		text-align: left;
		width: 100%;
	}
	td:first-of-type {
		font-weight: 700;
	}
	td:last-of-type {
		font-weight: 400;
	}
	tr:first-of-type {
		border-top: 1px solid var(--color-gray-600);
	}
	tr:first-child td {
		padding-top: 0.25rem;
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
			padding: 5px 0 5px 0.6rem;
			line-height: 0.9;
		}

		@media (max-height: 625px) {
			caption {
				font-size: 1rem;
				line-height: 1.1;
			}
		}	
	}
</style>
