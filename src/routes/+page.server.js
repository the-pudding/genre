// import data from '$data/rank.csv'

export async function load() {

	// let rankings = [];
	// data.forEach(d => {
	// 	console.log(d)
	// 	let date = d["genre"];
	// 	let genres = Object.keys(d);
	// 	genres = genres.filter(d => {
	// 		return d != "genre";
	// 	})
	// 	let toPush = {date:date,ranking:[]};
	// 	genres.filter(k => {
	// 		return +d[k] > 0;
	// 	}).forEach(j => {
	// 		toPush.ranking.push({genre:j,rank:+d[j]});
	// 	})

	// 	toPush["ranking"] = toPush["ranking"].sort((a,b) => {
	// 		return a.rank - b.rank;
	// 	})

	// 	rankings.push(toPush);
	// })

	// return { data };
	const data = ["a", "b", "c"];
	return { data };
}