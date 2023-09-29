<script>
	import { onMount } from "svelte";

	export let svg;

	onMount(() => {
		const circles = document.querySelectorAll("circle");
		circles.forEach((circle) => {
			const endR = circle.getAttribute("r");
			circle.setAttribute("r", 0);
			circle.style.transition = "r var(--1s) ease-in-out";
			setTimeout(() => {
				circle.setAttribute("r", endR);
			}, 0);
		});
	});
</script>

{@html svg}
