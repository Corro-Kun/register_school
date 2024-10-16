<script>
    import {Input} from '$lib/components/ui/input';
    import {Button} from '$lib/components/ui/button';
    import toast from "svelte-french-toast";
    import { navigate } from "astro:transitions/client";

    export let id;
    let code = '';
    let button = true;

    async function oath(){
        const res = await fetch('/api/verif/'+id,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'codigo': code})
        });

        if (res.status !== 200){
            toast.error('Código incorrecto, vuelve a generar un código, el anterior ha expirado');
            button = true;
            return;
        }else{
            navigate('/reserva/'+id);
            return;
        }
    }

    async function get(){
        const res = await fetch('/api/verif/'+id);

        if(res.status === 404){
            navigate('/reserva');
            return;
        }

        toast.success('Código generado');
        button = false;
    }

</script>
<div class="h-full w-full flex items-center justify-center flex-col gap-2" >
    <h2 class="text-3xl font-bold" >Autenticación</h2>
    <Input class="w-[300px]" type="text" id="password" placeholder="Código" bind:value={code} />
    {#if button}
        <Button class="mt-4" type="submit" on:click={get} >Generar Código</Button>
    {/if}
    <Button class="mt-4" type="submit" on:click={oath} >Autenticar</Button>
</div>