<script>
	import Button from "$components/Button.svelte";
	import { activeSlide } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import Icon from "$components/helpers/Icon.svelte";

	let audioEl;
	let currentTime;
	let paused = true;

	const playPause = () => {
		if (paused) audioEl.play();
		else audioEl.pause();
	};
	const onEnded = () => {
		audioEl.currentTime = 0;
	};
	const beats = [
		0.12610699999999997, 0.31207399999999996, 0.62738, 1.078659, 1.2276,
		1.628101, 1.9950700000000001, 2.394888, 2.660818, 2.829057, 3.111591,
		3.460518, 3.7455499999999997, 4.160536, 5.028248, 5.239879, 5.510698,
		5.928105, 6.16283, 6.344296, 6.911195, 7.262243, 7.479173, 7.894392,
		8.145274, 8.428849, 9.111003, 9.277569, 9.460962, 9.878239, 10.327807,
		10.529025, 11.427675, 11.928874, 12.744108, 13.078134, 13.344397, 13.511507,
		13.677786, 14.195346, 14.477823, 14.711025, 14.927809, 15.245475, 15.527317,
		16.111704, 16.327299, 16.661087, 16.97842, 17.32859, 17.811363, 18.961494,
		19.261622, 19.762409, 19.961992, 20.295306, 20.712607, 21.028399, 21.229177,
		21.439003, 22.078913, 22.278599, 22.461572, 22.629314, 22.861338, 23.295602,
		23.595609, 24.027797, 24.344746, 24.561354, 24.778111, 25.245551, 25.51157,
		25.812001, 26.078082, 26.378616, 26.62883
	];

	$: buttonText = `${paused ? "Play" : "Pause"} the interview`;
	$: words = copy.slides
		.find((d) => +d.slide === $activeSlide)
		.quote.split(" ");
</script>

<div class="quote">
	<Button onClick={playPause} ariaLabel={buttonText}>{buttonText}</Button>

	<strong class="words">
		{#each words as word, i}
			{@const dark = currentTime >= beats[i]}
			<span class:dark>{word} </span>
		{/each}
	</strong>

	<audio
		bind:this={audioEl}
		bind:paused
		bind:currentTime
		on:ended={onEnded}
		src={"assets/sound/glenn.mp3"}
	/>
	<track kind="subtitles" src="assets/captions/glenn.vtt" srclang="en" />
</div>

<style>
	.quote {
		display: flex;
		flex-direction: column;
		align-items: start;
		width: 100%;
		margin: 0 auto;
	}
	.words {
		font-size: 20px;
		font-family: var(--sans);
		margin-top: 1rem;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}
	.words span {
		transition: opacity calc(var(--1s) * 0.6);
		opacity: 0.6;
	}
	.words span.dark {
		opacity: 1;
	}
</style>
