<script>
	import { getContext, onMount } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	// import Footer from "$components/Footer.svelte";
	import GenreData from '$data/rank.csv'
	// const copy = getContext("copy");
	// const data = getContext("data");
	let dataForChart;
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

{#if dataForChart}
<table>
	<tbody>
	<tr class="wrapper">
		{#each dataForChart as item}
			<td class="col">
				<p>{item.date}</p>
				<!-- <div class="genre-ranking"> -->
					{#each item.ranking.slice(0,500) as genre}
						<div class="item">{genre.genre} ({genre.rank})</div>
					{/each}
				<!-- </div> -->
			</td>
			
		{/each}
	</tr>
	</tbody>
</table>
{/if}

<style>
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
	/* display: inline-block; */
}

</style>
<!-- <WIP />
<Demo /> -->
