<script>
	import browser from "webextension-polyfill";
	import Dash from "./components/Dash.svelte";
	import { popup, productData, view_mode } from "./util/store";
	import Breakdown from "./components/Breakdown.svelte";
    import Popup from "./components/Popup.svelte";
	import { fade } from 'svelte/transition';
	import { onMount } from "svelte";

	function change() {
	  browser.storage.local.set({ background: image });
	}

	onMount(async () => {
		chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
			let url = tabs[0].url;
			let dom = await fetch('http://localhost:5000/get-text', {
				method: 'POST',
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: { 'Content-Type': 'application/json'},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({url: url})
			}).then((res) => {
				res.json().then(function(data) {
					console.log(data)
					productData.set(data)
				});
			})
		});
	})
</script>

<main>
	{#if $popup}
		<div in:fade={{duration: 500}} out:fade={{duration: 500}}>
			<Popup/>
		</div>
	{/if}
	{#if $view_mode}
		<Dash data={$productData}/>
	{:else}
		<Breakdown/>
	{/if}
</main>

<style>
	:global(:root) {
		--main: #92E3A9
	}
	:global(button) {
		transition: 0.25s ease-in;
	}
	:global(button:hover) {
		cursor: pointer;
	}
	main {
		width: 300px;
		height: 400px;
		background-color: rgb(223, 236, 228);
		font-family: 'Roboto', sans-serif;
		border-radius: 5px;
		overflow: auto;
	}
	main::-webkit-scrollbar {
		display: none;
	}

</style>

