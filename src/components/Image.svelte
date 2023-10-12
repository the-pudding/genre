<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { activeSlide } from "$stores/misc.js";

	$: explore = $activeSlide === 35;
	$: src =
		$activeSlide === 29 ? "assets/img/birds.png" : "assets/img/explore.png";
	$: alt = $activeSlide === 29 ? "Birds" : "Explore the data";
</script>

<div class="img-wrapper" class:explore>
	{#if explore}<h4>Explore the data</h4>{/if}
	<img {src} {alt} />
</div>

{#if explore}
	<button
		>Go to the Google Sheet
		<span class="icon">
			<Icon name="external-link" />
		</span>
	</button>
{/if}

<style>
	.img-wrapper {
		width: 100%;
		max-width: 40rem;
		margin: auto;
	}
	.img-wrapper.explore {
		width: 100%;
		position: absolute;
		aspect-ratio: 0.5;
		overflow: visible;
		top: 80px;
		left: 1rem;
	}
	img {
		width: 100%;
	}
	strong {
		font-size: 18px;
		width: calc(100% - 2rem);
		margin: 0 auto;
		display: block;
	}
	button {
		background: black;
		color: white;
		font-weight: 500;
		width: 100%;
		max-width: 240px;
		font-size: 18px;
		border-radius: 20px;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 4rem;
		left: 50%;
		transform: translate(-50%, 0);
		pointer-events: auto;
	}
	button:hover {
		background: #333;
	}
	.icon {
		margin-left: 0.5rem;
	}
</style>
