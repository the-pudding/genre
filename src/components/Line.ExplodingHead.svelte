<script>
	import _ from "lodash";
	import { onMount } from "svelte";

	export let x;
	export let y;
	export let deg;

	let headEl;
	let visible = false;
	let exited = false;

	onMount(() => {
		const delay = _.random(800, 1500);
		setTimeout(() => {
			visible = true;

			setTimeout(() => {
				exited = true;
			}, 3000);
		}, delay);
	});
</script>

<div
	bind:this={headEl}
	class="explode"
	class:visible
	class:exited
	style={`--rotate: ${deg}deg`}
	style:left={`${x}%`}
	style:top={`${y}%`}
>
	🤯
</div>

<style>
	.explode {
		position: absolute;
		font-size: 5rem;
		opacity: 0;
		transform: translate(-50%, -50%) scale(0) rotate(var(--rotate));
		transition: all var(--1s) ease-in-out;
	}
	.explode.visible {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1.3) rotate(var(--rotate));
	}
	.explode.exited {
		opacity: 0;
		transform: translate(-50%, 75vh) scale(1.3) rotate(var(--rotate));
	}

	@media (max-width: 600px) {
		.explode {
			font-size: 3rem;
		}
	}
</style>
