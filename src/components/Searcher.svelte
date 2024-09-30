<script>
    import {Input} from '$lib/components/ui/input';
    import {Button} from '$lib/components/ui/button';
    import { navigate } from 'astro:transitions/client';


    let document = '';

    let data = {};

    let loading = 0;

    async function search(){
        loading = 1;

        const res = await fetch('/api/searcher/'+document);
        if(res.status === 404){
            loading = 2;
            return
        }  

        data = await res.json();

        loading = 0;
    }

    function redirect(){
        navigate('/reserva/'+document);
    }

</script>

<div class="w-screen h-screen flex items-center justify-center flex-col" >
    <h2 class="text-3xl font-bold transition" >Escribe el documento del estudiante</h2>
    <div class="m-5 flex flex-col items-center transition" >
        <Input class="w-[400px]" type="text" id="document" placeholder="Documento" bind:value={document} />
        <Button class="mt-5" on:click={search} >Buscar</Button>
    </div>
    {#if data.names !== undefined}
    <div class="flex w-48 h-52 flex-col items-center justify-center border-solid border-2 border-primary cursor-pointer rounded-md" on:click={redirect} >
        <picture class="flex w-[100px] h-[133px] mb-2 items-center justify-center overflow-hidden rounded-md" >
            <img class="flex w-52 h-52" src={`data:${data.type};base64,${data.photo}`} alt="">
        </picture>
        <p class="text-sm" >{data.names}</p>
        <p class="text-sm" >{data.lastnames}</p>
    </div>
    {/if}

    {#if loading === 1}
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="animate-spin icon icon-tabler icons-tabler-outline icon-tabler-loader-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
    {:else if loading === 2}
        <p>No se encontro al estudiante</p>
    {/if}
</div>