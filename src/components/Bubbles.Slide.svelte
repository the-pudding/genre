<script>
	import { onDestroy, onMount } from "svelte";
	import copy from "$data/copy.json";
	import { dir } from "$stores/misc.js";
	import _ from "lodash";
	import * as d3 from "d3";

	export let constant;
	export let svg;
	export let step;

	const isConstant = (id) => constant.some((d) => id.includes(d));

	let mounted = false;
	let artistsWithAudio = [];
	let startingStep;
	let startingPositions;
	let endingPositions;
	let animationFrame;

	const enterBubbles = () => {
		const between =
			(step === 1 && $dir === "left") || (step === 2 && $dir === "right");
		const toEnter = Array.from(document.querySelectorAll("g"))
			.filter((d) => d.id.includes("-bubble") || d.id.includes("-audio"))
			.filter((d) => !step || d.id.endsWith(step))
			.filter((d) => !between || !isConstant(d.id));

		toEnter.forEach((el) => {
			el.style.transformOrigin = "center";
			const randomDelay = _.random(0, 800);
			const opacityDestination =
				el.getAttribute("opacity") > 0 ? el.getAttribute("opacity") > 0 : 1;
			el.style.setProperty("--opacity-destination", opacityDestination);
			el.style.opacity = 1;
			el.style.animation = `bounce-in calc(var(--1s) * 0.8) ${randomDelay}ms both`;
		});
	};
	const exitBubbles = () => {
		const between =
			(step === 1 && $dir === "left") || (step === 2 && $dir === "right");
		if (!between) return;

		const hipHopBubble = document.querySelector("g#hip-hop-bubble");
		if (hipHopBubble) {
			if (step === 1) hipHopBubble.style.opacity = 1;
			else hipHopBubble.style.opacity = 0.5;
		}

		const toExit = Array.from(document.querySelectorAll("g"))
			.filter(
				(d) =>
					d.id !== "hip-hop-bubble" &&
					(d.id.includes("-bubble") || d.id.includes("-audio"))
			)
			.filter((d) => !step || !d.id.endsWith(step))
			.filter((d) => !between || !isConstant(d.id));

		toExit.forEach((el) => {
			el.style.transformOrigin = "center";
			el.style.animation = `bounce-out calc(var(--1s) * 0.8) both`;
		});
	};
	const move = () => {
		const between =
			(step === 1 && $dir === "left") || (step === 2 && $dir === "right");
		if (between) {
			constant.forEach((id, i) => {
				const el = document.querySelector(`g#${id}-audio-${startingStep}`);
				const dx = endingPositions[i].x - startingPositions[i].x;
				const dy = endingPositions[i].y - startingPositions[i].y;

				el.style.animation = "";
				el.style.opacity = 1;

				el.getBoundingClientRect(); // force reflow

				if (step !== startingStep)
					el.style.transform = `translate(${dx}px, ${dy}px)`;
				else el.style.transform = `translate(0px, 0px)`;
			});
		}
	};
	const interactiveAudio = () => {
		const audioGroups = Array.from(document.querySelectorAll("g")).filter(
			(d) => d.id.includes("-audio") && (!step || d.id.endsWith(startingStep))
		);
		artistsWithAudio = audioGroups.map((d) => ({
			id: d.id
				.split("-")
				.slice(0, step ? -2 : -1)
				.join("-"),
			url: copy.artists[
				d.id
					.split("-")
					.slice(0, step ? -2 : -1)
					.join("-")
			]
		}));
		audioGroups.forEach((group) => {
			group.style.pointerEvents = "auto";
			group.setAttribute("tabindex", 0);
			group.addEventListener("mouseenter", () => {
				group.style.cursor = "pointer";
				const fg = group.querySelector('rect[id^="fg"]');
				const color = fg.getAttribute("fill");
				fg.setAttribute("fill", "var(--color-audio-dark)");
			});
			group.addEventListener("mouseleave", () => {
				const fg = group.querySelector('rect[id^="fg"]');
				const color = fg.getAttribute("fill");
				fg.setAttribute("fill", "var(--color-audio)");
			});
			group.addEventListener("click", () => onClick(group));
			group.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick(e.target);
				}
			});
		});
	};
	const onClick = (group) => {
		const id = group.id
			.split("-")
			.slice(0, step ? -2 : -1)
			.join("-");
		const audioEl = document.querySelector(`audio#${id}`);
		const bg = group.querySelector('rect[id^="bg"]');
		const fg = group.querySelector('rect[id^="fg"]');
		const fullWidth = bg.getAttribute("width");

		if (!audioEl) return;

		if (audioEl.paused) {
			// play me
			audioEl.play();
			if (animationFrame) cancelAnimationFrame(animationFrame);
			let audioDuration = audioEl.duration;

			// pause + restart everyone else
			artistsWithAudio
				.filter((d) => d.id !== id)
				.forEach((d) => {
					const audioEl = document.querySelector(`audio#${d.id}`);
					if (audioEl) {
						audioEl.pause();
						audioEl.currentTime = 0;
					}
					const myFg = document
						.querySelector(`g#${d.id}-audio${step ? `-${startingStep}` : ""}`)
						.querySelector('rect[id^="fg"]');
					const myBg = document
						.querySelector(`g#${d.id}-audio${step ? `-${startingStep}` : ""}`)
						.querySelector('rect[id^="fg"]');
					myFg.style.width = myBg.getAttribute("width");
				});

			const animate = () => {
				if (audioEl.currentTime < audioDuration) {
					const percent = (audioDuration - audioEl.currentTime) / audioDuration;
					fg.style.width = `${fullWidth * percent}px`;
					animationFrame = requestAnimationFrame(animate);
				} else {
					cancelAnimationFrame(animationFrame);
					audioEl.currentTime = 0;
					fg.style.width = fullWidth;
					audioEl.pause();
				}
			};

			// start animating my progress
			animationFrame = requestAnimationFrame(animate);
		} else {
			// pause me
			audioEl.pause();
			// stop animating my progress
			if (animationFrame) cancelAnimationFrame(animationFrame);
		}
	};

	$: step, stepChange();
	const stepChange = async () => {
		if (!mounted) return;
		enterBubbles();
		exitBubbles();
		move();
	};

	onMount(() => {
		mounted = true;
		startingStep = step;
		if (step) {
			// set up
			const els = Array.from(document.querySelectorAll("g")).filter(
				(d) =>
					d.id !== "hip-hop-bubble" &&
					(d.id.includes("-bubble") || d.id.includes("-audio"))
			);
			els.forEach((el) => {
				el.style.opacity = 0;
				el.style.transform = "translate(0px, 0px)";
				el.style.transition = "transform var(--1s) ease-in-out";
			});

			// set up hip hop bubble
			const hipHopBubble = document.querySelector("g#hip-hop-bubble");
			if (hipHopBubble) {
				hipHopBubble.style.transition =
					"opacity calc(0.3 * var(--1s)) ease-in-out";
				if (step === 1) hipHopBubble.style.opacity = 1;
				else hipHopBubble.style.opacity = 0.5;
			}

			startingPositions = constant.map((id) => {
				const el = document.querySelector(`g#${id}-audio-${startingStep}`);
				const rect = el.querySelector('rect[id^="bg"]');
				return { x: rect.getAttribute("x"), y: rect.getAttribute("y") };
			});
			endingPositions = constant.map((id) => {
				const el = document.querySelector(
					`g#${id}-audio-${startingStep === 1 ? 2 : 1}`
				);
				const rect = el.querySelector('rect[id^="bg"]');
				return { x: rect.getAttribute("x"), y: rect.getAttribute("y") };
			});

			stepChange();
		} else {
			enterBubbles();
		}
		interactiveAudio();
	});
	onDestroy(() => {
		if (animationFrame) cancelAnimationFrame(animationFrame);
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
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0);
		}
	}
</style>
