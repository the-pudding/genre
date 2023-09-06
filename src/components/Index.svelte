<script>
	import { getContext, onMount } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	// import Footer from "$components/Footer.svelte";
	import GenreData from '$data/rank.csv'
	// const copy = getContext("copy");
	// const data = getContext("data");
	let dataForChart;


	const getColor = d => {
		let old = dataForChart[0].ranking.slice(0,40).map(d => d.genre);
		if(old.indexOf(d.genre) == -1) {
			return "red"
		}
		return "white";
	}

	onMount(() => {

		let rankings = [];
		GenreData.forEach(d => {
			let date = d["genre"];
			let genres = Object.keys(d);
			genres = genres.filter(d => {
				return d != "genre";
			})
			let toPush = {date:date,ranking:[]};
			genres.filter(k => {
				return +d[k] > 0;
			}).forEach(j => {
				toPush.ranking.push({genre:j,rank:+d[j]});
			})

			toPush["ranking"] = toPush["ranking"].sort((a,b) => {
				return a.rank - b.rank;
			})

			rankings.push(toPush);
		})
		dataForChart = rankings;
	})
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet">
</svelte:head>

{#if dataForChart}
<table>
	<tbody>
	<tr class="wrapper">
		{#each dataForChart.filter((d,i) => i == 0 || i == dataForChart.length - 1) as item}
			<td class="col">
				<p class="date">{item.date}</p>
				<!-- <div class="genre-ranking"> -->
					{#each item.ranking as genre}
						<div class="item" style="
							color:{getColor(genre)};
						">{genre.genre} ({genre.rank})</div>
					{/each}
				<!-- </div> -->
			</td>
		{/each}
	</tr>
	</tbody>
</table>
{/if}

<style>
	.date {
		font-family: var(--font-display);
	}
	table {
		width: auto;
    	overflow: scroll;
		margin-left: 10px;
	}
.wrapper {
	/* display: flex; */
}
.col {
	/* display: flex;
	flex-direction: column;
	margin-right: 10px; */
}

.genre-ranking {
	/* display: flex;
	flex-direction: column; */
}

.item {
	white-space: nowrap;
	font-family: var(--sans);
	/* display: inline-block; */
}

</style>
<!-- <WIP />
<Demo /> -->
