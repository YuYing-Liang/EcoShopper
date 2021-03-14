<script>
import { popup, productData, view_mode } from "../util/store";
// export let data
</script>

<div class="breakdown">
    {#if $productData}
    <section>
        <h2>Sustainability Ratings</h2>
        {#if $productData["categories"]}
        <ul>
            <li>
                <img src="images/carbonemissions.png" alt="Carbon Emissions">
                <div>
                    <h5>Carbon Emissions: <span>{$productData["categories"]['co2_emissions']}g</span></h5>
                    <p>From transportation and material production, this product has low carbon emissions</p>
                </div>
            </li>
            <li>
                <img src="images/waterconsumption.png" alt="Water Consumption">
                <div>
                    <h5>Water Consumption: <span>{$productData["categories"]['water_consump']}L</span></h5>
                    <p>From material production to packaging, this product has low water consumption</p>
                </div>
            </li>
            <li>
                <img src="images/wasteproduction.png" alt="Waste Production">
                <div>
                    <h5>Waste Production: <span>0.5g</span></h5>
                    <p>Most of these products are recyclable!</p>
                </div>
            </li>
            <li>
                <img src="images/longevity.png" alt="Longevity">
                <div>
                    <h5>Product Longevity: <span>multiple years</span></h5>
                    <p>This is a long-term product</p>
                </div>
            </li>
        </ul>
        {:else}
            <ul>
                <li> Loading ... </li>
            </ul>
        {/if}
    </section>
    <section>
        <h2>Transportation</h2>
        <div class="distance">
            <div class="loc" style="--address: '3 Yonge St. Toronto, ON'"/>
            <div class="line" style="--dist: '15.3km'"/>
            <div class="loc" style="--address: '3 Ossington Rd. Toronto, ON'"/>
        </div>
        <p>Results in 500g of carbon put into the air</p>
        <p></p>
    </section>
    <section>
        <h2>Shipping Packaging</h2>
        <div class="package">
            <div class="width-line" style="--width: '25cm'"/>
            <div class="square" style="--height: '15cm'"/>
        </div>
        <p>This is a 375cm<sup>2</sup> bubble wrap package that can be recycled</p>
        <p>If not recycled: 125g going to landfill</p>
    </section>
    <section>
        <h2>Product Material</h2>
        <h5>Materials Detected:</h5>
        <ul class="materials">
            <li>
                <div class="percent" style="--num: '80%'"/>
                <div class="information">
                    <h5>Plastic</h5>
                    <p><b>Production:</b> required __L of water, __ kg of crude oil</p>
                    <p><b>End of Life:</b> Recyclable</p>
                    <p><b>Not Reusable</b></p>
                </div>
            </li>
            <li>
                <div class="percent" style="--num: '20%'"/>
                <div class="information">
                    <h5>Rayon</h5>
                    <p><b>Production:</b> required __L of water, __ kg of crude oil</p>
                    <p><b>End of Life:</b> Landfill</p>
                    <p><b>Very Reusable</b></p>
                </div>
            </li>
        </ul>
    </section>
    {/if}
    <button class="main" on:click={() => view_mode.set(true)}> Back </button>
    <button class="main" on:click={() => popup.set(true)}> $6.80 - Carbon Cost </button>
    <img class="bkg" src="images/nature2.png" alt="background"/>
</div>

<style>
    h1, h2, h3 {
        margin: 0 0 0.75rem 0;
    }
    h4, h5, h6 {
        margin: 0 0 0.25rem 0;
    }
    .breakdown{
        padding: 0.85rem;
        height: 100%;
        position: relative;
    }
    section {
        margin: 0 0 1.5rem 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    li {
        margin: 0 0 0.5rem 0;
        padding: 0 0.5rem;
        border: 1px solid #424242;
        border-radius: 10px;
        background-color: white;
    }
    p { margin: 0.15rem 0 0.25rem 0;}
    h5 { font-weight: 500; font-size: 12px; }
    img, ul li div {
        display: inline-block;
        vertical-align: middle;
    }
    img {
        width: 27.5%;
        margin: 0.25rem 0.75rem 0.25rem 0.25rem;
    }
    ul li div {
        width: 60%;
    }

    /* transportation */
    .distance {
        width: 100%;
        margin: 1.5rem 0;
    }
    .loc, .line {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
    }
    .loc {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: darkgreen;
        position: relative;
    }
    .loc::before {
        position: absolute;
        content: var(--address);
        backdrop-filter: blur(2px);
        border: 1px solid darkgreen;
        background-color: white;
        color: darkgreen;
        font-size: 8px;
        border-radius: 5px;
        max-width: 120px;
        white-space: nowrap;
        font-weight: 300;
        padding: 0.1rem 0.25rem;
        top: -17px
    }
    .loc:last-of-type::before {
        right: 0;
    }
    .line {
        width: 85%;
        height: 2px;
        background-color: #424242;
        position: relative;
    }
    .line::before {
        position: absolute;
        content: var(--dist);
        color: #424242;
        left: 40%;
        bottom: -17px;
        font-weight: 500;
    }

    /* shipping packaging */
    .package {
        margin: 1.5rem 0;
    }
    .square {
        background-color: var(--main);
        width: 100px;
        height: 60px;
        position: relative;
        margin: 0.5rem auto;
    }
    .square::before {
        position: absolute;
        height: 100%;
        width: 2px;
        right: -0.55rem;
        background-color: #424242;
        content: '';
    }
    .square::after{
        position: absolute;
        content: var(--height);
        right: -45px;
        top: 40%;
    }
    .width-line {
        margin: 0 auto;
        width: 100px;
        height: 2px;
        background-color: #424242;
        position: relative;
    }
    .width-line::before {
        content: var(--width);
        position: absolute;
        top: -15px;
        left: 40%;
    }

    /* Materials */
    .information{
        padding: 0.75rem 0;
        margin-left: 0.75rem;
        display: inline-block;
        width: calc(85% - 50px);
    }
    .information p {
        font-size: 10px;
    }
    .percent {
        width: 50px; 
        height: 50px;
        border-radius: 50%;
        background: var(--main);
        background-image: linear-gradient(to right, transparent 50%, #fff 0);
        margin: 0 5px;
        position: relative;
    }
    .percent::before {
        content: '';
        display: block;
        margin-left: 50%;
        height: 100%;
        border-radius: 0 100% 100% 0 / 50%;
        background-color: inherit;
        transform-origin: left;
        transform: rotate(72deg);
    }
    .percent::after {
        content: var(--num);
        display: block;
        font-size: 18px;
        font-weight: 500;
        position: absolute;
        top: 25%; left: 25%;
    }
    b{
        font-weight: 500;
    }

    .bkg {
        position: absolute;
        bottom: -10%;
        left: 5%;        
        z-index: 1;
        width: 90%;
    }
</style>