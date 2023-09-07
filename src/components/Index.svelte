<script>
	import Tap from "$components/helpers/Tap.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";

	let sliderEl;

	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
	};
</script>

<Slider bind:this={sliderEl}>
	{#each [1, 2, 3, 4, 5] as i}
		<Slide>
			<p>{i}: hello world</p>
		</Slide>
	{/each}
</Slider>

<Tap
	debug={false}
	full={true}
	size="50%"
	enableKeyboard={true}
	marginTop={0}
	on:tap={onTap}
/>
