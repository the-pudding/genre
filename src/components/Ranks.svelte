<script>
	import Legend from "$components/Ranks.Legend.svelte";
	import rank from "$data/rank.csv";
	import geo from "$data/geo.csv";
	import { activeSlide } from "$stores/misc.js";
	import _ from "lodash";

	export let columns;

	const numToDisplay = 25;

	const newToTop25 = [
		"urbano latino",
		"trap latino",
		"reggaeton",
		"filmi",
		"k-pop",
		"pov:indie",
		"musica mexicana",
		"modern rock",
		"alternative metal",
		"permanent wave",
		"sad sierreno",
		"sierreno",
		"contemporary country",
		"modern bollywood",
		"norteno",
		"corrido",
		"latin pop",
		"latin pop"
	];
	$: columns = $activeSlide < 2 ? ["4/23/2016"] : ["4/23/2016", "8/9/2023"];
	$: numColumns = columns.length;
	$: highlightList =
		$activeSlide === 3 || $activeSlide === 4
			? newToTop25.map((d) => ({
					genre: d,
					highlight: "var(--color-emphasis)"
			  }))
			: $activeSlide === 5
			? genreList.map((d) => ({
					genre: d,
					highlight:
						geo.find((g) => g.genre === d).region === "west/english"
							? "var(--color-english)"
							: "var(--color-nonenglish)"
			  }))
			: [];
	$: bottomFade = $activeSlide === 0;
	$: legend = $activeSlide === 5;
	$: genreList = data.reduce((acc, current) => {
		const genres = current.ranks.map((d) => d.genre);
		return _.uniq([...acc, ...genres]);
	}, []);
	$: data = rank
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
</script>

<div class="table-wrapper" class:slide={$activeSlide === 0}>
	{#if legend}
		<Legend />
	{/if}
	<table class:full={numColumns > 1}>
		<caption>Genres, ranked by streams on Spotify</caption>
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
						{@const color = highlightList.find(
							(d) => d.genre === genre
						)?.highlight}
						{@const highlight =
							($activeSlide === 3 || $activeSlide === 4) &&
							newToTop25.find((d) => d === genre)}
						<td style:color>
							<div class:highlight>
								{#if col === 0}
									<span class="number">{row + 1}</span>
								{/if}
								{genre}
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>

		{#if bottomFade}
			<div class="fade" />
		{/if}
	</table>
</div>

<style>
	.table-wrapper {
		font-family: var(--sans);
	}
	table {
		max-width: 20rem;
	}
	table.full {
		max-width: 40rem;
	}
	caption {
		font-weight: 700;
	}
	thead {
		border-bottom: 2px solid var(--color-gray-800);
		color: var(--color-gray-600);
		font-weight: 600;
	}
	th:first-child {
		padding-left: 1rem;
	}
	thead th {
		font-weight: 500;
		padding-bottom: 0.1rem;
	}
	tr {
		border-bottom: 1px solid var(--color-gray-400);
	}
	td {
		padding: 2px 0;
		font-weight: 500;
	}
	.highlight {
		width: fit-content;
		text-decoration: underline;
	}
	.number {
		color: var(--color-gray-600);
		font-size: 0.75rem;
		width: 14px;
		display: inline-block;
		text-align: left;
	}
	.fade {
		background: linear-gradient(
			rgba(251, 249, 244, 0),
			rgba(251, 249, 244, 0.8)
		);
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 60%;
	}

	@media (max-width: 600px) {
		td {
			line-height: 1;
		}
	}
</style>
