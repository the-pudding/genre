<script>
	import Chapters from "$components/Chapters.svelte";
	import Tap from "$components/helpers/Tap.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Figure from "$components/Figure.svelte";
	import Audio from "$components/Audio.svelte";
	import copy from "$data/copy.json";
	import { activeSlide, dir, videoMuted } from "$stores/misc.js";
	import { onMount } from "svelte";

	let sliderEl;

	const slides = copy.slides.map((d) => ({
		...d,
		text: d.text.map((t) => ({
			...t,
			text: t.text
				.replaceAll("##-##", "<span class='punctuation'>-</span>")
				.replaceAll("##;##", "<span class='punctuation'>;</span>")
				.replaceAll("##:##", "<span class='punctuation'>:</span>")
		}))
	}));

	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
		window.scrollTo(0, 0);
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
					id: "bad-bunny",
					color: "#AED8FF",
					slide: 10,
					inline: true
				}
			});
		}

		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState !== "visible") {
				const audioToMute = Array.from(
					document.querySelectorAll("audio")
				).filter((d) => !d.paused);
				const videoToMute = Array.from(
					document.querySelectorAll("video")
				).filter((d) => !d.muted);
				audioToMute.forEach((d) => d.pause());
				videoToMute.forEach((d) => (d.muted = true));
				if (videoToMute.length > 0) $videoMuted = true;
			}
		});
	});
</script>

<Chapters />
<article>
	<Slider bind:this={sliderEl} bind:current={$activeSlide} duration="0">
		{#each slides as slide, i}
			<Slide index={i}>
				{#each slide.text as { type, text }}
					<svelte:element this={type} class="slide-content">
						{@html text}
					</svelte:element>
				{/each}
			</Slide>
		{/each}
	</Slider>
</article>

<Figure />

<Tap
	debug={false}
	full={true}
	directions={$activeSlide === 0 ? ["right"] : ["left", "right"]}
	size={$activeSlide === 0 ? "100%" : ["33%", "67%"]}
	enableKeyboard={true}
	marginTop={0}
	on:tap={onTap}
/>

<style>
	article {
		position: absolute;
		top: 2rem;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100%;
		max-width: 45rem;
		padding: 1rem;
		z-index: 3;
		pointer-events: none;
	}
	p {
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 120%;
		letter-spacing: -0.02em;
	}
	:global(h1) {
		padding-right: 2px;
	}
	:global(.slide a) {
		pointer-events: auto;
		white-space: nowrap;
	}
	:global(.slide:last-of-type) {
		margin-top: 3rem;
		text-align: center;
	}
	:global(span.punctuation) {
		vertical-align: middle;
	}

	@media (max-width: 600px) {
		:global(.slide:last-of-type) {
			margin-top: 0;
		}
	}
</style>
