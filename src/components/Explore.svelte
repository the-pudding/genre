<script>
	import Icon from "$components/helpers/Icon.svelte";
</script>

<div class="explore">
	<strong>Explore the data</strong>
	<img src={"assets/img/explore.png"} alt="Explore the data" />
	<button
		>Go to the Google Sheet
		<span class="icon">
			<Icon name="external-link" />
		</span>
	</button>
</div>

<style>
	.explore {
		padding-top: 10%;
		overflow: hidden;
	}
	strong {
		font-size: 1.3rem;
	}
	img {
		margin-top: 1.5rem;
		width: 100%;
	}
	button {
		background: black;
		color: white;
		font-weight: 700;
		font-size: 1.3rem;
		border-radius: 20px;
		padding: 0.5rem 1rem;
		display: flex;
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
