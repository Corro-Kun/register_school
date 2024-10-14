<script>
    import {Input} from '$lib/components/ui/input';
    import {Button} from '$lib/components/ui/button';
    import toast from "svelte-french-toast";
    import { navigate } from "astro:transitions/client";

    let password = '';

    async function login(){
        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'password': password})
        });

        if (res.status === 401){
          toast.error('Contraseña incorrecta');
          return;
        }

        const token = await res.json();

        localStorage.setItem('token', token.token);

        navigate('/admin/tabla');
    }
</script>

<div class="h-full w-full flex items-center justify-center flex-col gap-2" >
    <h2 class="text-3xl font-bold" >Admin</h2>
    <Input class="w-[300px]" type="password" id="password" placeholder="Contraseña" bind:value={password} />
    <Button class="mt-4" type="submit" on:click={login} >Ingresar</Button>
</div>