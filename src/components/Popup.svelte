<script>
import { popup } from "../util/store";


</script>

<main>
    <div class="dark" on:click={() => popup.set(false)}></div>
    <nav>
        <h3>
            We want to make it easy for you to offset your carbon footprint 
            through donations to sustainable organizations!
        </h3>
        <button class="main">Donate Cost</button>
    </nav>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }
    .dark {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgba(0,0,0,0.5);
    }
    nav {
        width: 50%;
        height: 50%;
        border-radius: 10px;
        background-color: var(--main);
        padding: 0.75rem;
    }
</style>