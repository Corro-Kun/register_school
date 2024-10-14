<script>
    import * as Table from "$lib/components/ui/table";
    import { onMount } from "svelte";
    import { navigate } from "astro:transitions/client";
    import {Button} from '$lib/components/ui/button';
    import * as XLSX from 'xlsx';

    let data = [];

    onMount(async () => {
        const response = await fetch("/api/reservation/data",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            }
        });
        if (response.status !== 200) {
            navigate("/admin");
            return;
        }
        data = await response.json();
    });

    function download(){
        let x = [];

        x = data.map((item, i) =>{
            return {
                "Nro": i+1,
                "Nombres Estudiante": item.nombres,
                "Apellidos Estudiante": item.apellidos,
                "Numero de Identificación Estudiante": item.documento,
                "Tipo de Documento Declarante": item.abreviacion,
                "Numero de Identificación Declarante": item.declaradocumento,
                "Nombres Declarante": item.declaranombres,
                "Apellidos Declarante": item.declaraapellidos,
                "Régimen Fiscal": JSON.parse(item.inftributaria).ResponsableIVA? "RESPONSABLE DE IVA": "NO RESPONSABLE DE IVA",
                "CIIU": JSON.parse(item.inftributaria).CIUU,
                "Tipo de Persona": JSON.parse(item.inftributaria).Persona,
                "Dirección": item.declaradireccion,
                "Municipio": item.municipio,
                "Correo": item.declaraemail
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(x);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

        XLSX.writeFile(workbook, 'Informe Tributaria.xlsx');
    }
</script>

<div class="flex flex-col w-full h-full overflow-y-auto items-start gap-4 p-2" >
    <Button on:click={download} >Descargar</Button>
    <div class="rounded-md border overflow-x-visible">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>
                        Nombres Estudiante
                    </Table.Head>
                    <Table.Head>
                        Apellidos Estudiante
                    </Table.Head>
                    <Table.Head>
                        Numero de Identificación E.
                    </Table.Head>
                    <Table.Head>
                        Tipo de Documento D.
                    </Table.Head>
                    <Table.Head>
                        Numero de Identificación D.
                    </Table.Head>
                    <Table.Head>
                        Nombres Declarante
                    </Table.Head>
                    <Table.Head>
                        Apellidos Declarante
                    </Table.Head>
                    <Table.Head>
                        Régimen Fiscal
                    </Table.Head>
                    <Table.Head>
                        CIIU
                    </Table.Head>
                    <Table.Head>
                        Tipo de Persona
                    </Table.Head>
                    <Table.Head>
                        Dirección
                    </Table.Head>
                    <Table.Head>
                        Municipio
                    </Table.Head>
                    <Table.Head>
                        Correo
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each data as item}
                    <Table.Row>
                        <Table.Cell>
                            {item.nombres}
                        </Table.Cell>
                        <Table.Cell>
                            {item.apellidos}
                        </Table.Cell>
                        <Table.Cell>
                            {item.documento}
                        </Table.Cell>
                        <Table.Cell>
                            {item.abreviacion}
                        </Table.Cell>
                        <Table.Cell>
                            {item.declaradocumento}
                        </Table.Cell>
                        <Table.Cell>
                            {item.declaranombres}
                        </Table.Cell>
                        <Table.Cell>
                            {item.declaraapellidos}
                        </Table.Cell>
                        <Table.Cell>
                            {JSON.parse(item.inftributaria).ResponsableIVA? "RESPONSABLE DE IVA": "NO RESPONSABLE DE IVA"}
                        </Table.Cell>
                        <Table.Cell>
                            {JSON.parse(item.inftributaria).CIUU}
                        </Table.Cell>
                        <Table.Cell>
                            {JSON.parse(item.inftributaria).Persona}
                        </Table.Cell>
                        <Table.Cell>
                            {item.declaradireccion}
                        </Table.Cell>
                        <Table.Cell>
                            {item.municipio}
                        </Table.Cell>
                        <Table.Cell>
                            {item.declaraemail}
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</div>
