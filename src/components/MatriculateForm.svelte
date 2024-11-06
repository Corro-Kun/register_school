<script>
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import * as Calendar from '$lib/components/ui/calendar';
    import { Calendar as CalendarPrimitive } from "bits-ui";
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
    import {Acudiente, PadreMadre, PadreAcudiente, MadreAcudiente, Chia} from '$lib/lib/pdf_doc';
    import {navigate} from 'astro:transitions/client';
    import {onMount} from 'svelte';
    import {today, getLocalTimeZone} from "@internationalized/date";

    let page = 1;
    let title = 'Datos del estudiante';

    const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ].map((month, i) => ({ value: i + 1, label: month }));

    const yearOptions = Array.from({ length: 100 }, (_, i) => ({
      label: String(new Date().getFullYear() - i),
      value: new Date().getFullYear() - i
    }));

    let placeholder = today(getLocalTimeZone());

    export let data = {
      nombres: '',
      apellidos: '',
      documento: '',
      tipoid_id: null,
      tipoid_label_frontend: '',
      mupioexp_id: null,
      mupioexp_label_frontend: '',
      fechanace: '',
      direccion: null,
      municipio_id: null,
      municipio_label_frontend: '',
      barrio_id: null,
      barrio_label_frontend: '',
      telefono: null,
      enfermedad: '',
      emernombre: null,
      emertelefono: null,
      tipoemer: null,
      nompadre: '',
      apellpadre: '',
      docpadre: '',
      emailpadre: null,
      padrecelular: null,
      padreoficina: null,
      padretelcorto: null,
      padretelcompleto: null,
      tipoidpadre_id: null,
      tipoidpadre_label_frontend: '',
      munexppadre_id: null,
      munexppadre_label_frontend: '',
      padrevivo: null,
      nommadre: '',
      apellmadre: '',
      docmadre: '',
      madreemail: null,
      madrecelular: null,
      madreoficina: null,
      madretelcorto: null,
      madretelcompleto: null,
      tipoidmadre_id: null,
      tipoidmadre_label_frontend: '',
      munexpmadre_id: null,
      munexpmadre_label_frontend: '',
      madrevive: null,
      acuparentesco_id: null,
      acuparentesco_label_frontend: '',
      nomacu: null,
      apellacu: null,
      docacu: null,
      tipoidacu_id: null,
      tipoidacu_label_frontend: '',
      munexpacu_id: null,
      munexpacu_label_frontend: '',
      acuemail: null,
      acucelular: null,
      acuoficina: null,
      acutelcorto: null,
      acutelcompleto: null,
      declaraparentesco: null,
      declaratipo: 0,
      declaraempresa: '',
      declaranit: '',
      declaranombres: null,
      declaraapellidos: null,
      declaradocumento: null,
      declaratipoid: null,
      declaratipoid_label_frontend: '',
      declaraemail: null,
      declaracelular: null,
      declarafechanace: null,
      declaralugarnace_label_frontend: '',
      declaradireccion: null,
      declarareside: null,
      declarareside_label_frontend: '',
      declaraocupacion: null,
      declaraocupacion_label_frontend: '',
      declaralugarexpide: null,
      declaralugarexpide_label_frontend: '',
      declarapais: null,
      decactivos: null,
      decpasivos: null,
      decpatrimonio: null,
      decotrosing: '',
      decconcepto: '',
      decrpublicos: '0',
      decppublic: '0',
      decvincpublico: '0',
      decextranjero: '0',
      decorigen: null,
      decimporta: 0,
      decexporta: 0,
      decinversiones: 0,
      dectransferencias: 0,
      decotrasmact: 0,
      decmonextern: '0',
      deccuentasme: '0',
      prodtypeex: null,
      prodident: null,
      prodnum: null,
      prodmonto: null,
      prodcountr: null,
      prodmuni: null,
      prodmoneda: null,
      inftributaria: {
        ResponsableIVA: false,
        ResponsableICA: false,
        ResoluciónNumContri: '',
        ReginContri: '',
        Autorretenedor: false,
        ResoluciónNumAutorre: '',
        AutorretenedorICA: false,
        ResoluciónNumICA: '',
        CIUU: undefined,
        Persona: undefined,
      }
    }

    let acu = null;

    let dec = null;

    export let directioDec = {
      type: '',
      type_label: '',
      name: '',
      numberone: '',
      numbertwo: '',
      house: '',
      numberHouse: '',
    }

    export let typeOfDocument = [];

    export let Municipality = [];

    export let Department = [];

    export let neighborhood = [];

    export let country = [];

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

    let municipality_list = {
      Student_Exp_Dep: false,
      Student_Exp: [],
      Student_Nac_Dep: false,
      Student_Nac: [],
      Father_Exp_Dep: false,
      Father_Exp: [],
      Mother_Exp_Dep: false,
      Mother_Exp: [],
      Acu_Exp_Dep: false,
      Acu_Exp: [],
      Declarante_Exp_Dep: false,
      Declarante_Exp: [],
      Declarante_Map_Dep: false,
      Declarante_Map: [],
    }

    onMount(()=>{
      data.decmonextern = '0'
      data.deccuentasme = '0'
      data.decrpublicos = '0'
      data.decppublic = '0'
      data.decvincpublico = '0'
      data.decextranjero = '0'
      data.inftributaria = {
        ResponsableIVA: false,
        ResponsableICA: false,
        ResoluciónNumContri: undefined,
        ReginContri: undefined,
        Autorretenedor: false,
        ResoluciónNumAutorre: undefined,
        AutorretenedorICA: false,
        ResoluciónNumICA: undefined,
        CIUU: '',
        Persona: undefined,
      }
    })

    async function formartData(){
      loading = 1;
      messageLoading = 'Ordenando datos...';

      if (data.tipoid_id === undefined || data.mupioexp_id === undefined || data.municipio_id === undefined || data.barrio_id === undefined || data.direccion === undefined || data.telefono === undefined || data.emernombre === undefined || data.emertelefono === undefined || data.tipoemer === undefined){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('Llene todos los campos del estudiante');
        return;
      }else if (data.tipoidpadre_id === undefined || data.munexppadre_id === undefined || data.padrecelular === undefined || data.emailpadre ===  undefined){
        if (data.padrevivo === '1'){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos del padre');
          return;
        }
      }else if (data.tipoidmadre_id === undefined || data.munexpmadre_id === undefined || data.madrecelular === undefined || data.madreemail === undefined){
        if (data.madrevive === '1'){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos de la madre');
          return;
        }
      }

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
        data.acuparentesco_id = '1';
        data.acuparentesco_label_frontend = 'Padre';
        data.acutelcorto = data.padretelcorto;
        data.acutelcompleto = data.padretelcompleto;
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
        data.acuparentesco_id = '2';
        data.acuparentesco_label_frontend = 'Madre';
        data.acutelcorto = data.madretelcorto;
        data.acutelcompleto = data.madretelcompleto;
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
        data.declaralugarexpide = data.munexppadre_id;
        data.declaraparentesco = '1';
      }else if (dec === '1'){
        data.declaranombres = data.nommadre;
        data.declaraapellidos = data.apellmadre;
        data.declaradocumento = data.docmadre;
        data.declaratipoid = data.tipoidmadre_id;
        data.declaraemail = data.madreemail;
        data.declaracelular = data.madrecelular;
        data.declaratipoid_label_frontend = data.tipoidmadre_label_frontend;
        data.declaralugarexpide_label_frontend = data.munexpmadre_label_frontend;
        data.declaralugarexpide = data.munexpmadre_id;
        data.declaraparentesco = '2';
      }

      if (data.declarafechanace === undefined){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('Llene todos los campos del declarante');
        return;
      }

      data.declfechanace = `${data.declarafechanace.day}/${data.declarafechanace.month}/${data.declarafechanace.year}`;
      data.declfechanacedb = `${data.declarafechanace.year}-${data.declarafechanace.month}-${data.declarafechanace.day}`;

      data.padreoficina = data.padretelcompleto !== undefined ? `${data.padretelcorto}${data.padretelcompleto}` : '';
      data.madreoficina = data.madretelcompleto !== undefined ? `${data.madretelcorto}${data.madretelcompleto}` : '';
      data.acuoficina = data.acutelcompleto !== undefined ? `${data.acutelcorto}${data.acutelcompleto}` : '';

      if (data.padreoficina.length > 20){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('El teléfono del trabajo no puede tener más de 20 caracteres');
        return;
      }else if (data.madreoficina.length > 20){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('El teléfono del trabajo no puede tener más de 20 caracteres');
        return;
      }else if (data.acuoficina.length > 20){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('El teléfono del trabajo no puede tener más de 20 caracteres');
        return;
      }

      if (directioDec.type === undefined || directioDec.name === undefined){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('Llene todos los campos de la dirección del declarante');
        return;
      }

      data.declaradireccion = `${directioDec.type.toUpperCase()} ${directioDec.name.toUpperCase()}  ${directioDec.numberone.toUpperCase()}  ${directioDec.numbertwo.toUpperCase()} ${directioDec.house.toUpperCase()} ${directioDec.numberHouse.toUpperCase()}`;

      if(data.nomacu === undefined || data.apellacu === undefined || data.docacu === undefined || data.tipoidacu_id === undefined || data.munexpacu_id === undefined || data.acuemail === undefined || data.acucelular === undefined || data.acuparentesco_id === undefined){
        loading = 0;
        messageLoading = '¿Enviar formulario?';
        toast.error('Llene todos los campos del acudiente');
        return;
      }
     if(dec !== '3'){
        if (data.declaraparentesco === undefined || data.declaranombres === undefined || data.declaraapellidos === undefined || data.declaradocumento === undefined || data.declaratipoid === undefined || data.declarapais === undefined || data.declaradireccion === undefined || data.declarareside === undefined || data.declaralugarexpide === undefined || data.declaraemail === undefined || data.declaracelular === undefined || data.declarafechanace === undefined || data.declaraocupacion === undefined){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos del declarante');
          return;
        }
        if (data.decactivos === undefined || data.decpasivos === undefined || data.decpatrimonio === undefined || data.decrpublicos === undefined || data.decvincpublico === undefined || data.decextranjero === undefined || data.decorigen === undefined || data.decmonextern === undefined || data.deccuentasme === undefined || data.inftributaria.Persona === undefined){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos financieros del declarante');
          return;
        }
      }else{
        data.decrpublicos = '3'
        data.decppublic = '3'
        data.decvincpublico = '3'
        data.decextranjero = '3'
        data.decimporta = 3
        data.decexporta = 3
        data.decinversiones = 3
        data.dectransferencias = 3
        data.decotrasmact = 3
        data.decmonextern = '3'
        data.deccuentasme = '3'
        if (data.declaraempresa === undefined || data.declaranit === undefined || data.declaranombres === undefined || data.declaradocumento === undefined || data.declaratipoid === undefined || data.declaralugarexpide === undefined || data.declaradireccion === undefined || data.declaraemail === undefined || data.declaracelular === undefined || data.declarareside === undefined){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos del declarante');
          return;
        }
        if (data.inftributaria.ResponsableIVA === undefined || data.inftributaria.ResponsableICA === undefined || data.inftributaria.Persona === undefined || data.inftributaria.ResoluciónNumContri === undefined || data.inftributaria.RégimenContri === undefined || data.inftributaria.Autorretenedor === undefined || data.inftributaria.ResoluciónNumAutorre === undefined || data.inftributaria.AutorretenedorICA === undefined || data.inftributaria.ResoluciónNumICA === undefined){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          toast.error('Llene todos los campos financieros del declarante');
          return;
        }
      }

      data.decimporta = data.decimporta ? 1:0;
      data.decexporta = data.decexporta ? 1:0;
      data.decinversiones = data.decinversiones ? 1:0;
      data.dectransferencias = data.dectransferencias ? 1:0;
      data.decotrasmact = data.decotrasmact ? 1:0;

      data.inftributaria = JSON.stringify(data.inftributaria);

      messageLoading = 'Actualizando datos...';

      try {
        let res = await save();

        if (!res){
          loading = 0;
          messageLoading = '¿Enviar formulario?';
          return;
        }
        messageLoading = 'Datos guardados.';
        loading = 2;
      } catch (error) {
        messageLoading = '¿Enviar formulario?';
        loading = 0;
        toast.error('Llene todos los campos requeridos sin errores');
      }

      buttonDownload = true;
    }

    async function fillOutForm(){
      try {
        if (import.meta.env.PUBLIC_SCHOOL === 'medellin'){
          if (data.padrevivo !== '1' & data.madrevive !== '1'){
            await Acudiente(data);
          }else if (data.padrevivo === '1' & data.madrevive !== '1'){
            await PadreAcudiente(data);
          }else if (data.padrevivo !== '1' & data.madrevive === '1'){
            await MadreAcudiente(data);
          }else if (data.padrevivo === '1' & data.madrevive === '1'){
            await PadreMadre(data);
          }
        }else if (import.meta.env.PUBLIC_SCHOOL === 'chia'){
          await Chia(data);
        }

        navigate('/reserva/finalizar');
      } catch (error) {
        messageLoading = '¿Enviar formulario?';
        loading = 0;
        toast.error('Llene todos los campos requeridos sin errores');
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

      if (res.status !== 200){
        toast.error('Error al enviar el formulario');
        return false;
      }

      toast.success('Datos actualizados correctamente');

      return true;
    }

    let pageDisabled = {
      1: false,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
    }

    function verifDec(d){
      if (d === '3'){
        if (data.declaranit === undefined || data.declaraempresa === undefined || data.declaranombres === undefined || data.declaraapellidos === undefined || data.declaratipoid === undefined || data.declaradocumento === undefined || data.declaralugarexpide === undefined || data.declaraemail === undefined || data.declaracelular === undefined){
          return true;
        }
      }else if (d === '2'){
        if (data.declaraparentesco === undefined || data.declaranombres === undefined || data.declaraapellidos === undefined || data.declaratipoid === undefined || data.declaradocumento === undefined || data.declaralugarexpide === undefined || data.declaraemail === undefined || data.declaracelular === undefined || data.declarapais === undefined){
          return true;
        }
      }
      if (data.declarafechanace === undefined || data.declaraocupacion === undefined || directioDec.type === undefined || directioDec.name === undefined || data.declarareside === undefined || data.inftributaria.ResponsableIVA === undefined || data.inftributaria.CIUU === undefined || data.inftributaria.Persona === undefined){
        return true;
      }else {
        return false;
      }
    }

    $:{
      pageDisabled[2] = data.tipoid_id !== undefined && data.mupioexp_id !== undefined && data.municipio_id !== undefined && data.barrio_id !== undefined && data.direccion !== undefined && data.telefono !== undefined && data.emernombre !== undefined && data.emertelefono !== undefined && data.tipoemer !== undefined ? false : true;
      pageDisabled[3] = data.padrevivo === '1' ? data.tipoidpadre_id !== undefined && data.munexppadre_id !== undefined && data.padrecelular !== undefined && data.emailpadre !== undefined ? false : true : false;
      pageDisabled[4] = data.madrevive === '1' ? data.tipoidmadre_id !== undefined && data.munexpmadre_id !== undefined && data.madrecelular !== undefined && data.madreemail !== undefined ? false : true : false;
      pageDisabled[5] = acu === '2' ? data.acuparentesco_id !== undefined && data.nomacu !== undefined && data.apellacu !== undefined && data.docacu !== undefined && data.tipoidacu_id !== undefined && data.munexpacu_id !== undefined && data.acuemail !== undefined && data.acucelular !== undefined ? false : true : acu !== null ? false : true;
      pageDisabled[6] = dec === null ? true : verifDec(dec);
      pageDisabled[7] = dec === '3' ? data.inftributaria.ResoluciónNumContri !== undefined && data.inftributaria.RégimenContri !== undefined && data.inftributaria.ResoluciónNumAutorre !== undefined && data.inftributaria.ResoluciónNumICA !== undefined ? false : true : data.decactivos !== undefined && data.decpasivos !== undefined && data.decpatrimonio !== undefined && data.decrpublicos !== undefined && data.decvincpublico !== undefined && data.decextranjero !== undefined && data.decorigen !== undefined ? false : true;
      pageDisabled[8] = dec === '3' ? data.inftributaria.ResoluciónNumContri !== undefined && data.inftributaria.RégimenContri !== undefined && data.inftributaria.ResoluciónNumAutorre !== undefined && data.inftributaria.ResoluciónNumICA !== undefined ? false : true : data.decactivos !== undefined && data.decpasivos !== undefined && data.decpatrimonio !== undefined && data.decrpublicos !== undefined && data.decvincpublico !== undefined && data.decextranjero !== undefined && data.decorigen !== undefined ? false : true;
    }

    let buttonDownload = false;

</script>

<div class=" m-10 text-center " >
    <h1 class=" text-3xl font-bold" >{title}</h1>
</div>

<div class=" h-2/3 mx-5 pb-4 overflow-x-hidden overflow-y-auto" >
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
                <Select.Root selected={{label:data.tipoid_label_frontend}} onSelectedChange={(v)=> {
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
                <label for="">Expedición del d. departamento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.mupioexp_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.mupioexp_label_frontend_D = v.label
                  municipality_list.Student_Exp = Municipality;
                  if(v.value !== 2){
                    municipality_list.Student_Exp = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Student_Exp_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.mupioexp_label_frontend}} 
                disabled={!municipality_list.Student_Exp_Dep}
                onSelectedChange={(v)=> {
                  data.mupioexp_id = v.value
                  data.mupioexp_label_frontend = v.label
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Student_Exp as municipality}
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
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Departamento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.departamento_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.departamento_label_frontend_D = v.label
                  municipality_list.Student_Nac = Municipality;
                  if(v.value !== 2){
                    municipality_list.Student_Nac = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Student_Nac_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.municipio_label_frontend}} 
                disabled={!municipality_list.Student_Nac_Dep}
                onSelectedChange={(v)=> {
                  data.municipio_id = v.value
                  data.municipio_label_frontend = v.label
                  }}>
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Municipio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Student_Nac as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Barrio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.barrio_label_frontend}} onSelectedChange={(v)=> {
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
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
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
                <Select.Root selected={{label: data.tipoidpadre_label_frontend}} onSelectedChange={(v)=> {
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
                <label for="">Departamento Expedición<strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.F_departamento_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.F_departamento_label_frontend_D = v.label
                  municipality_list.Father_Exp = Municipality;
                  if(v.value !== 2){
                    municipality_list.Father_Exp = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Father_Exp_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.munexppadre_label_frontend}} 
                disabled={!municipality_list.Father_Exp_Dep}
                onSelectedChange={(v)=> {
                  data.munexppadre_id = v.value
                  data.munexppadre_label_frontend = v.label
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Father_Exp as municipality}
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
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" bind:value={data.padretelcorto} />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" bind:value={data.padretelcompleto} />
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
                <Select.Root selected={{label: data.tipoidmadre_label_frontend}} onSelectedChange={(v)=> {
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
                <label for="">Departamento Expedición<strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.M_departamento_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.M_departamento_label_frontend_D = v.label
                  municipality_list.Mother_Exp = Municipality;
                  if(v.value !== 2){
                    municipality_list.Mother_Exp = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Mother_Exp_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.munexpmadre_label_frontend}} 
                disabled={!municipality_list.Mother_Exp_Dep}
                onSelectedChange={(v)=> {
                  data.munexpmadre_id = v.value
                  data.munexpmadre_label_frontend = v.label
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Mother_Exp as municipality}
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
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    <Input class="w-[50px]" type="number" placeholder="601" bind:value={data.madretelcorto} />
                    <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" bind:value={data.madretelcompleto} />
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
                <Select.Root selected={{label: data.acuparentesco_label_frontend}}
                onSelectedChange={(v)=> {
                  data.acuparentesco_label_frontend = v.label
                  data.acuparentesco_id = v.value}} >
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
                <Select.Root selected={{label: data.tipoidacu_label_frontend}} onSelectedChange={(v)=> {
                  data.tipoidacu_id = v.value
                  data.tipoidacu_label_frontend = v.label
                  }} disabled={acu === '2'? false: true} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={acu === '2'? "Tipo de Documento": acu === '0' ? data.tipoidpadre_label_frontend : data.tipoidmadre_label_frontend} />
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
                <label for="">Departamento Expedición<strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.A_departamento_label_frontend_D}} 
                disabled={acu === '2'? false: true}
                onSelectedChange={(v)=> {
                  data.A_departamento_label_frontend_D = v.label
                  municipality_list.Acu_Exp = Municipality;
                  if(v.value !== 2){
                    municipality_list.Acu_Exp = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Acu_Exp_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={acu === '2'? "Expedición del documento" : acu === '0' ? data.F_departamento_label_frontend_D : data.M_departamento_label_frontend_D} />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.munexpacu_label_frontend}} onSelectedChange={(v)=>{
                  data.munexpacu_id = v.value
                  data.munexpacu_label_frontend = v.label
                }} disabled={!municipality_list.Acu_Exp_Dep} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={acu === '2'? "Expedición del documento" : acu === '0' ? data.munexppadre_label_frontend : data.munexpmadre_label_frontend} />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Acu_Exp as municipality}
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
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div class="flex flex-col gap-1.5">
                <label for="work-phone">Teléfono del trabajo</label>
                <div class="flex gap-3" >
                    {#if acu === '0'}
                        <Input class="w-[50px]" type="number" placeholder="601" bind:value={data.padretelcorto} disabled />
                        <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" disabled bind:value={data.padretelcompleto} />
                    {:else if acu === '1'}
                        <Input class="w-[50px]" type="number" placeholder="601" bind:value={data.madretelcorto} disabled />
                        <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" disabled bind:value={data.madretelcompleto} />
                    {:else if acu === '2'}
                        <Input class="w-[50px]" type="number" placeholder="601" bind:value={data.acutelcorto} />
                        <Input class="w-[240px]" type="number" id="work-phone" placeholder="Teléfono del trabajo" bind:value={data.acutelcompleto} />
                    {/if}
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
                      <RadioGroup.Item value='3' id="r2" />
                      <label for="r2">Empresa</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value='2' id="r3" on:click={()=> toast("para registrar una tercera persona como declarante, debe adjuntar autorización autenticada en notaria de parte de los padres o copia de la resolución de custodia del menor y copia ampliada de la cédula del declarante.", {duration: 10000})} />
                      <label for="r3">Tercera persona</label>
                    </div>
                </RadioGroup.Root>
            </div>
            {#if dec === '2'}
            <div class="flex flex-col gap-1.5 items-center">
                <label for="">Tipo de relación con el estudiante <strong class=" text-red-600" >*</strong> </label>
                <Select.Root onSelectedChange={(v)=> data.declaraparentesco = v.value} >
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
            {#if dec === '3'}
            <div class="flex flex-col gap-1.5">
              <label for="name">Empresa <strong class=" text-red-600" >*</strong> </label>
              <Input class="w-[300px]" type="text" id="name" placeholder="Empresa" bind:value={data.declaraempresa} />
            </div>
            <div class="flex flex-col gap-1.5">
              <label for="name">Nit <strong class=" text-red-600" >*</strong> </label>
              <Input class="w-[300px]" type="number" id="name" placeholder="Nit" bind:value={data.declaranit} />
            </div>
            {/if}
        </div>
        {#if dec !== null}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class="flex flex-col gap-1.5">
                <label for="name">Nombres {dec === '3'? 'del Representante': ''} <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nompadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.nommadre} disabled />
                {:else}
                    <Input class="w-[300px]" type="text" id="name" placeholder="Nombres" bind:value={data.declaranombres} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="name">Apellidos {dec === '3'? 'del Representante': ''} <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellpadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.apellmadre} disabled />
                {:else}
                    <Input class="w-[300px]" type="text" id="last" placeholder="Apellidos" bind:value={data.declaraapellidos} />
                {/if}
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Tipo de identificación <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.declaratipoid_label_frontend}} onSelectedChange={(v)=> {
                  data.declaratipoid = v.value
                  data.declaratipoid_label_frontend = v.label
                  }} disabled={dec === '2'? false: dec === '3'? false: true} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={dec === '0' ? data.tipoidpadre_label_frontend : dec === '1'? data.tipoidmadre_label_frontend : "Tipo de Documento"} />
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
                {:else}
                    <Input class="w-[300px]" type="number" id="numberofid" placeholder="Número de identificación" bind:value={data.declaradocumento} />
                {/if}
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Departamento Expedición<strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.DE_departamento_label_frontend_D}} 
                disabled={dec === '2'? false: dec === '3'? false : true}
                onSelectedChange={(v)=> {
                  data.DE_departamento_label_frontend_D = v.label
                  municipality_list.Declarante_Exp = Municipality;
                  if(v.value !== 2){
                    municipality_list.Declarante_Exp = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Declarante_Exp_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={dec === '0' ? data.F_departamento_label_frontend_D : dec === '1'? data.M_departamento_label_frontend_D : "Expedición del documento"} />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5" >
                <label for="">Expedición del documento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.declaralugarexpide_label_frontend}} onSelectedChange={(v)=> {
                  data.declaralugarexpide = v.value
                  data.declaralugarexpide_label_frontend = v.label
                }} disabled={!municipality_list.Declarante_Exp_Dep} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder={dec === '0' ? data.munexppadre_label_frontend : dec === '1'? data.munexpmadre_label_frontend : "Expedición del documento"} />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Declarante_Exp as municipality}
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
                <label for="Email">Email {dec ==='3' ? 'del Representante': ''} <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.emailpadre} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.madreemail} disabled />
                {:else}
                    <Input class="w-[300px]" type="text" id="Email" placeholder="Email" bind:value={data.declaraemail} />
                {/if}
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="cellular">Celular {dec ==='3' ? 'del Representante': ''} <strong class=" text-red-600" >*</strong> </label>
                {#if dec === '0'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.padrecelular} disabled />
                {:else if dec === '1'}
                    <Input class="w-[300px]" type="number" id="cellular" placeholder="Celular" bind:value={data.madrecelular} disabled />
                {:else}
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
                    <CalendarPrimitive.Root  
                      bind:value={data.declarafechanace}
                      bind:placeholder={placeholder}
                      let:months
                      let:weekdays
                      class="rounded-md border p-3"
                      >
                      <Calendar.Header>
                        <Calendar.Heading class="flex w-full items-center justify-between gap-2">
                          <Select.Root
                            selected={''}
                            items={monthOptions}
                            onSelectedChange={(v) => {
                              if (!v || !placeholder) return;
                              if (v.value === placeholder?.month) return;
                              placeholder = placeholder.set({ month: v.value });
                            }}
                          >
                            <Select.Trigger aria-label="Select month" class="w-[60%]">
                              <Select.Value placeholder="Select month" />
                            </Select.Trigger>
                            <Select.Content class="max-h-[200px] overflow-y-auto">
                              {#each monthOptions as { value, label }}
                                <Select.Item {value} {label}>
                                  {label}
                                </Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <Select.Root
                            selected={''}
                            items={yearOptions}
                            onSelectedChange={(v) => {
                              if (!v || !placeholder) return;
                              if (v.value === placeholder?.month) return;
                              placeholder.set({year: v.value});
                              placeholder = placeholder.set({ year: v.value });
                            }}
                          >
                            <Select.Trigger aria-label="Select year" class="w-[40%]">
                              <Select.Value placeholder="Select year" />
                            </Select.Trigger>
                            <Select.Content class="max-h-[200px] overflow-y-auto">
                              {#each yearOptions as { value, label }}
                                <Select.Item {value} {label}>
                                  {label}
                                </Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Calendar.Heading>
                      </Calendar.Header>
                      <Calendar.Months>
                        {#each months as month}
                          <Calendar.Grid>
                            <Calendar.GridHead>
                              <Calendar.GridRow class="flex">
                                {#each weekdays as weekday}
                                  <Calendar.HeadCell>
                                    {weekday.slice(0, 2)}
                                  </Calendar.HeadCell>
                                {/each}
                              </Calendar.GridRow>
                            </Calendar.GridHead>
                            <Calendar.GridBody>
                              {#each month.weeks as weekDates}
                                <Calendar.GridRow class="mt-2 w-full">
                                  {#each weekDates as date}
                                    <Calendar.Cell {date}>
                                      <Calendar.Day {date} month={month.value} />
                                    </Calendar.Cell>
                                  {/each}
                                </Calendar.GridRow>
                              {/each}
                            </Calendar.GridBody>
                          </Calendar.Grid>
                        {/each}
                      </Calendar.Months>
                    </CalendarPrimitive.Root>
                  </Popover.Content>
                </Popover.Root>
            </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            {#if dec !== '3'}
            <div class=" flex flex-col gap-1.5" >
                <label for="">Nacionalidad <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.declarapais_label_frontend}}
                onSelectedChange={(v)=> {
                  data.declarapais = v.value
                  data.declarapais_label_frontend = v.label
                  }} >
                  <Select.Trigger class="w-[280px]">
                    <Select.Value placeholder="Nacionalidad" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Nacionalidades</Select.Label>
                      {#each country as item}
                        <Select.Item value={item.id} label={item.nombre}
                          >{item.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Ocupación y oficio <strong class=" text-red-600" >*</strong> </label>
                <Input class="w-[300px]" type="text" id="ocupacion" placeholder="Ocupacion" bind:value={data.declaraocupacion} />
            </div>
            {/if}
            <div class="flex flex-col gap-1.5">
                <label for="Residence-address">Dirección de {dec === '3'? 'la Empresa': 'residencia'} <strong class=" text-red-600" >*</strong> </label>
                <div class="flex gap-2 items-center flex-wrap" >
                <Select.Root selected={{label:directioDec.type_label}}
                onSelectedChange={(v)=> {
                  directioDec.type = v.value
                  directioDec.type_label = v.label}} >
                  <Select.Trigger class="w-[150px]">
                    <Select.Value placeholder="Tipo de calle" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Tipo de calle</Select.Label>
                        <Select.Item value={'AV'} label="Avenida"
                          >Avenida</Select.Item
                        >
                        <Select.Item value={'CL'} label="Calle"
                          >Calle</Select.Item
                        >
                        <Select.Item value={'CR'} label="Carrera"
                          >Calle</Select.Item
                        >
                        <Select.Item value={'DG'} label="Diagonal"
                          >Diagonal</Select.Item
                        >
                        <Select.Item value={'TV'} label="Transversal"
                          >Transversal</Select.Item
                        >
                        <Select.Item value={'AC'} label="Avenida Carrera"
                          >Avenida Carrera</Select.Item
                        >
                        <Select.Item value={'AK'} label="Avenida Calle"
                          >Avenida Calle</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
                <Input class="w-[100px]" type="text" placeholder="5 SUR" bind:value={directioDec.name} />
                <p>#</p>
                <Input class="w-[50px]" type="text" placeholder="" bind:value={directioDec.numberone} />
                <p>-</p>
                <Input class="w-[50px]" type="text" placeholder="" bind:value={directioDec.numbertwo} />
                <Select.Root selected={{label:directioDec.house_label}}
                onSelectedChange={(v)=> {
                  directioDec.house = v.value
                  directioDec.house_label = v.label}} >
                  <Select.Trigger class="w-[130px]">
                    <Select.Value placeholder="Tipo de casa" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Tipo de calle</Select.Label>
                        <Select.Item value={'CA'} label="Casa"
                          >Casa</Select.Item
                        >
                        <Select.Item value={'TO'} label="Torre"
                          >Torre</Select.Item
                        >
                        <Select.Item value={'DPTO'} label="Departamento"
                          >Departamento</Select.Item
                        >
                        <Select.Item value={'P'} label="Piso"
                          >Piso</Select.Item
                        >
                        <Select.Item value={'ST'} label="Sotano"
                          >Sotano</Select.Item
                        >
                        <Select.Item value={'FCA'} label="Finca"
                          >Finca</Select.Item
                        >
                        <Select.Item value={'PQ'} label="Parqueadero"
                          >Parqueadero</Select.Item
                        >
                        <Select.Item value={'CON'} label="Conjunto Residencial"
                          >Conjunto Residencial</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
                <Input class="w-[80px]" type="text" placeholder="201" bind:value={directioDec.numberHouse} />
                </div>
            </div>
            {#if dec === '3'}
            <div class=" flex flex-col gap-1.5" >
                <label for="">Departamento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.DEP_departamento_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.DEP_departamento_label_frontend_D = v.label
                  municipality_list.Declarante_Map = Municipality;
                  if(v.value !== 2){
                    municipality_list.Declarante_Map = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Declarante_Map_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
            </div>
            <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.declarareside_label_frontend}} 
                disabled={!municipality_list.Declarante_Map_Dep}
                onSelectedChange={(v)=>{
                  data.declarareside = v.value
                  data.declarareside_label_frontend = v.label
                }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Municipio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Declarante_Map as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
            {/if}
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          {#if dec !== '3'}
          <div class=" flex flex-col gap-1.5" >
                <label for="">Departamento <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.DEP_departamento_label_frontend_D}} 
                onSelectedChange={(v)=> {
                  data.DEP_departamento_label_frontend_D = v.label
                  municipality_list.Declarante_Map = Municipality;
                  if(v.value !== 2){
                    municipality_list.Declarante_Map = Municipality.filter((m) => m.departamento_id === v.value);
                  }
                  municipality_list.Declarante_Map_Dep = true;
                  }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Expedición del documento" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Departamentos</Select.Label>
                      {#each Department as department}
                        <Select.Item value={department.id} label={department.nombre}
                          >{department.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="document issuance" />
                </Select.Root>
          </div>
          <div class=" flex flex-col gap-1.5" >
                <label for="">Municipio <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label:data.declarareside_label_frontend}} 
                disabled={!municipality_list.Declarante_Map_Dep}
                onSelectedChange={(v)=>{
                  data.declarareside = v.value
                  data.declarareside_label_frontend = v.label
                }} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Municipio" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Municipios</Select.Label>
                      {#each municipality_list.Declarante_Map as municipality}
                        <Select.Item value={municipality.id} label={municipality.nombre}
                          >{municipality.nombre}</Select.Item
                        >
                      {/each}
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root>
            </div>
            {/if}
            <div class=" flex flex-col gap-1.5" >
                <label for="">ResponsableIVA <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.inftributaria?.ResponsableIVA === true? 'Si': 'No'}}
                onSelectedChange={(e) => data.inftributaria.ResponsableIVA = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value={true} label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value={false} label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root> 
            </div>
            {#if dec === '3'}
            <div class=" flex flex-col gap-1.5" >
                <label for="">ResponsableICA <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.inftributaria?.ResponsableICA === true? 'Si': 'No'}}
                onSelectedChange={(e) => data.inftributaria.ResponsableICA = e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>Seleccione su respuesta</Select.Label>
                        <Select.Item value={true} label="Si"
                          >Si</Select.Item
                        >
                        <Select.Item value={false} label="No"
                          >No</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root> 
            </div>
            {/if}
            <div class="flex flex-col gap-1.5">
                <label for="passive">CIUU </label>
                <Input class="w-[300px]" type="number" id="ciuu" placeholder="CIUU" bind:value={data.inftributaria.CIUU} />
            </div>
            <div class="flex flex-col gap-1.5">
                <label for="passive">{dec === '3'? 'Contribuyente': 'Tipo de persona'} <strong class=" text-red-600" >*</strong> </label>
                <Select.Root selected={{label: data.inftributaria?.Persona}}
                onSelectedChange={(e) => data.inftributaria.Persona= e.value} >
                  <Select.Trigger class="w-[300px]">
                    <Select.Value placeholder="Seleccione su respuesta" />
                  </Select.Trigger>
                  <Select.Content class="h-40 overflow-auto" >
                    <Select.Group>
                      <Select.Label>{dec === '3'? 'Contribuyente': 'Tipo de persona'}</Select.Label>
                        <Select.Item value="COMÚN" label="Común"
                          >Común</Select.Item
                        >
                        <Select.Item value="SIMPLIFICADO" label="Simplificado"
                          >Simplificado</Select.Item
                        >
                        {#if dec !== '3'}
                        <Select.Item value="PERSONA NATURAL" label="Persona Natural"
                          >Persona Natural</Select.Item
                        >
                        {/if}
                        <Select.Item value="TRIBUTACION SIMPLE" label="Tributación Simple"
                          >Tributación Simple</Select.Item
                        >
                        <Select.Item value="GRAN CONTRIBUYENTE" label="Gran Contribuyente"
                          >Gran Contribuyente</Select.Item
                        >
                    </Select.Group>
                  </Select.Content>
                  <Select.Input name="municipality" />
                </Select.Root> 
            </div>
        </div>
        {/if}
    {:else if page === 6}
        {#if dec !== '3'}
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
                <Select.Root selected={{label: data.decrpublicos === '1'? 'Si': 'No'}}
                onSelectedChange={(e) => data.decrpublicos = e.value} >
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
                <Select.Root selected={{label: data.decppublic === '1'? 'Si': 'No'}} 
                onSelectedChange={(e) => data.decppublic = e.value} >
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
                <Select.Root selected={{label: data.decvincpublico === '1'? 'Si': 'No'}} 
                onSelectedChange={(e) => data.decvincpublico = e.value} >
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
                <Select.Root  selected={{label: data.decextranjero === '1'? 'Si': 'No'}}
                onSelectedChange={(e) => data.decextranjero = e.value} >
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
        {:else if dec === '3'}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div class="flex flex-col gap-1.5">
            <label for="">(Contribuyente) Resolución N° <strong class=" text-red-600" >*</strong> </label>
            <Input class="w-[300px]" type="number" id="passive" placeholder="Resolución N°" bind:value={data.inftributaria.ResoluciónNumContri} />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="">Régimen <strong class=" text-red-600" >*</strong> </label>
            <Input class="w-[300px]" type="text" id="passive" placeholder="Régimen" bind:value={data.inftributaria.RégimenContri} />
          </div>
        <div class=" flex flex-col gap-1.5" >
            <label for="">Autorretenedor <strong class=" text-red-600" >*</strong> </label>
            <Select.Root selected={{label: data.inftributaria?.Autorretenedor === true? 'Si': 'No'}}
            onSelectedChange={(e) => data.inftributaria.Autorretenedor = e.value} >
              <Select.Trigger class="w-[300px]">
                <Select.Value placeholder="Seleccione su respuesta" />
              </Select.Trigger>
              <Select.Content class="h-40 overflow-auto" >
                <Select.Group>
                  <Select.Label>Seleccione su respuesta</Select.Label>
                    <Select.Item value={true} label="Si"
                      >Si</Select.Item
                    >
                    <Select.Item value={false} label="No"
                      >No</Select.Item
                    >
                </Select.Group>
              </Select.Content>
              <Select.Input name="municipality" />
            </Select.Root> 
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="">(Autorretenedor) Resolución N° <strong class=" text-red-600" >*</strong> </label>
          <Input class="w-[300px]" type="number" id="passive" placeholder="Resolución N°" bind:value={data.inftributaria.ResoluciónNumAutorre} />
        </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div class=" flex flex-col gap-1.5" >
            <label for="">Autorretenedor de ICA <strong class=" text-red-600" >*</strong> </label>
            <Select.Root selected={{label: data.inftributaria?.AutorretenedorICA === true? 'Si': 'No'}}
            onSelectedChange={(e) => data.inftributaria.AutorretenedorICA = e.value} >
              <Select.Trigger class="w-[300px]">
                <Select.Value placeholder="Seleccione su respuesta" />
              </Select.Trigger>
              <Select.Content class="h-40 overflow-auto" >
                <Select.Group>
                  <Select.Label>Seleccione su respuesta</Select.Label>
                    <Select.Item value={true} label="Si"
                      >Si</Select.Item
                    >
                    <Select.Item value={false} label="No"
                      >No</Select.Item
                    >
                </Select.Group>
              </Select.Content>
              <Select.Input name="municipality" />
            </Select.Root> 
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="">(ICA) Resolución N° <strong class=" text-red-600" >*</strong> </label>
            <Input class="w-[300px]" type="text" id="passive" placeholder="Resolución N°" bind:value={data.inftributaria.ResoluciónNumICA} />
          </div>
        </div>
        {/if}
    {:else if page === 7}
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Realiza operaciones en moneda extranjera? 
                  {#if dec !== '3'}
                    <strong class=" text-red-600" >*</strong> 
                  {/if}
                </label>
                <Select.Root selected={{label: data.decmonextern === '1'? 'Si': 'No'}}
                onSelectedChange={(v) => data.decmonextern = v.value} >
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
                <p>¿Realiza alguna de estas operaciones? 
                  {#if dec !== '3'}
                    <strong class=" text-red-600" >*</strong> 
                  {/if}
                </p>
                <div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" />
                  <label for="">Ninguna</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label"  bind:checked={data.decimporta} />
                  <label for="">Importaciones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label"  bind:checked={data.decexporta} />
                  <label for="">Exportaciones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label"  bind:checked={data.decinversiones} />
                  <label for="">Inversiones</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label"  bind:checked={data.dectransferencias} />
                  <label for="">Transferencias</label>
                </div>
                <div class="flex items-center space-x-2" >
                  <Checkbox id="terms" aria-labelledby="terms-label" bind:checked={data.decotrasmact} />
                  <label for="">Otras</label>
                </div>
                </div>
           </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
            <div class=" flex flex-col gap-1.5 items-center" >
                <label for="">¿Posee cuentas bancarias en moneda extranjera? 
                  {#if dec !== '3'}
                    <strong class=" text-red-600" >*</strong> 
                  {/if}
                </label>
                <Select.Root selected={{label: data.deccuentasme === '1'? 'Si': 'No'}}
                onSelectedChange={(v) => data.deccuentasme = v.value} >
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
            <label for="">Tipo de producto financiero en el exterior.</label>
            <Input class="w-[300px]" type="text" placeholder="Tipo de producto financiero en el exterior." bind:value={data.prodtypeex} />
          </div>
          <div>
            <label for="">Identificación del producto.</label>
            <Input class="w-[300px]" type="number" placeholder="Identificación del producto." bind:value={data.prodident} />
          </div>
          <div>
            <label for="">N° del producto.</label>
            <Input class="w-[300px]" type="number" placeholder="N° del producto." bind:value={data.prodnum} />
          </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div  >
            <label for="">Monto.</label>
            <Input class="w-[300px]" type="number" placeholder="Monto." bind:value={data.prodmonto} />
          </div>
          <div>
            <label for="">País.</label>
            <Select.Root selected={{label:data.prodcountr}}
            onSelectedChange={(v)=> {
              data.prodcountr = v.label
              }} >
              <Select.Trigger class="w-[300px]">
                <Select.Value placeholder="País." />
              </Select.Trigger>
              <Select.Content class="h-40 overflow-auto" >
                <Select.Group>
                  <Select.Label>Países</Select.Label>
                  {#each country as item}
                    <Select.Item value={item.id} label={item.nombre}
                      >{item.nombre}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="document issuance" />
            </Select.Root>
          </div>
          <div>
            <label for="">Ciudad.</label>
            <Select.Root selected={{label:data.prodmuni}}
              onSelectedChange={(v)=> {
                data.prodmuni = v.label}}
            >
              <Select.Trigger class="w-[300px]">
                <Select.Value placeholder="Ciudad." />
              </Select.Trigger>
              <Select.Content class="h-40 overflow-auto" >
                <Select.Group>
                  <Select.Label>Ciudades</Select.Label>
                  {#each Municipality as item}
                    <Select.Item value={item.id} label={item.nombre}
                      >{item.nombre}</Select.Item
                    >
                  {/each}
                </Select.Group>
              </Select.Content>
              <Select.Input name="document issuance" />
            </Select.Root>
          </div>
        </div>
        <div class=" flex items-center justify-center gap-10 flex-wrap mt-5" >
          <div>
            <label for="">Moneda.</label>
            <Input class="w-[300px]" type="text" placeholder="Moneda." bind:value={data.prodmoneda} />
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
        <div class="flex items-center justify-center flex-col gap-2 mt-3" >
          {#if buttonDownload}
          <p>Click Para Descargar PDF</p>
          <button on:click={fillOutForm} class="px-5 py-2 bg-red-600 text-white rounded-sm" >Descargar</button>
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
          <Pagination.Link {page} isActive={currentPage == page.value} disabled={pageDisabled[page.value]} >
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton disabled={pageDisabled[currentPage+1]} />
    </Pagination.Item>
  </Pagination.Content>
  </Pagination.Root>
</div>

