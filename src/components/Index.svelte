<script>
	import Chapters from "$components/Chapters.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Figure from "$components/Figure.svelte";
	import Audio from "$components/Audio.svelte";
	import copy from "$data/copy.json";
	import { activeSlide, dir } from "$stores/misc.js";
	import { onMount } from "svelte";

	const slides = copy.slides;
	let sliderEl;

	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
		$dir = detail;
	};

	onMount(() => {
		const audioSpan = document.querySelector("#bad-bunny-audio");
		if (audioSpan) {
			const parentElement = audioSpan.parentElement;
			const placeholder = document.createElement("div");
			placeholder.style.width = "fit-content";
			placeholder.style.display = "inline";
			parentElement.replaceChild(placeholder, audioSpan);
			new Audio({
				target: placeholder,
				props: {
					label: "Bad Bunny",
					url: copy.artists["bad-bunny"]
				}
			});
		}
	});
</script>

<Chapters />

<Figure />
<article>
	<Slider bind:this={sliderEl} bind:current={$activeSlide} duration="0">
		{#each slides as slide, i}
			<Slide index={i}>
				{#each slide.text as { type, text, classname }}
					<svelte:element this={type} class={classname}>
						{@html text}
					</svelte:element>
				{/each}
			</Slide>
		{/each}
	</Slider>
</article>

<Tap
	debug={false}
	full={true}
	size="50%"
	enableKeyboard={true}
	marginTop={0}
	on:tap={onTap}
/>

<style>
	article {
		position: absolute;
		top: 3rem;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100%;
		max-width: 45rem;
		padding: 1rem;
	}
	p {
		font-size: 1.2rem;
	}
</style>
