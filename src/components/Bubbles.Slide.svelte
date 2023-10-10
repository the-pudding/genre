<script>
	import { onMount } from "svelte";
	import copy from "$data/copy.json";
	import { activeSlide, dir } from "$stores/misc.js";
	import _ from "lodash";
	import * as d3 from "d3";

	export let svg;

	let artistsWithAudio = [];
	$: special =
		($activeSlide === 17 && $dir === "right") ||
		($activeSlide === 16 && $dir === "left");

	const enterBubbles = () => {
		let ignore = [];
		if (special) {
			const audioEls = Array.from(document.querySelectorAll("g")).filter((d) =>
				d.id.includes("-audio")
			);
			ignore = [document.querySelector("#hip-hop-bubble"), ...audioEls];

			// move audio elements from the invisible spot to where they are
			const origins = Array.from(document.querySelectorAll("g")).filter((d) =>
				d.id.includes("-origin")
			);
			console.log({ origins });
		}

		const toEnter = Array.from(document.querySelectorAll("g"))
			.filter((d) => d.id.includes("-bubble") || d.id.includes("-audio"))
			.filter((d) => !ignore.includes(d));
		toEnter.forEach((el) => {
			el.style.transformOrigin = "center";
			const randomDelay = _.random(0, 800);
			const opacityDestination = el.getAttribute("opacity") || 1;
			el.style.setProperty("--opacity-destination", opacityDestination);
			el.style.animation = `bounce-in calc(var(--1s) * 0.8) ${randomDelay}ms both`;
		});
	};

	const interactiveAudio = () => {
		const audioGroups = Array.from(document.querySelectorAll("g")).filter((d) =>
			d.id.includes("-audio")
		);
		artistsWithAudio = audioGroups.map((d) => ({
			id: d.id.split("-").slice(0, -1).join("-"),
			url: copy.artists[d.id.split("-").slice(0, -1).join("-")]
		}));
		audioGroups.forEach((group) => {
			group.addEventListener("mouseenter", () => {
				group.style.cursor = "pointer";
				const rect = group.querySelector("rect");
				const color = rect.getAttribute("fill");
				rect.setAttribute("fill", d3.color(color).darker(0.5));
			});
			group.addEventListener("mouseleave", () => {
				const rect = group.querySelector("rect");
				const color = rect.getAttribute("fill");
				rect.setAttribute("fill", d3.color(color).brighter(0.5));
			});
			group.addEventListener("click", () => {
				const id = group.id.split("-").slice(0, -1).join("-");
				const audioEl = document.querySelector(`audio#${id}`);
				if (audioEl) {
					if (audioEl.paused) audioEl.play();
					else audioEl.pause();
				}
				artistsWithAudio
					.filter((d) => d.id !== id)
					.forEach((d) => {
						const audioEl = document.querySelector(`audio#${d.id}`);
						if (audioEl) audioEl.pause();
					});
			});
		});
	};

	onMount(() => {
		enterBubbles();
		interactiveAudio();
	});
</script>

{@html svg}
{#each artistsWithAudio as { id, url }}
	<audio {id} src={url || copy.artists["bad-bunny"]} />
{/each}

<style>
	@keyframes -global-bounce-in {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}
		50% {
			opacity: var(--opacity-destination);
			transform: scale(1.05);
		}
		70% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes -global-bounce-out {
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(0.95);
		}
		50% {
			opacity: var(--opacity-destination);
			transform: scale(1.1);
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
		}
	}
</style>
