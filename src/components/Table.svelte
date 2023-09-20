<script>
	import rank from "$data/rank.csv";
	import geo from "$data/geo.csv";
	import _ from "lodash";

	export let props;
	$: ({ title, columns, highlight, highlightBy } = props);

	const numToDisplay = 25;

	$: dates = columns.split(",").map((d) => d.trim());
	$: numColumns = dates.length;
	$: highlightList = highlight
		? highlight
				.split(",")
				.map((d) => ({ genre: d.trim(), highlight: "var(--color-secondary)" }))
		: highlightBy === "geography"
		? genreList.map((d) => ({
				genre: d,
				highlight:
					geo.find((g) => g.genre === d)["geo 2"] === "west/english"
						? "var(--color-primary)"
						: "var(--color-secondary)"
		  }))
		: [];
	$: genreList = data.reduce((acc, current) => {
		const genres = current.ranks.map((d) => d.genre);
		return _.uniq([...acc, ...genres]);
	}, []);
	$: data = rank
		.filter((d) => dates.includes(d.genre))
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
</script>

{#if title}
	<strong>{title}</strong>
{/if}
<table class:full={numColumns > 1}>
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
					{@const highlight = highlightList.find(
						(d) => d.genre === genre
					)?.highlight}
					<td style:color={highlight}>
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

<style>
	table {
		font-family: var(--sans);
		max-width: 50%;
	}
	table.full {
		max-width: none;
	}
	thead {
		border-bottom: 2px solid var(--color-gray-800);
		color: var(--color-gray-600);
	}
	th:first-child {
		padding-left: 1.25rem;
	}
	tr {
		border-bottom: 1px solid var(--color-gray-400);
	}
	.number {
		color: var(--color-gray-600);
		font-size: 0.75rem;
		margin-right: 0.5rem;
	}
</style>
