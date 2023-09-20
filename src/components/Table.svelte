<script>
	import rank from "$data/rank.csv";

	export let props;
	$: ({ title, date, highlight } = props);

	const numToDisplay = 10;

	$: allRanks = rank.find((d) => d.genre === date);
	$: genres = Object.keys(allRanks);
	$: display = genres
		.map((d) => ({ genre: d, rank: +allRanks[d] }))
		.filter((d) => d.rank && d.rank > 0)
		.sort((a, b) => a.rank - b.rank)
		.slice(0, numToDisplay);
</script>

{#if title}
	<strong>{title}</strong>
{/if}
{#each display as { genre, rank }}
	<div class:highlight={highlight && highlight.includes(genre)}>
		{rank}. {genre}
	</div>
{/each}

<style>
	.highlight {
		color: red;
	}
</style>
