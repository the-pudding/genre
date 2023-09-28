<script>
	import tip from "$svg/tip.svg";
	import { onMount } from "svelte";

	const spaceToGrow = 260; // TODO: dynamic

	onMount(() => {
		const tip = document.querySelector("#tip");
		const viewBox = tip
			.getAttribute("viewBox")
			.split(" ")
			.map((d) => +d);
		const newViewBox = viewBox.map((d, i) => {
			if (i === 1) return d - spaceToGrow;
			else if (i === 3) return d + spaceToGrow;
			return d;
		});
		tip.setAttribute("viewBox", newViewBox.join(" "));

		const words = document.querySelectorAll("path.mountain");
		setTimeout(() => {
			words.forEach((word) => {
				word.style.setProperty("--delay", `${Math.random() * 1000}ms`);
				word.classList.add("dropped");
			});
		}, 0);
	});
</script>

<div class="mountain">
	{@html tip}
</div>

<style>
	.mountain {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	:global(path.mountain) {
		transform: translateY(-200px);
		opacity: 0;
		transition: all calc(var(--1s) * 1.5) var(--delay) ease-in-out;
	}
	:global(path.mountain.dropped) {
		opacity: 1;
		transform: translateY(0);
	}

	@keyframes bounce {
		0% {
			transform: translateY(0%);
		}

		12% {
			transform: translateY(-10.89%);
		}

		24% {
			transform: translateY(-43.56%);
		}

		36% {
			transform: translateY(-98.01%);
		}

		54% {
			transform: translateY(-75.02%);
		}

		74% {
			transform: translateY(-98.37%);
		}

		82% {
			transform: translateY(-93.75%);
		}

		92% {
			transform: translateY(-99.34%);
		}

		96% {
			transform: translateY(-98.46%);
		}

		100% {
			transform: translateY(-100%);
		}
	}
</style>
