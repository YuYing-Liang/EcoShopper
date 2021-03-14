<script>
    import { afterUpdate, onMount } from 'svelte';
    import { grade, productData, view_mode } from '../util/store'
    
    export let data;

    afterUpdate(() => {
        console.log("dash", data)
    })
</script>

<div class="dash">
    <h1> EcoShopper </h1>
    {#if data}
        <h4> Brand: {data["features"] !== undefined ? data["features"]["Brand"] : 'Not Found'} </h4>
        <h4> Seller: {data["features"] !== undefined ? data["details"]["Manufacturer"] : 'Not Found'} </h4>
        <div class="overall-grade" style="background-color: red">
            { $grade }
        </div>
    {/if}
    <table>
        <tr style="background-color: red">
            <td>Carbon Emissions</td>
            <td>D</td>
        </tr>
        <tr style="background-color: red">
            <td>Water Consumption</td>
            <td>D</td>
        </tr>
        <tr style="background-color: orange">
            <td>Waste Produced</td>
            <td>C</td>
        </tr>
        <tr style="background-color: orange">
            <td>Longevity</td>
            <td>C</td>
        </tr>
    </table>
    <button class="main" on:click={() => view_mode.set(false)}> view breakdown </button>
    <img src="images/nature.png" alt="background"/>
</div>

<style>
    .dash {
        padding: 1.25rem 0;
        height: 100%;
        position: relative;
    }
    h1, h4{
        text-align: center;
        padding: 0;
    }
    h1{
        margin: 0 0 1.15rem 0;
    }
    h4 {
        margin: 0 0 0.25rem 0;
        font-weight: 400;
        color: #424242;
    }
    .overall-grade {
        height: 70px;
        width: 70px;
        border-radius: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.5rem auto;
        font-size: 25px;
        position: relative;
        background-color: var(--main);
        z-index: 5;
        border: 2px solid #424242;
    }
    img {
        position: absolute;
        bottom: 10%;
        left: 5%;
        z-index: 1;
        width: 90%;
    }
    :global(button.main) {
        width: 150px;
        display: block;
        position: relative;
        margin: 1.25rem auto;
        border: 2px solid #424242;
        color: #424242;
        background-color: var(--main);
        font-weight: 500;
        border-radius: none;
        z-index: 5;
        font-size: 15px;
    }
    :global(.main:hover) {
        background-color: #424242;
        color: var(--main);
    }
    table {
        width: 150px;
        margin: 0.5rem auto;
        position: relative;
        z-index: 5;
        backdrop-filter: blur(2px);
    }
    table, td, tr {
        border: 0.1rem solid #424242;
        border-collapse: collapse;
    }
    td {
        padding: 0.25rem;
    }
</style>