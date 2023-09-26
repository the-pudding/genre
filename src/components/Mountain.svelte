<script>
	import FallingWord from "$components/Mountain.FallingWord.svelte";
	import Legend from "$components/Table.Legend.svelte";
	import rank from "$data/rank.csv";
	import geo from "$data/geo.csv";
	import _ from "lodash";

	const visibleGenres = [
		{ genre: "hip hop" },
		{ genre: "sad sierreno" },
		{ genre: "urbano latino" },
		{ genre: "k-pop" },
		{ genre: "reggaeton" }
	];
	const numToDisplay = 25;
	const columns = ["4/23/2016", "8/9/2023"];
	const data = rank
		.filter((d) => columns.includes(d.genre))
		.reduce((acc, current) => {
			const ranks = Object.keys(current)
				.filter((d) => d !== "genre" && current[d] && +current[d] > 0)
				.sort((a, b) => +current[a] - +current[b])
				.slice(0, numToDisplay)
				.map((d) => ({ genre: d, rank: +current[d] }));
			return [
				...acc,
				{
					date: current.genre,
					ranks: ranks
				}
			];
		}, []);
	const highlightList = visibleGenres.map((d) => ({
		genre: d.genre,
		highlight:
			geo.find((g) => g.genre === d.genre)["geo 2"] === "west/english"
				? "var(--color-primary)"
				: "var(--color-secondary)"
	}));

	let tableEl;
	let tds = [];
	$: visibleTds = tds.filter(
		(d) =>
			+d.dataset.col === 1 &&
			visibleGenres.map((g) => g.genre).includes(d.dataset.genre)
	);
	$: wordData = visibleTds.map((d) => ({
		genre: d.dataset.genre,
		color: highlightList.find((h) => h.genre === d.dataset.genre).highlight,
		originLeft: d.offsetLeft,
		originTop: d.offsetTop
	}));
	$: tableOffset = tableEl?.getBoundingClientRect().top;
	$: console.log(tableEl?.getBoundingClientRect());
</script>

<div class="table-wrapper">
	<strong class="hide">Genres, ranked by streams on Spotify</strong>
	<div class="hide">
		<Legend />
	</div>
	<table bind:this={tableEl}>
		{#each wordData as word}
			<FallingWord {...word} {tableOffset} />
		{/each}

		<thead>
			<tr>
				{#each data as { date }}
					<th>{date.slice(-4)}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each _.range(numToDisplay) as row}
				<tr>
					{#each data as { ranks }, col}
						{@const genre = ranks[row].genre}
						{@const highlight =
							col === 0
								? null
								: highlightList.find((d) => d.genre === genre)?.highlight}
						<td
							bind:this={tds[2 * row + col]}
							data-col={col}
							data-genre={genre}
							style:color={highlight}
						>
							{#if col === 0}
								<span class="number">{row + 1}</span>
							{/if}
							{genre}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-wrapper {
		font-family: var(--sans);
	}
	table {
		position: relative;
		max-width: 40rem;
	}
	thead {
		border-bottom: 2px solid transparent;
		color: var(--color-gray-600);
		visibility: hidden;
	}
	th:first-child {
		padding-left: 1.25rem;
	}
	tr {
		border-bottom: 1px solid transparent;
	}
	td {
		padding: 2px 0;
		font-weight: bolder;
		visibility: hidden;
	}
	td.visible {
		position: absolute;
	}
	.number {
		color: var(--color-gray-600);
		font-size: 0.75rem;
		margin-right: 0.5rem;
		visibility: hidden;
	}
	.hide {
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
</style>
