<script>
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {Calendar} from '$lib/components/ui/calendar';
    import * as Popover from "$lib/components/ui/popover";
    import {Input} from '$lib/components/ui/input';
    import * as Select from '$lib/components/ui/select';
    import {Button} from '$lib/components/ui/button';
    import {Switch} from '$lib/components/ui/switch';
    import {Textarea} from '$lib/components/ui/textarea';
    import { Checkbox } from "$lib/components/ui/checkbox/";
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import * as Pagination from '$lib/components/ui/pagination';
    import toast from "svelte-french-toast";
    import { PDFDocument, rgb } from 'pdf-lib';

    let page = 1;
    let title = 'Datos del estudiante'

    export let data = {
      nombres: '',
      apellidos: '',
      documento: '',
      tipoid_id: 0,
      tipoid_label_frontend: '',
      mupioexp_id: 0,
      mupioexp_label_frontend: '',
      fechanace: '',
      direccion: '',
      municipio_id: 0,
      municipio_label_frontend: '',
      barrio_id: 0,
      barrio_label_frontend: '',
      telefono: '',
      enfermedad: '',
      emernombre: '',
      emertelefono: '',
      tipoemer: '',
      nompadre: '',
      apellpadre: '',
      docpadre: '',
      emailpadre: '',
      padrecelular: '',
      tipoidpadre_id: 0,
      tipoidpadre_label_frontend: '',
      munexppadre_id: 0,
      munexppadre_label_frontend: '',
      padrevivo: null,
      nommadre: '',
      apellmadre: '',
      docmadre: '',
      madreemail: '',
      madrecelular: '',
      tipoidmadre_id: 0,
      tipoidmadre_label_frontend: '',
      munexpmadre_id: 0,
      munexpmadre_label_frontend: '',
      madrevive: null,
      acuparentesco_id: null,
      nomacu: '',
      apellacu: '',
      docacu: '',
      tipoidacu_id: 0,
      tipoidacu_label_frontend: '',
      munexpacu_id: 0,
      munexpacu_label_frontend: '',
      acuemail: '',
      acucelular: '',
      declaratipo: 0,
      declaranombres: '',
      declaraapellidos: '',
      declaradocumento: '',
      declaratipoid: 0,
      declaratipoid_label_frontend: '',
      declaraemail: '',
      declaracelular: '',
      declarafechanace: '',
      declaralugarnace: 0,
      declaralugarnace_label_frontend: '',
      declaradireccion: '',
      declarareside: 0,
      declarareside_label_frontend: '',
      declaraocupacion: '',
      declaralugarexpide: 0,
      declaralugarexpide_label_frontend: '',
      decactivos: '',
      decpasivos: '',
      decpatrimonio: '',
      decotrosing: '',
      decconcepto: '',
      decrpublicos: null,
      decppublic: null,
      decvincpublico: null,
      decextranjero: null,
      decorigen: '',
      decmonextern: null,
      deccuentasme: null,
    }

    let acu = null;

    let dec = null;

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

    export let occupation = [];

    export let relationship = []

    let loading = 0;
    let messageLoading = '¿Enviar formulario?';

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

    async function formartData(){
      loading = 1;
      messageLoading = 'Ordenando datos...';

      if (acu === '0'){
        data.nomacu = data.nompadre;
        data.apellacu = data.apellpadre;
        data.docacu = data.docpadre;
        data.tipoidacu_id = data.tipoidpadre_id;
        data.munexpacu_id = data.munexppadre_id;
        data.acuemail = data.emailpadre;
        data.acucelular = data.padrecelular;
        data.tipoidacu_label_frontend = data.tipoidpadre_label_frontend;
        data.munexpacu_label_frontend = data.munexppadre_label_frontend;
      }else if(acu === '1'){
        data.nomacu = data.nommadre;
        data.apellacu = data.apellmadre;
        data.docacu = data.docmadre;
        data.tipoidacu_id = data.tipoidmadre_id;
        data.munexpacu_id = data.munexpmadre_id;
        data.acuemail = data.madreemail;
        data.acucelular = data.madrecelular;
        data.tipoidacu_label_frontend = data.tipoidmadre_label_frontend;
        data.munexpacu_label_frontend = data.munexpmadre_label_frontend;
      }

      if (dec === '0'){
        data.declaranombres = data.nompadre;
        data.declaraapellidos = data.apellpadre;
        data.declaradocumento = data.docpadre;
        data.declaratipoid = data.tipoidpadre_id;
        data.declaraemail = data.emailpadre;
        data.declaracelular = data.padrecelular;
        data.declaratipoid_label_frontend = data.tipoidpadre_label_frontend;
        data.declaralugarexpide_label_frontend = data.munexppadre_label_frontend;
      }else if (dec === '1'){
        data.declaranombres = data.nommadre;
        data.declaraapellidos = data.apellmadre;
        data.declaradocumento = data.docmadre;
        data.declaratipoid = data.tipoidmadre_id;
        data.declaraemail = data.madreemail;
        data.declaracelular = data.madrecelular;
        data.declaratipoid_label_frontend = data.tipoidmadre_label_frontend;
        data.declaralugarexpide_label_frontend = data.munexpmadre_label_frontend;
      }

      fillOutForm();
    }

    async function fillOutForm(){
      messageLoading = 'Creando pdf...';

      try {
        const pdfUrl = '/Reserva.pdf';
        const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // student data

        pdfDoc.getPage(0).drawText(data.nombres,{
          x: 120,
          y: pdfDoc.getPage(0).getHeight() - 138,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.apellidos,{
          x: 357,
          y: pdfDoc.getPage(0).getHeight() - 138,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.tipoid_label_frontend,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() - 150.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.documento,{
          x: 435,
          y: pdfDoc.getPage(0).getHeight() - 151,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.mupioexp_label_frontend,{
          x: 325,
          y: pdfDoc.getPage(0).getHeight() - 162.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.fechanace,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() - 175,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.municipio_label_frontend,{
          x: 420,
          y: pdfDoc.getPage(0).getHeight() - 175,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.direccion,{
          x: 184,
          y: pdfDoc.getPage(0).getHeight() - 187.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.barrio_label_frontend,{
          x: 452,
          y: pdfDoc.getPage(0).getHeight() - 187.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.telefono,{
          x: 184,
          y: pdfDoc.getPage(0).getHeight() - 199.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.emernombre,{
          x: 370,
          y: 178,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.emertelefono,{
          x: 420,
          y: 165,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.tipoemer,{
          x: 387,
          y: 153.5,
          size: 10,
          color: rgb(0,0,0)
        });

        // father data

        pdfDoc.getPage(0).drawText(data.nompadre,{
          x: 120,
          y: pdfDoc.getPage(0).getHeight() - 236,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.apellpadre,{
          x: 357,
          y: pdfDoc.getPage(0).getHeight() - 236,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.tipoidpadre_label_frontend,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() - 248.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.docpadre,{
          x: 435,
          y: pdfDoc.getPage(0).getHeight() - 248.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.munexppadre_label_frontend,{
          x: 325,
          y: pdfDoc.getPage(0).getHeight() - 260.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.emailpadre,{
          x: 90,
          y: pdfDoc.getPage(0).getHeight() - 272.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.padrecelular,{
          x: 405,
          y: pdfDoc.getPage(0).getHeight() - 285,
          size: 10,
          color: rgb(0,0,0)
        });

        // mother data

        pdfDoc.getPage(0).drawText(data.nommadre,{
          x: 120,
          y: pdfDoc.getPage(0).getHeight() - 321.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.apellmadre,{
          x: 357,
          y: pdfDoc.getPage(0).getHeight() - 321.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.tipoidmadre_label_frontend,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() - 334,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.docmadre,{
          x: 435,
          y: pdfDoc.getPage(0).getHeight() - 334,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.munexpmadre_label_frontend,{
          x: 325,
          y: pdfDoc.getPage(0).getHeight() - 346,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.madreemail,{
          x: 90,
          y: pdfDoc.getPage(0).getHeight() - 358,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.madrecelular,{
          x: 405,
          y: pdfDoc.getPage(0).getHeight() - 370,
          size: 10,
          color: rgb(0,0,0)
        });

        // acudiente data

        pdfDoc.getPage(0).drawText(data.nomacu,{
          x: 120,
          y: 275,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.apellacu,{
          x: 357,
          y: 275,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.tipoidacu_label_frontend,{
          x: 168,
          y: 262.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.docacu,{
          x: 435,
          y: 262.5,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.munexpacu_label_frontend,{
          x: 325,
          y: 251,
          size: 10,
          color: rgb(0,0,0)
        })

        pdfDoc.getPage(0).drawText(data.acuemail,{
          x: 90,
          y: 238.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.acucelular,{
          x: 405,
          y: 226,
          size: 10,
          color: rgb(0,0,0)
        });

        // declarante data

        pdfDoc.getPage(0).drawText(data.declaranombres,{
          x: 120,
          y: pdfDoc.getPage(0).getHeight() -406.5,
          size: 10,
          color: rgb(0,0,0)
        }); 

        pdfDoc.getPage(0).drawText(data.declaraapellidos,{
          x: 357,
          y: pdfDoc.getPage(0).getHeight() -406.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaratipoid_label_frontend,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() -419,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaradocumento,{
          x: 435,
          y: pdfDoc.getPage(0).getHeight() -419,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaralugarexpide_label_frontend,{
          x: 325,
          y: pdfDoc.getPage(0).getHeight() -431,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaradireccion,{
          x: 168,
          y: pdfDoc.getPage(0).getHeight() -443.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declarareside_label_frontend,{
          x: 467,
          y: pdfDoc.getPage(0).getHeight() -443.5,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaraemail,{
          x: 90,
          y: pdfDoc.getPage(0).getHeight() -456,
          size: 10,
          color: rgb(0,0,0)
        });

        pdfDoc.getPage(0).drawText(data.declaracelular,{
          x: 390,
          y: pdfDoc.getPage(0).getHeight() -456,
          size: 10,
          color: rgb(0,0,0)
        });

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Reserva.pdf';

        link.click();

        link.remove();

        messageLoading = 'Terminado'
        loading = 2;

        save();

      } catch (error) {
        messageLoading = '¿Enviar formulario?';
        loading = 0;
        toast.error('Llene todos los campos requeridos');
      }
    }

    async function save(){
      const res = await fetch('/api/reservation/'+data.documento,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log(res);
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
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.tipoid_id = v.value
                  data.tipoid_label_frontend = v.label
                  }}>
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
                <Select.Root onSelectedChange={(v)=> {
                  data.mupioexp_id = v.value
                  data.mupioexp_label_frontend = v.label
                  }} >
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
                <Select.Root onSelectedChange={(v)=> {
                  data.municipio_id = v.value
                  data.municipio_label_frontend = v.label
                  }}>
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
                <Select.Root onSelectedChange={(v)=> {
                  data.barrio_id = v.value
                  data.barrio_label_frontend = v.label
                  }}>
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
                <label for="">Estado <strong class=" text-red-600" >*</strong> </label>
                <RadioGroup.Root bind:value={data.padrevivo} >
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='1' id="r1" />
                      <label for="r1">Presente</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='2' id="r2" />
                      <label for="r2">Sin información</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='0' id="r3" />
                      <label for="r3">Fallecido</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        {#if data.padrevivo === '1'}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nompadre} disabled />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellpadre} disabled />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.tipoidpadre_id = v.value
                  data.tipoidpadre_label_frontend = v.label
                  }} >
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
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docpadre} disabled />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.munexppadre_id = v.value
                  data.munexppadre_label_frontend = v.label
                  }} >
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
                <label for="Email">Email <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.emailpadre} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.padrecelular} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
        {/if}
    {:else if page === 3}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="">Estado <strong class=" text-red-600" >*</strong> </label>
                <RadioGroup.Root bind:value={data.madrevive} >
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='1' id="r1" />
                      <label for="r1">Presente</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='2' id="r2" />
                      <label for="r2">Sin información</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='0' id="r3" />
                      <label for="r3">Fallecido</label>
                    </div>
                </RadioGroup.Root>
            </div>
        </div>
        {#if data.madrevive === '1'}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres</label>
                <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nommadre} disabled />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos</label>
                <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellmadre} disabled />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.tipoidmadre_id = v.value
                  data.tipoidmadre_label_frontend = v.label
                  }} >
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
                <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docmadre} disabled />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.munexpmadre_id = v.value
                  data.munexpmadre_label_frontend = v.label
                  }} >
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
                <label for="Email">Email <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.madreemail} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.madrecelular} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
        {/if}
    {:else if page === 4}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Seleccione el acudiente <strong class=" text-red-600" >*</strong> </label>
                <RadioGroup.Root bind:value={acu} >
                    {#if data.padrevivo === '1'}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='0' id="r1" />
                      <label for="r1">Padre</label>
                    </div>
                    {/if}
                    {#if data.madrevive === '1'}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='1' id="r2" />
                      <label for="r2">Madre</label>
                    </div>
                    {/if}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='2' id="r3" on:click={()=> toast("para registrar una tercera persona como acudiente, debe adjuntar autorización autenticada en notaria de parte de los padres o copia de la resolución de custodia del menor y copia ampliada de la cédula del acudiente.", {duration: 10000})} />
                      <label for="r3">Tercera persona</label>
                    </div>
                </RadioGroup.Root>
            </div>
        
            {#if acu === '2'}
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Tipo de relación con el estudiante <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.acuparentesco_id = v.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Parentesco" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Relación</Select.Label>
                      {#each relationship as re}
                        <Select.Item value={re.id} label={re.descripcion}
                          >{re.descripcion}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            {/if}
        </div>
        {#if acu !== null}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres <strong class=" text-red-600" >*</strong> </label>
                {#if acu === '0'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nompadre} disabled />
                {:else if acu === '1'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nommadre} disabled />
                {:else if acu === '2'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nomacu} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos <strong class=" text-red-600" >*</strong> </label>
                {#if acu === '0'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellpadre} disabled />
                {:else if acu === '1'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellmadre} disabled />
                {:else if acu === '2'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellacu} />
                {/if}
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.tipoidacu_id = v.value
                  data.tipoidacu_label_frontend = v.label
                  }} disabled={acu === '2'? false: true} >
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
                <label for="numberofid">Número de identificación <strong class=" text-red-600" >*</strong> </label>
                {#if acu === '0'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docpadre} disabled />
                {:else if acu === '1'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docmadre} disabled />
                {:else if acu === '2'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docacu} />
                {/if}
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=>{
                  data.munexpacu_id = v.value
                  data.munexpacu_label_frontend = v.label
                }} disabled={acu === '2'? false: true} >
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
                <label for="Email">Email <strong class=" text-red-600" >*</strong> </label>
                {#if acu === '0'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.emailpadre} disabled />
                {:else if acu === '1'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.madreemail} disabled />
                {:else if acu === '2'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.acuemail} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular <strong class=" text-red-600" >*</strong> </label>
                {#if acu === '0'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.padrecelular} disabled />
                {:else if acu === '1'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.madrecelular} disabled />
                {:else if acu === '2'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.acucelular} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo <strong class=" text-red-600" >*</strong> </label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" />
                </div>
            </div>
        </div>
        {/if}
    {:else if page === 5}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Seleccione el declarante <strong class=" text-red-600" >*</strong> </label>
                <RadioGroup.Root bind:value={dec} >
                    {#if data.padrevivo === '1'}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='0' id="r1" />
                      <label for="r1">Padre</label>
                    </div>
                    {/if}
                    {#if data.madrevive === '1'}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='1' id="r2" />
                      <label for="r2">Madre</label>
                    </div>
                    {/if}
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='2' id="r3" on:click={()=> toast("para registrar una tercera persona como declarante, debe adjuntar autorización autenticada en notaria de parte de los padres o copia de la resolución de custodia del menor y copia ampliada de la cédula del declarante.", {duration: 10000})} />
                      <label for="r3">Tercera persona</label>
                    </div>
                </RadioGroup.Root>
            </div>
            {#if dec === '2'}
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Tipo de relación con el estudiante <strong class=" text-red-600" >*</strong> </label>
                <Select.Root>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Parentesco" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Relación</Select.Label>
                      {#each relationship as re}
                        <Select.Item value={re.id} label={re.descripcion}
                          >{re.descripcion}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            {/if}
        </div>
        {#if dec !== null}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nompadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nommadre} disabled />
                {:else if dec === '2'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.declaranombres} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellpadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellmadre} disabled />
                {:else if dec === '2'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.declaraapellidos} />
                {/if}
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.declaratipoid = v.value
                  data.declaratipoid_label_frontend = v.label
                  }} >
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
                <label for="numberofid">Número de identificación <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docpadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.docmadre} disabled />
                {:else if dec === '2'}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.declaradocumento} />
                {/if}
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> {
                  data.declaralugarexpide = v.value
                  data.declaralugarexpide_label_frontend = v.label
                }} >
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
                <label for="Email">Email <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.emailpadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.madreemail} disabled />
                {:else if dec === '2'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.declaraemail} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.padrecelular} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.madrecelular} disabled />
                {:else if dec === '2'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.declaracelular} />
                {/if}
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Fecha de nacimiento <strong class=" text-red-600" >*</strong> </label>
                <Popover.Root>
                  <Popover.Trigger asChild let:builder>
                    <Button
                      variant="outline"
                      class=
                        "w-[300px] justify-start text-left font-normal"
                      builders={[builder]}
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {data.declarafechanace ? data.declarafechanace : 'Fecha de nacimiento'}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0">
                    <Calendar bind:value={data.declarafechanace} />
                  </Popover.Content>
                </Popover.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Nacionalidad <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.declaralugarnace = v.value} >
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
                <label for="">Ocupación y oficio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.declaraocupacion = v.label} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Ocupación y oficio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Ocupaciones</Select.Label>
                      {#each occupation as item}
                        <Select.Item value={item.id} label={item.descripcion}
                          >{item.descripcion}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="Residence-address">Dirección de residencia <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="Residence-address" placeholder="Dirección de residencia" bind:value={data.declaradireccion} />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=>{
                  data.declarareside = v.value
                  data.declarareside_label_frontend = v.label
                }} >
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
        {/if}
    {:else if page === 6}
        <div class=" flex items-center justify-center gap-10 flex-wrap" >
            <div class="flex flex-col gap-1.5">
                <label for="Assets">Activos <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="Assets" placeholder="Activos" bind:value={data.decactivos} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="passive">Pasivos <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="passive" placeholder="Pasivos" bind:value={data.decpasivos} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="patrimony">Patrimonio <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="number" id="patrimony" placeholder="Patrimonio" bind:value={data.decpatrimonio} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="patrimony">Otros ingresos</label>
                <Input class="w-[300px]" type="number" id="patrimony" placeholder="Otros ingresos" bind:value={data.decotrosing} />
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="Other income concept" >Concepto otros ingresos</label>
                <Input class="w-[300px]" type="number" id="Other income concept" placeholder="Concepto otros ingresos" bind:value={data.decconcepto} />
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">¿Por su cargo maneja recursos públicos? <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(e) => data.decrpublicos = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
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
                <Select.Root onSelectedChange={(e) => data.decppublic = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
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
                <label for="">¿Existe algún vínculo entre usted y una persona considerada públicamente expuesta? <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(e) => data.decvincpublico = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
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
                <label for="">¿Es usted sujeto de obligaciones tributarias en otro país o grupo de países? <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(e) => data.decextranjero = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
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
                <label for="diseases">¿Cuál es el origen de sus ingresos? <strong class=" text-red-600" >*</strong> </label>
                <Textarea class="w-[300px] sm:w-[642px]" placeholder="Explícanos tu situación." bind:value={data.decorigen} />
            </div> 
        </div>
    {:else if page === 7}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Realiza operaciones en moneda extranjera? <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v) => data.decmonextern = v.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
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
                <p>¿Realiza alguna de estas operaciones? <strong class=" text-red-600" >*</strong> </p>
                <div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Ninguna</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Importaciones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Exportaciones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Inversiones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Transferencias</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Otras</label>
                </div>
                </div>
           </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Posee cuentas bancarias en moneda extranjera? <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v) => data.deccuentasme = v.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value='1' label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value='0' label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
        </div>
    {:else if page === 8}
        <div class="flex items-center justify-center flex-col gap-2" >
          <p>{messageLoading}</p>
          {#if loading === 0}
          <button class="px-5 py-2 bg-slate-900 text-white rounded-sm" on:click={formartData} >Enviar</button>
          {:else if loading === 1}
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="animate-spin icon icon-tabler icons-tabler-outline icon-tabler-loader-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
          {:else if loading === 2}
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
          {/if}
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

