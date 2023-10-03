<script>
	import { onMount } from "svelte";
	import copy from "$data/copy.json";
	import _ from "lodash";
	import * as d3 from "d3";

	export let svg;

	let artistsWithAudio = [];

	const enterExit = () => {
		const circles = document.querySelectorAll("circle");
		circles.forEach((circle) => {
			const endR = circle.getAttribute("r");
			circle.setAttribute("r", 0);
			circle.style.transition = "r var(--1s) ease-in-out";
			setTimeout(() => {
				circle.setAttribute("r", endR);
			}, 0);
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
		enterExit();
		interactiveAudio();
	});
</script>

{@html svg}
{#each artistsWithAudio as { id, url }}
	<audio {id} src={url || copy.artists["bad-bunny"]} />
{/each}
