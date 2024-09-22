<script>
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {Calendar} from '$lib/components/ui/calendar';
    import * as Popover from "$lib/components/ui/popover";
    import {Input} from '$lib/components/ui/input';
    import * as Select from '$lib/components/ui/select';
    import {Button} from '$lib/components/ui/button';
    import {Switch} from '$lib/components/ui/switch';
    import {Textarea} from '$lib/components/ui/textarea';
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import * as Pagination from '$lib/components/ui/pagination';

    let page = 1;
    let title = 'Datos del estudiante'

    export let data = {
      nombres: '',
      apellidos: '',
      documento: '',
      tipoid_id: 0,
      mupioexp_id: 0,
      fechanace: '',
      direccion: '',
      municipio_id: 0,
      barrio_id: 0,
      telefono: '',
      enfermedad: '',
      emernombre: '',
      emertelefono: '',
      tipoemer: '',
    }

    export let typeOfDocument = []

    export let Municipality = [];

    export let neighborhood = []

    const nationality = [
        {value: '1', label: 'Colombiano'},
        {value: '2', label: 'Venezolano'},
        {value: '3', label: 'Ecuatoriano'},
        {value: '4', label: 'Peruano'},
        {value: '5', label: 'Brasileño'},
        {value: '6', label: 'Argentino'},
        {value: '7', label: 'Chileno'},
        {value: '8', label: 'Uruguayo'},
        {value: '9', label: 'Paraguayo'},
        {value: '10', label: 'Boliviano'},
        {value: '11', label: 'Mexicano'},
        {value: '12', label: 'Estadounidense'},
        {value: '13', label: 'Canadiense'},
        {value: '14', label: 'Español'},
        {value: '15', label: 'Portugués'},
        {value: '16', label: 'Francés'},
        {value: '17', label: 'Alemán'},
        {value: '18', label: 'Italiano'},
        {value: '19', label: 'Inglés'},
        {value: '20', label: 'Holandés'},
        {value: '21', label: 'Sueco'},
        {value: '22', label: 'Noruego'},
        {value: '23', label: 'Danés'},
        {value: '24', label: 'Finlandés'},
        {value: '25', label: 'Ruso'},
        {value: '26', label: 'Chino'},
        {value: '27', label: 'Japonés'},
        {value: '28', label: 'Coreano'},
        {value: '29', label: 'Indio'},
        {value: '30', label: 'Australiano'},
        {value: '31', label: 'Neozelandés'},
        {value: '32', label: 'Sudafricano'},
        {value: '33', label: 'Nigeriano'},
        {value: '34', label: 'Argelino'},
        {value: '35', label: 'Marroquí'},
    ]

    const occupation = [
        {value: '1', label: 'Ama de casa'},
        {value: '2', label: 'Estudiante'},
        {value: '3', label: 'Empleado'},
        {value: '4', label: 'Independiente'},
        {value: '5', label: 'Desempleado'},
        {value: '6', label: 'Pensionado'},
        {value: '7', label: 'Otro'},
    ];

    $:{
        if (page === 1) {
            title = 'Datos del Estudiante'
        }else if (page === 2) {
            title = 'Datos del Padre'
        }else if (page === 3) {
            title = 'Datos de la Madre'
        }else if (page === 4) {
            title = 'Datos del Acudiente'
        }else if (page === 5) {
            title = 'Datos del Declarante'
        }else if (page === 6) {
            title = 'Datos Financieros del Declarante Tributario'
        }else if (page === 7) {
            title = 'Actividad En Operaciones Internacionales del Declarante Tributario'
        }else if (page === 8) {
            title = 'Finalizar'
        }
    }

</script>

<div class=" m-16 text-center " >
    <h1 class=" text-3xl font-bold" >{title}</h1>
</div>

