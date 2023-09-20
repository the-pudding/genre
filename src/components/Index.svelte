<script>
	import Tap from "$components/helpers/Tap.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Table from "$components/Table.svelte";
	import copy from "$data/copy.json";

	const slides = copy.slides;
	let sliderEl;

	const onTap = ({ detail }) => {
		if (detail === "right") sliderEl.next();
		else sliderEl.prev();
	};

	const components = { Table };
</script>

<article>
	<Slider bind:this={sliderEl}>
		{#each slides as slide}
			<Slide>
				{#each slide.content as { type, text, component, classname, ...props }}
					<svelte:element this={type} class={classname}>
						{#if text}
							{@html text}
						{:else}
							<svelte:component this={components[component]} {props} />
						{/if}
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
		max-width: 60rem;
		margin: auto;
		padding: 1rem;
	}
</style>
