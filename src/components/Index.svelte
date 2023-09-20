<script>
	import Tap from "$components/helpers/Tap.svelte";
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import Table from "$components/Table.svelte";
	import copy from "$data/copy.json";
	import pointer from "$svg/pointer.svg";

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
		{#each slides as slide, i}
			<Slide index={i}>
				{#each slide.content as { type, text, component, classname, ...props }}
					<svelte:element this={type} class={classname}>
						{#if text}
							{@html text}
						{:else}
							<svelte:component this={components[component]} {props} />
						{/if}
					</svelte:element>
				{/each}

				{#if i === 0}
					<div class="tap">
						<strong>Tap to continue</strong>
						{@html pointer}
					</div>
				{/if}
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
	.tap {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		align-items: center;
	}
</style>
