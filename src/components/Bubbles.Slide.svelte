<script>
	import { onMount } from "svelte";
	import copy from "$data/copy.json";
	import { activeSlide, dir } from "$stores/misc.js";
	import _ from "lodash";
	import * as d3 from "d3";

	export let svg;
	export let step;

	const constant = ["chino-nacho", "becky-g", "juan-gabriel"];
	const isConstant = (id) => constant.some((d) => id.includes(d));

	let mounted = false;
	let artistsWithAudio = [];

	const enterBubbles = () => {
		const toEnter = Array.from(document.querySelectorAll("g"))
			.filter((d) => d.id.includes("-bubble") || d.id.includes("-audio"))
			.filter((d) => !step || d.id.endsWith(step));
		toEnter.forEach((el) => {
			el.style.transformOrigin = "center";
			const randomDelay = _.random(0, 800);
			const opacityDestination =
				el.getAttribute("opacity") > 0 ? el.getAttribute("opacity") > 0 : 1;
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
			group.style.pointerEvents = "auto";
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
				console.log({ id });
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

	$: step, stepChange();
	$: between =
		(step === 1 && $dir === "left") || (step === 2) & ($dir === "right");

	const stepChange = () => {
		if (!mounted) return;

		enterBubbles();

		if (between) {
			const startingPositions = constant.map((id) =>
				document
					.querySelector(`g#${id}-audio-${step === 1 ? 2 : 1}`)
					.getBoundingClientRect()
			);
			const endingPositions = constant.map((id) =>
				document.querySelector(`g#${id}-audio-${step}`).getBoundingClientRect()
			);
			// console.log({ startingPositions, endingPositions });
		}

		const toExit = Array.from(document.querySelectorAll("g"))
			.filter((d) => d.id.includes("-bubble") || d.id.includes("-audio"))
			.filter((d) => !step || !d.id.endsWith(step));
		toExit.forEach((el) => {
			if (between) {
				el.style.transformOrigin = "center";
				el.style.animation = `bounce-out calc(var(--1s) * 0.8) both`;
			} else {
				el.style.animation = "";
				el.style.opacity = 0;
			}
		});
	};

	onMount(() => {
		mounted = true;
		if (step) {
			stepChange();
		} else {
			enterBubbles();
		}
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
			transform: scale(1);
		}
		70% {
			opacity: var(--opacity-destination);
			transform: scale(0.85);
		}
		100% {
			opacity: var(--opacity-destination);
			transform: scale(1);
		}
	}
	@keyframes -global-bounce-out {
		0% {
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0);
		}
	}
</style>