<div class=" h-2/3 mx-5 overflow-x-hidden overflow-y-auto" >
    {#if page === 1}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nombres} disabled />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellidos} disabled />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación</label>
                <Select.Root onSelectedChange={(v)=> data.tipoid_id = v.value}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Tipo de Documento" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Documentos</Select.Label>
                      {#each typeOfDocument as document}
                        <Select.Item value={document.id} label={document.nombre}
                          >{document.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="TypeofDocument" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="numberofid">Número de identificación</label>
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.documento} disabled />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.mupioexp_id = v.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Fecha de nacimiento</label>
                <Popover.Root>
                  <Popover.Trigger asChild let:builder>
                    <Button
                      variant="outline"
                      class=
                        "w-[300px] justify-start text-left font-normal"
                      builders={[builder]}
                      disabled
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {data.fechanace ? data.fechanace : 'Elige una fecha'}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0">
                    <Calendar bind:value={data.fechanace} />
                  </Popover.Content>
                </Popover.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="address">Dirección de residencia <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="address" placeholder="Dirección de residencia" bind:value={data.direccion} />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.municipio_id = v.value}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Municipio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Barrio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.barrio_id = v.value}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Barrio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Barrios</Select.Label>
                      {#each neighborhood as item}
                        <Select.Item value={item.id} label={item.nombre}
                          >{item.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="neighborhood" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="landlinephone">Teléfono fijo <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="landlinephone" placeholder="Teléfono fijo" bind:value={data.telefono} />
            </div>
            <div class="flex flex-col gap-1.5 items-center">
                <label for="diseases">Enfermedades o alergias sufridas por el estudiante</label>
                <Textarea class="w-[300px] sm:w-[642px]" placeholder="Explícanos tu situación." bind:value={data.enfermedad} />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <p>En caso de urgencia ¿a quién podemos llamar? (diferente a papá y mamá)</p>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="person'sname">Nombre de la persona <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="person'sname" placeholder="Nombre" bind:value={data.emernombre} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="person'snumber">Teléfono o celular <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="person'snumber" placeholder="Teléfono o celular." bind:value={data.emertelefono} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="person'srelationship">Parentesco <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="person'srelationship" placeholder="Parentesco" bind:value={data.tipoemer} />
            </div>
        </div>
    {:else if page === 2}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="">Estado</label>
                <RadioGroup.Root value="comfortable">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Presente" id="r1" />
                      <label for="r1">Presente</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Sin información" id="r2" />
                      <label for="r2">Sin información</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Fallecido" id="r3" />
                      <label for="r3">Fallecido</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Tipo de Documento" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Documentos</Select.Label>
                      {#each typeOfDocument as document}
                        <Select.Item value={document.id} label={document.nombre}
                          >{document.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="TypeofDocument" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="numberofid">Número de identificación</label>
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Email">Email</label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular</label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
    {:else if page === 3}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="">Estado</label>
                <RadioGroup.Root value="comfortable">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Presente" id="r1" />
                      <label for="r1">Presente</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Sin información" id="r2" />
                      <label for="r2">Sin información</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Fallecido" id="r3" />
                      <label for="r3">Fallecido</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Tipo de Documento" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Documentos</Select.Label>
                      {#each typeOfDocument as document}
                        <Select.Item value={document.id} label={document.nombre}
                          >{document.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="TypeofDocument" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="numberofid">Número de identificación</label>
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Email">Email</label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular</label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
    {:else if page === 4}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Seleccione el acudiente</label>
                <RadioGroup.Root value="Padre">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Presente" id="r1" />
                      <label for="r1">Padre</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Madre" id="r2" />
                      <label for="r2">Madre</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Tercera persona" id="r3" />
                      <label for="r3">Tercera persona</label>
                    </div>
                </RadioGroup.Root>
            </div>
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Tipo de relación con el estudiante</label>
                <RadioGroup.Root value="comfortable">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Abuelo (a)" id="r1" />
                      <label for="r1">Abuelo (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Hermano (a)" id="r2" />
                      <label for="r2">Hermano (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Padrastro – Madrastra" id="r3" />
                      <label for="r3">Padrastro – Madrastra</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Tío (a)" id="r5" />
                      <label for="r5">Tío (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Primo (a)" id="r6" />
                      <label for="r6">Primo (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Sustituto ICBF" id="r7" />
                      <label for="r7">Sustituto ICBF</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Tipo de Documento" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Documentos</Select.Label>
                      {#each typeOfDocument as document}
                        <Select.Item value={document.id} label={document.nombre}
                          >{document.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="TypeofDocument" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="numberofid">Número de identificación</label>
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Email">Email</label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular</label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
    {:else if page === 5}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Seleccione el acudiente</label>
                <RadioGroup.Root value="Padre">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Presente" id="r1" />
                      <label for="r1">Padre</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Madre" id="r2" />
                      <label for="r2">Madre</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Tercera persona" id="r3" />
                      <label for="r3">Tercera persona</label>
                    </div>
                </RadioGroup.Root>
            </div>
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Tipo de relación con el estudiante</label>
                <RadioGroup.Root value="comfortable">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Abuelo (a)" id="r1" />
                      <label for="r1">Abuelo (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Hermano (a)" id="r2" />
                      <label for="r2">Hermano (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Padrastro – Madrastra" id="r3" />
                      <label for="r3">Padrastro – Madrastra</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Tío (a)" id="r5" />
                      <label for="r5">Tío (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Primo (a)" id="r6" />
                      <label for="r6">Primo (a)</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Sustituto ICBF" id="r7" />
                      <label for="r7">Sustituto ICBF</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Tipo de Documento" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Documentos</Select.Label>
                      {#each typeOfDocument as document}
                        <Select.Item value={document.id} label={document.nombre}
                          >{document.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="TypeofDocument" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="numberofid">Número de identificación</label>
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Email">Email</label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular</label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Fecha de nacimiento</label>
                <Popover.Root>
                  <Popover.Trigger asChild let:builder>
                    <Button
                      variant="outline"
                      class=
                        "w-[300px] justify-start text-left font-normal"
                      builders={[builder]}
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      Elige una fecha
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0">
                    <Calendar />
                  </Popover.Content>
                </Popover.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Nacionalidad</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Nacionalidad" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Nacionalidades</Select.Label>
                      {#each nationality as item}
                        <Select.Item value={item.value} label={item.label}
                          >{item.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Ocupación y oficio</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Ocupación y oficio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Ocupaciones</Select.Label>
                      {#each occupation as item}
                        <Select.Item value={item.value} label={item.label}
                          >{item.label}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Residence-address">Dirección de residencia</label>
                <Input class="w-[300px]" type="text" id="Residence-address" placeholder="Dirección de residencia" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Municipio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each Municipality as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
    {:else if page === 6}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="Assets">Activos</label>
                <Input class="w-[300px]" type="number" id="Assets" placeholder="Activos" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="passive">Pasivos</label>
                <Input class="w-[300px]" type="number" id="passive" placeholder="Pasivos" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="patrimony">Patrimonio</label>
                <Input class="w-[300px]" type="number" id="patrimony" placeholder="Patrimonio" />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="patrimony">Otros ingresos</label>
                <Input class="w-[300px]" type="number" id="patrimony" placeholder="Otros ingresos" />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="Other income concept" >Concepto otros ingresos</label>
                <Input class="w-[300px]" type="number" id="Other income concept" placeholder="Concepto otros ingresos" />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">¿Por su cargo maneja recursos públicos?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Por su cargo o actividad ejerce algún grado de poder público?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Existe algún vínculo entre usted y una persona considerada públicamente expuesta?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Es usted sujeto de obligaciones tributarias en otro país o grupo de países?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
           <div class="flex flex-col gap-1.5 items-center">
                <label for="diseases">¿Cuál es el origen de sus ingresos?</label>
                <Textarea class="w-[300px] sm:w-[642px]" placeholder="Explícanos tu situación." />
            </div> 
        </div>
    {:else if page === 7}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Realiza operaciones en moneda extranjera?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">¿Realiza alguna de estas operaciones?</label>
                <RadioGroup.Root value="comfortable">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Ninguna" id="r1" />
                      <label for="r1">Ninguna</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Importaciones" id="r2" />
                      <label for="r2">Importaciones</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Exportaciones" id="r3" />
                      <label for="r3">Exportaciones</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Inversiones" id="r5" />
                      <label for="r5">Inversiones</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Transferencias" id="r6" />
                      <label for="r6">Transferencias</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="Otras" id="r7" />
                      <label for="r7">Otras</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Posee cuentas bancarias en moneda extranjera?</label>
                <Select.Root portal={null}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value="si" label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value="no" label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
    {/if}
</div>

<div class="w-screen p-2 overflow-hidden" >
  <Pagination.Root count={100} perPage={13} let:pages let:currentPage onPageChange={(e)=> page = e} class="mt-10 " >
    <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton />
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item isVisible={currentPage == page.value}>
          <Pagination.Link {page} isActive={currentPage == page.value}>
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton />
    </Pagination.Item>
  </Pagination.Content>
  </Pagination.Root>
</div>

