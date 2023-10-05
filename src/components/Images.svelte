<script>
	import { activeSlide } from "$stores/misc.js";
</script>

<div class="grid">
	{#each [1, 2, 3, 4] as i}
		<img src={`assets/img/pushback${i}.png`} class={`img${i}`} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		width: 100%;
		height: 100%;
		background: grey;
		grid-template-columns: minmax(auto, 100px) repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 20px;
		grid-row-gap: 20px;
	}
	img {
	}
	.img1 {
		grid-row: 1;
		grid-column: 1/3;
	}
	.img2 {
		grid-row: 2;
		grid-column: 2/3;
	}
	.img3 {
		grid-row: 3;
		grid-column: 1;
	}
	.img4 {
		grid-row: 3;
		grid-column: 2;
	}
</style>
