<script>
	import Icon from "$components/helpers/Icon.svelte";
</script>

<div class="explore">
	<strong>Explore the data</strong>
	<div class="img-wrapper">
		<img src={"assets/img/explore.png"} alt="Explore the data" />
	</div>
	
	<button
		>Go to the Google Sheet
		<span class="icon">
			<Icon name="external-link" />
		</span>
	</button>
</div>

<style>
	.img-wrapper {
		width: 100%;
		position: absolute;
		aspect-ratio: .5;
		overflow: visible;
		top: 80px;
		left: 1rem;
	}
	.explore {
		padding-top: 10%;
		overflow: hidden;
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
	}
	button:hover {
		background: #333;
	}
	.icon {
		margin-left: 0.5rem;
	}
</style>
