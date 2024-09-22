<script>
    import {Input} from '$lib/components/ui/input';
    import {Button} from '$lib/components/ui/button';
    import { navigate } from 'astro:transitions/client';


    let document = '';

    let data = {};

    let fail = false;

    async function search(){
        fail = false;

        const res = await fetch('/api/searcher/'+document);
        if(res.status === 404){
            fail = true;
            return
        }   

        data = await res.json();
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
    {#if fail}
        <p>No se encontro al estudiante</p>
    {/if}
</div>