
import { PDFDocument, rgb } from 'pdf-lib';

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export async function Acudiente(data:any){
    const pdfUrl = '/acudiente_medillin.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    pdfDoc.setTitle('2025 ' + namesStudent);

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText(data.grado + ' 2025',{
        x: 178,
        y: pdfDoc.getPage(0).getHeight() - 83.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 273,
        y: pdfDoc.getPage(0).getHeight() - 142,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent? namesStudent : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 216.5,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(0).drawText(data.tipoid_label_frontend.length > 29 ? data.tipoid_label_frontend.substring(0,29) + '...' : data.tipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.documento + ' de ' + data.mupioexp_label_frontend,{
        x: 325,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    if (data.tipoid_id === 2){
        pdfDoc.getPage(0).drawText(Number(dateBirth.getDate()-1) + '/' + Number(dateBirth.getMonth()+1) + '/' + Number(dateBirth.getFullYear()+18) ,{
            x: 262,
            y: pdfDoc.getPage(0).getHeight() - 255,
            size: 10,
            color: rgb(0,0,0)
        });
    }

    pdfDoc.getPage(0).drawText(dateBirth.getDate() + '/' + Number(dateBirth.getMonth()+1) + '/' + dateBirth.getFullYear() ,{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 274.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.direccion + ', Municipio: ' + data.municipio_label_frontend ,{
        x: 220,
        y: pdfDoc.getPage(0).getHeight() - 293.5,
        size: 10,
        color: rgb(0,0,0)
    });
    
    pdfDoc.getPage(0).drawText(data.telefono? data.telefono : '',{
        x: 260,
        y: pdfDoc.getPage(0).getHeight() - 312.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.eps? data.eps : '',{
        x: 370,
        y: pdfDoc.getPage(0).getHeight() - 312.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // acudiente data

    pdfDoc.getPage(0).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 380,
        y: pdfDoc.getPage(0).getHeight() - 350.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 387,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 406,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.docacu + ' de ' + data.munexpacu_label_frontend,{
        x: 328,
        y: pdfDoc.getPage(0).getHeight() - 406.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acuemail? data.acuemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acucelular? data.acucelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 445,
        size: 10,
        color: rgb(0,0,0)
    });

    // declarante data

    pdfDoc.getPage(0).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 519,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaratipoid_label_frontendlength > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 538.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 328,
        y: pdfDoc.getPage(0).getHeight() - 538.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declfechanace? data.declfechanace : '',{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 558,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 576.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 596.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 143,
        y: pdfDoc.getPage(0).getHeight() - 615.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 141,
        y: pdfDoc.getPage(0).getHeight() - 634.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaraemail? data.declaraemail : '',{
        x: 230,
        y: pdfDoc.getPage(0).getHeight() - 671.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 2

    pdfDoc.getPage(1).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 266,
        y: pdfDoc.getPage(1).getHeight() - 140.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 270,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend + ' N° ' + data.docacu,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 289,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexpacu_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 308,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 3

    pdfDoc.getPage(2).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(2).getHeight() - 100,
        size: 10,
        color: rgb(0,0,0)
    });

    let namesOfAcu = data.nomacu + ' ' + data.apellacu;

    pdfDoc.getPage(2).drawText(namesOfAcu.substring(0, 28)+'.',{
        x: 72,
        y: pdfDoc.getPage(2).getHeight() - 149,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(2).drawText(namesStudent.substring(0, 28),{
        x: pdfDoc.getPage(2).getWidth() - 222,
        y: pdfDoc.getPage(2).getHeight() - 175,
        size: 10,
        color: rgb(0,0,0)
    })

    // data page 4

    pdfDoc.getPage(3).drawText(data.grado? data.grado : '',{
        x: 377,
        y: pdfDoc.getPage(3).getHeight() - 186.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 5

    pdfDoc.getPage(4).drawText(data.grado? data.grado : '',{
        x: 182,
        y: 138,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 6

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 263,
        y: pdfDoc.getPage(5).getHeight() - 240,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 184,
        y: 245,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 271,
        y: 180,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 8

    pdfDoc.getPage(7).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 260,
        y: pdfDoc.getPage(7).getHeight() - 264,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfAcu? namesOfAcu : '',{
        x: 76,
        y: pdfDoc.getPage(7).getHeight() - 365,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend + ' N° ' + data.docacu,{
        x: 76,
        y: pdfDoc.getPage(7).getHeight() - 380,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexpacu_label_frontend,{
        x: 76,
        y: pdfDoc.getPage(7).getHeight() - 395,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 9

    pdfDoc.getPage(8).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(8).getHeight() - 100,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 10

    pdfDoc.getPage(9).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 223,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 208,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 192.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 177,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 162.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 11

    pdfDoc.getPage(10).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(10).getHeight() - 109,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(10).getHeight() - 147.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(10).getHeight() - 172,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(10).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 363,
        y: pdfDoc.getPage(10).getHeight() - 187.2,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(10).getHeight() - 202,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 231,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(10).getHeight() - 245.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(10).getHeight() - 260.3,
        size: 10,
        color: rgb(0,0,0)
    });

    const activos = data.decactivos? data.decactivos : ' '

    pdfDoc.getPage(10).drawText('$' + activos,{
        x: 122,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const pasivos = data.decpasivos? data.decpasivos : ' '

    pdfDoc.getPage(10).drawText('$' + pasivos,{
        x: 263,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const patrimonio = data.decpatrimonio? data.decpatrimonio : ' '

    pdfDoc.getPage(10).drawText('$' + patrimonio,{
        x: 405,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const ingresos = data.decingresos? data.decingresos : ' '

    pdfDoc.getPage(10).drawText('$' + ingresos,{
        x: 170,
        y: pdfDoc.getPage(10).getHeight() - 350.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decrpublicos === '1' ? 'SI' : data.decrpublicos === '0'? 'NO' : '',{
        x: 325,
        y: pdfDoc.getPage(10).getHeight() - 414,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decppublic === '1' ? 'SI' : data.decppublic === '0'? 'NO' : '',{
        x: 463,
        y: pdfDoc.getPage(10).getHeight() - 427.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decvincpublico === '1' ? 'SI' : data.decvincpublico === '0'? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 454,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decextranjero === '1' ? 'SI' : data.decextranjero === '0'? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 478.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decmonextern === '1' ? 'SI':  data.decmonextern === '0'? 'NO' : '',{
        x: 342,
        y: 175,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.dectransferencias  === '1' ? 'SI' : data.dectransferencias === '0'? 'NO' : '',{
        x: 270,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decimporta === '1' ? 'SI' : data.decimporta === '0'? 'NO' : '',{
        x: 160,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decexporta === '1' ? 'SI' : data.decexporta === '0'? 'NO' : '',{
        x: 278,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decotrasmact === '1' ? 'SI' : data.decotrasmact === '0'? 'NO' : '',{
        x: 343,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 12

    pdfDoc.getPage(11).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 172,
        y: 233.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 147,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 117,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 102,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 87.8,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 13

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(12).getHeight() - 112,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(12).getHeight() - 137,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(12).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(12).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(12).getHeight() - 217,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 231.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 246,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraocupacion_label_frontend,{
        x: 141,
        y: pdfDoc.getPage(12).getHeight() - 260.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion,{
        x: 139,
        y: pdfDoc.getPage(12).getHeight() - 275,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent.substring(0, 28),{
        x: 72,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.grado? data.grado : '',{
        x: 350,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 149,
        y: 285.7,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 193,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 71,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 322,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 146.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 14

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 260,
        y: pdfDoc.getPage(13).getHeight() - 160,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfAcu? namesOfAcu : '',{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 239,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 228,
        y: pdfDoc.getPage(13).getHeight() - 264.2,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 290,
        y: pdfDoc.getPage(13).getHeight() - 315,
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
}

export async function PadreMadre(data:any){
    const pdfUrl = '/padreymadre_medillin.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    pdfDoc.setTitle('2025 ' + namesStudent);

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText(data.grado + ' 2025',{
        x: 178,
        y: pdfDoc.getPage(0).getHeight() - 83.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 273,
        y: pdfDoc.getPage(0).getHeight() - 142,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent? namesStudent : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 216.5,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(0).drawText(data.tipoid_label_frontend.length > 29 ? data.tipoid_label_frontend.substring(0,29) + '...' : data.tipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.documento + ' de ' + data.mupioexp_label_frontend,{
        x: 325,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    if (data.tipoid_id === 2){
        pdfDoc.getPage(0).drawText(Number(dateBirth.getDate()-1) + '/' + Number(dateBirth.getMonth()+1) + '/' + Number(dateBirth.getFullYear()+18) ,{
            x: 262,
            y: pdfDoc.getPage(0).getHeight() - 255,
            size: 10,
            color: rgb(0,0,0)
        });
    }

    pdfDoc.getPage(0).drawText(dateBirth.getDate() + '/' + Number(dateBirth.getMonth()+1) + '/' + dateBirth.getFullYear() ,{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 274.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.direccion + ', Municipio: ' + data.municipio_label_frontend ,{
        x: 220,
        y: pdfDoc.getPage(0).getHeight() - 293.5,
        size: 10,
        color: rgb(0,0,0)
    });
    
    pdfDoc.getPage(0).drawText(data.telefono? data.telefono : '',{
        x: 260,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.eps? data.eps : '',{
        x: 365,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    }); 
    
    // padre data

    pdfDoc.getPage(0).drawText(data.nompadre + ' ' + data.apellpadre,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 386,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend + ' N° ' + data.docpadre + ' de ' + data.munexppadre_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 405,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.emailpadre? data.emailpadre : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.padrecelular? data.padrecelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 444,
        size: 10,
        color: rgb(0,0,0)
    });

    // madre data

    pdfDoc.getPage(0).drawText(data.nommadre + ' ' + data.apellmadre,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 518.4,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend + ' N° ' + data.docmadre + ' de ' + data.munexpmadre_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 537.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.madreemail? data.madreemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 557,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.madrecelular? data.madrecelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 576,
        size: 10,
        color: rgb(0,0,0)
    });

    // declarante data

    pdfDoc.getPage(0).drawText(data.declaranombres? data.declaranombres : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 650,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 669.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declfechanace? data.declfechanace : '',{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 685,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 83,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 102.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(1).getHeight() - 121.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(1).getHeight() - 141,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 230,
        y: pdfDoc.getPage(1).getHeight() - 178,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 265,
        y: pdfDoc.getPage(1).getHeight() - 272.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nompadre + ' ' + data.apellpadre,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexppadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nommadre + ' ' + data.apellmadre,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexpmadre_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 3

    pdfDoc.getPage(2).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(2).getHeight() - 130,
        size: 10,
        color: rgb(0,0,0)
    });

    let namesOfPadre = data.nompadre + ' ' + data.apellpadre;
    let namesOfMadre = data.nommadre + ' ' + data.apellmadre;

    pdfDoc.getPage(2).drawText(namesOfPadre.substring(0, 28)+'.',{
        x: 72,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(2).drawText(namesOfMadre.substring(0, 28),{
        x: 268,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(2).drawText(namesStudent.substring(0, 28),{
        x: 185,
        y: pdfDoc.getPage(2).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    })

    // data page 4

    pdfDoc.getPage(3).drawText(data.grado? data.grado : '',{
        x: 377,
        y: pdfDoc.getPage(3).getHeight() - 214,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 5

    pdfDoc.getPage(4).drawText(data.grado? data.grado : '',{
        x: 182,
        y: 99,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 6

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 258,
        y: pdfDoc.getPage(5).getHeight() - 265,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 184,
        y: 219.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 271,
        y: 154.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 8

    pdfDoc.getPage(7).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 260,
        y: pdfDoc.getPage(7).getHeight() - 289.6,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfPadre? namesOfPadre : '',{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend + ' N° ' + data.docpadre,{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexppadre_label_frontend,{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfMadre? namesOfMadre : '',{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend + ' N° ' + data.docmadre,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexpmadre_label_frontend,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 9

    pdfDoc.getPage(8).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(8).getHeight() - 120,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 10

    pdfDoc.getPage(9).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 195,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 180,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 166.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 151.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 136.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 11

    pdfDoc.getPage(10).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(10).getHeight() - 109,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(10).getHeight() - 147.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(10).getHeight() - 172,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(10).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(10).getHeight() - 187.2,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(10).getHeight() - 202,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 231,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(10).getHeight() - 245.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaradireccion  ? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(10).getHeight() - 260.3,
        size: 10,
        color: rgb(0,0,0)
    });

    const activos = data.decactivos !== undefined ? data.decactivos : ' ';

    pdfDoc.getPage(10).drawText('$' + activos,{
        x: 122,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const pasivo = data.decpasivos !== undefined ? data.decpasivos : ' ';

    pdfDoc.getPage(10).drawText('$' + pasivo,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const patrimonio = data.decpatrimonio !== undefined ? data.decpatrimonio : ' ';

    pdfDoc.getPage(10).drawText('$' + patrimonio,{
        x: 390,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const ingresos = data.decingresos !== undefined ? data.decingresos : ' ';

    pdfDoc.getPage(10).drawText('$' + ingresos,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 351,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decrpublicos === '1' ? 'SI' : data.decrpublicos === '0'? 'NO' : '',{
        x: 325,
        y: pdfDoc.getPage(10).getHeight() - 401.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decppublic === '1' ? 'SI' : data.decppublic === '0'? 'NO' : '',{
        x: 463,
        y: pdfDoc.getPage(10).getHeight() - 414.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decvincpublico === '1' ? 'SI' : data.decvincpublico === '0'? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 442,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decextranjero === '1' ? 'SI' : data.decextranjero === '0'? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 466.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decmonextern === '1' ? 'SI': data.decmonextern === '0'? 'NO' : '',{
        x: 342,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.dectransferencias  === '1' ? 'SI' : data.dectransferencias === '0'? 'NO' : '',{
        x: 270,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decimporta === '1' ? 'SI' : data.decimporta === '0'? 'NO' : '',{
        x: 160,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decexporta === '1' ? 'SI' : data.decexporta === '0'? 'NO' : '',{
        x: 286,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decotrasmact === '1' ? 'SI' : data.decotrasmact === '0'? 'NO' : '',{
        x: 366,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 12

    pdfDoc.getPage(11).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 172,
        y: 233.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 147,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 117,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 102,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 87.8,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 13

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(12).getHeight() - 112,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(12).getHeight() - 137,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(12).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(12).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(12).getHeight() - 217,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 231.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 246,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(12).getHeight() - 260.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(12).getHeight() - 275,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent.substring(0, 28),{
        x: 72,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.grado? data.grado : '',{
        x: 350,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 149,
        y: 285.7,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 193,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 71,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 322,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 146.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 14

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 260,
        y: pdfDoc.getPage(13).getHeight() - 160,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfPadre? namesOfPadre : '',{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 237,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfMadre? namesOfMadre : '',{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 253,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 228,
        y: pdfDoc.getPage(13).getHeight() - 277,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 290,
        y: pdfDoc.getPage(13).getHeight() - 329.5,
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
}

export async function PadreAcudiente(data:any){
    const pdfUrl = '/padreyacudiente_medillin.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    pdfDoc.setTitle('2025 ' + namesStudent);

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText(data.grado + ' 2025',{
        x: 178,
        y: pdfDoc.getPage(0).getHeight() - 83.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 273,
        y: pdfDoc.getPage(0).getHeight() - 142,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent? namesStudent : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 216.5,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(0).drawText(data.tipoid_label_frontend.length > 29 ? data.tipoid_label_frontend.substring(0,29) + '...' : data.tipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.documento + ' de ' + data.mupioexp_label_frontend,{
        x: 325,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    if (data.tipoid_id === 2){
        pdfDoc.getPage(0).drawText(Number(dateBirth.getDate()-1) + '/' + Number(dateBirth.getMonth()+1) + '/' + Number(dateBirth.getFullYear()+18) ,{
            x: 262,
            y: pdfDoc.getPage(0).getHeight() - 255,
            size: 10,
            color: rgb(0,0,0)
        });
    }

    pdfDoc.getPage(0).drawText(dateBirth.getDate() + '/' + Number(dateBirth.getMonth()+1) + '/' + dateBirth.getFullYear() ,{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 274.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.direccion + ', Municipio: ' + data.municipio_label_frontend ,{
        x: 220,
        y: pdfDoc.getPage(0).getHeight() - 293.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.telefono? data.telefono : '',{
        x: 260,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.eps? data.eps : '',{
        x: 365,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // padre data

    pdfDoc.getPage(0).drawText(data.nompadre + ' ' + data.apellpadre,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 386,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend + ' N° ' + data.docpadre + ' de ' + data.munexppadre_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 405,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.emailpadre? data.emailpadre : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.padrecelular? data.padrecelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 444,
        size: 10,
        color: rgb(0,0,0)
    });

    // acudiente data

    pdfDoc.getPage(0).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 380,
        y: pdfDoc.getPage(0).getHeight() - 481.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 518.4,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend + ' N° ' + data.docacu + ' de ' + data.munexpacu_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 537.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acuemail? data.acuemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 557,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acucelular? data.acucelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 576,
        size: 10,
        color: rgb(0,0,0)
    });

    // declarante data

    pdfDoc.getPage(0).drawText(data.declaranombres? data.declaranombres : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 650,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 669.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declfechanace? data.declfechanace : '',{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 685,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 83,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 102.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(1).getHeight() - 121.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(1).getHeight() - 141,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 230,
        y: pdfDoc.getPage(1).getHeight() - 178,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 265,
        y: pdfDoc.getPage(1).getHeight() - 272.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nompadre + ' ' + data.apellpadre,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexppadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexpacu_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 3

    pdfDoc.getPage(2).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(2).getHeight() - 130,
        size: 10,
        color: rgb(0,0,0)
    });

    let namesOfPadre = data.nompadre + ' ' + data.apellpadre;
    let namesOfAcu = data.nomacu + ' ' + data.apellacu;

    pdfDoc.getPage(2).drawText(namesOfPadre.substring(0, 28)+'.',{
        x: 72,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    });

    if(namesOfAcu !== namesOfPadre){
    pdfDoc.getPage(2).drawText(namesOfAcu.substring(0, 28)+'.',{
        x: 268,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    })
    }

    pdfDoc.getPage(2).drawText(namesStudent.substring(0, 28)+'.',{
        x: 185,
        y: pdfDoc.getPage(2).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    })

    // data page 4

    pdfDoc.getPage(3).drawText(data.grado? data.grado : '',{
        x: 377,
        y: pdfDoc.getPage(3).getHeight() - 214,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 5

    pdfDoc.getPage(4).drawText(data.grado? data.grado : '',{
        x: 182,
        y: 99,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 6

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 258,
        y: pdfDoc.getPage(5).getHeight() - 265,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 184,
        y: 219.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 271,
        y: 154.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 8

    pdfDoc.getPage(7).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 260,
        y: pdfDoc.getPage(7).getHeight() - 289.6,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfPadre? namesOfPadre : '',{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidpadre_label_frontend.length > 29 ? data.tipoidpadre_label_frontend.substring(0,29) + '...' : data.tipoidpadre_label_frontend + ' N° ' + data.docpadre,{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexppadre_label_frontend? data.munexppadre_label_frontend : '',{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 320,
        y: pdfDoc.getPage(7).getHeight() - 394,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfPadre? namesOfPadre : '',{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend + ' N° ' + data.docmadre,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexpmadre_label_frontend,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 9

    pdfDoc.getPage(8).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(8).getHeight() - 120,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 10

    pdfDoc.getPage(9).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 195,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 180,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 166.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 151.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 136.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 11

    pdfDoc.getPage(10).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(10).getHeight() - 109,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(10).getHeight() - 147.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(10).getHeight() - 172,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(10).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(10).getHeight() - 187.2,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(10).getHeight() - 202,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 231,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(10).getHeight() - 245.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(10).getHeight() - 260.3,
        size: 10,
        color: rgb(0,0,0)
    });

    const activos = data.decactivos ? data.decactivos : ' ';

    pdfDoc.getPage(10).drawText('$' + activos,{
        x: 122,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const pasivos = data.decpasivos ? data.decpasivos : ' ';

    pdfDoc.getPage(10).drawText('$' + pasivos,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const patrimonio = data.decpatrimonio ? data.decpatrimonio : ' ';

    pdfDoc.getPage(10).drawText('$' + patrimonio,{
        x: 390,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const ingresos = data.decingresos ? data.decingresos : ' ';

    pdfDoc.getPage(10).drawText('$' + ingresos,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 351,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decrpublicos === '1' ? 'SI' : data.decrpublicos === '2' ? 'NO' : '',{
        x: 325,
        y: pdfDoc.getPage(10).getHeight() - 401.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decppublic === '1' ? 'SI' : data.decppublic === '2' ? 'NO' : '',{
        x: 463,
        y: pdfDoc.getPage(10).getHeight() - 414.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decvincpublico === '1' ? 'SI' : data.decvincpublico === '2' ? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 442,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decextranjero === '1' ? 'SI' : data.decextranjero === '2' ? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 466.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decmonextern === '1' ? 'SI': data.decmonextern === '2' ? 'NO' : '',{
        x: 342,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.dectransferencias  === '1' ? 'SI' : data.dectransferencias === '2' ? 'NO' : '',{
        x: 270,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decimporta === '1' ? 'SI' : data.decimporta === '2' ? 'NO' : '',{
        x: 160,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decexporta === '1' ? 'SI' : data.decexporta === '2' ? 'NO' : '',{
        x: 286,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decotrasmact === '1' ? 'SI' : data.decotrasmact === '2' ? 'NO' : '',{
        x: 366,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 12

    pdfDoc.getPage(11).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 172,
        y: 233.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 147,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 117,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 102,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 87.8,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 13

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(12).getHeight() - 112,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(12).getHeight() - 137,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(12).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(12).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(12).getHeight() - 217,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 231.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 246,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(12).getHeight() - 260.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(12).getHeight() - 275,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent.substring(0, 28),{
        x: 72,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.grado? data.grado : '',{
        x: 350,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 149,
        y: 285.7,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 193,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 71,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 322,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 146.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 14

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 260,
        y: pdfDoc.getPage(13).getHeight() - 160,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfPadre? namesOfPadre : '',{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 237,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfAcu === namesOfPadre? '(Los del padre)' : namesOfAcu,{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 253,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 228,
        y: pdfDoc.getPage(13).getHeight() - 277,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 290,
        y: pdfDoc.getPage(13).getHeight() - 329.5,
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
}

export async function MadreAcudiente(data: any){
    const pdfUrl = '/madreyacudiente_medillin.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    pdfDoc.setTitle('2025 ' + namesStudent);

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText(data.grado + ' 2025',{
        x: 178,
        y: pdfDoc.getPage(0).getHeight() - 83.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 273,
        y: pdfDoc.getPage(0).getHeight() - 142,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent? namesStudent : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 216.5,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(0).drawText(data.tipoid_label_frontend.length > 29 ? data.tipoid_label_frontend.substring(0,29) + '...' : data.tipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.documento + ' de ' + data.mupioexp_label_frontend,{
        x: 325,
        y: pdfDoc.getPage(0).getHeight() - 235.5,
        size: 10,
        color: rgb(0,0,0)
    });

    if (data.tipoid_id === 2){
        pdfDoc.getPage(0).drawText(Number(dateBirth.getDate()-1) + '/' + Number(dateBirth.getMonth()+1) + '/' + Number(dateBirth.getFullYear()+18) ,{
            x: 262,
            y: pdfDoc.getPage(0).getHeight() - 255,
            size: 10,
            color: rgb(0,0,0)
        });
    }

    pdfDoc.getPage(0).drawText(dateBirth.getDate() + '/' + Number(dateBirth.getMonth()+1) + '/' + dateBirth.getFullYear() ,{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 274.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.direccion + ', Municipio: ' + data.municipio_label_frontend ,{
        x: 220,
        y: pdfDoc.getPage(0).getHeight() - 293.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.telefono? data.telefono : '',{
        x: 260,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.eps? data.eps : '',{
        x: 365,
        y: pdfDoc.getPage(0).getHeight() - 311.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // madre data

    pdfDoc.getPage(0).drawText(data.nommadre + ' ' + data.apellmadre,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 386,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend + ' N° ' + data.docmadre + ' de ' + data.munexpmadre_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 405,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.madreemail? data.madreemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.madrecelular? data.madrecelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 444,
        size: 10,
        color: rgb(0,0,0)
    });

    // acudiente data

    pdfDoc.getPage(0).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 380,
        y: pdfDoc.getPage(0).getHeight() - 481.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 518.4,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend + ' N° ' + data.docacu + ' de ' + data.munexpacu_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 537.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acuemail? data.acuemail : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 557,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acucelular? data.acucelular : '',{
        x: 200,
        y: pdfDoc.getPage(0).getHeight() - 576,
        size: 10,
        color: rgb(0,0,0)
    });

    // declarante data

    pdfDoc.getPage(0).drawText(data.declaranombres? data.declaranombres : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 650,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 669.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.declfechanace? data.declfechanace : '',{
        x: 195,
        y: pdfDoc.getPage(0).getHeight() - 685,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 83,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(1).getHeight() - 102.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(1).getHeight() - 121.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(1).getHeight() - 141,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.declaraemail? data.declaraemail : '',{
        x: 230,
        y: pdfDoc.getPage(1).getHeight() - 178,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 265,
        y: pdfDoc.getPage(1).getHeight() - 272.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nommadre + ' ' + data.apellmadre,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexpmadre_label_frontend,{
        x: 77,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 390,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 409,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(1).drawText('de '+data.munexpacu_label_frontend,{
        x: 326,
        y: pdfDoc.getPage(1).getHeight() - 428,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 3

    pdfDoc.getPage(2).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(2).getHeight() - 130,
        size: 10,
        color: rgb(0,0,0)
    });

    let namesOfMadre = data.nommadre + ' ' + data.apellmadre;
    let namesOfAcu = data.nomacu + ' ' + data.apellacu;

    pdfDoc.getPage(2).drawText(namesOfMadre.substring(0, 28)+'.',{
        x: 72,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    });

    if (namesOfAcu !== namesOfMadre){
    pdfDoc.getPage(2).drawText(namesOfAcu.substring(0, 28)+'.',{
        x: 268,
        y: pdfDoc.getPage(2).getHeight() - 177,
        size: 10,
        color: rgb(0,0,0)
    })
    }

    pdfDoc.getPage(2).drawText(namesStudent.substring(0, 28)+'.',{
        x: 185,
        y: pdfDoc.getPage(2).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    })

    // data page 4

    pdfDoc.getPage(3).drawText(data.grado? data.grado : '',{
        x: 377,
        y: pdfDoc.getPage(3).getHeight() - 214,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 5

    pdfDoc.getPage(4).drawText(data.grado? data.grado : '',{
        x: 182,
        y: 99,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 6

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 258,
        y: pdfDoc.getPage(5).getHeight() - 265,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 184,
        y: 219.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(5).drawText(data.grado? data.grado : '',{
        x: 271,
        y: 154.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 8

    pdfDoc.getPage(7).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 260,
        y: pdfDoc.getPage(7).getHeight() - 289.6,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfMadre? namesOfMadre : '',{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidmadre_label_frontend.length > 29 ? data.tipoidmadre_label_frontend.substring(0,29) + '...' : data.tipoidmadre_label_frontend + ' N° ' + data.docmadre,{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexpmadre_label_frontend,{
        x: 72,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 320,
        y: pdfDoc.getPage(7).getHeight() - 394,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(namesOfAcu? namesOfAcu : '',{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 410,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend + ' N° ' + data.docacu,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 425,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(7).drawText('de '+data.munexpacu_label_frontend,{
        x: 312,
        y: pdfDoc.getPage(7).getHeight() - 440,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 9

    pdfDoc.getPage(8).drawText('N° 2025'+data.documento,{
        x: 260,
        y: pdfDoc.getPage(8).getHeight() - 120,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 10

    pdfDoc.getPage(9).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 195,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 180,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 166.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 151.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(9).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 136.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 11

    pdfDoc.getPage(10).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(10).getHeight() - 109,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(10).getHeight() - 147.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(10).getHeight() - 172,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(10).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(10).getHeight() - 187.2,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(10).getHeight() - 202,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 216,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(10).getHeight() - 231,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaraocupacion_label_frontend? data.declaraocupacion_label_frontend : '',{
        x: 141,
        y: pdfDoc.getPage(10).getHeight() - 245.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(10).getHeight() - 260.3,
        size: 10,
        color: rgb(0,0,0)
    });

    const activos = data.decactivos ? data.decactivos : ' '

    pdfDoc.getPage(10).drawText('$' + activos,{
        x: 122,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const pasivos = data.decpasivos ? data.decpasivos : ' '

    pdfDoc.getPage(10).drawText('$' + pasivos,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const patrimonio = data.decpatrimonio ? data.decpatrimonio : ' '

    pdfDoc.getPage(10).drawText('$' + patrimonio,{
        x: 390,
        y: pdfDoc.getPage(10).getHeight() - 312,
        size: 10,
        color: rgb(0,0,0)
    });

    const ingresos = data.decingresos ? data.decingresos : ' '

    pdfDoc.getPage(10).drawText('$' + ingresos,{
        x: 250,
        y: pdfDoc.getPage(10).getHeight() - 351,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decrpublicos === '1' ? 'SI' : data.decrpublicos === '2' ? 'NO' : '',{
        x: 325,
        y: pdfDoc.getPage(10).getHeight() - 401.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decppublic === '1' ? 'SI' : data.decppublic === '2' ? 'NO' : '',{
        x: 463,
        y: pdfDoc.getPage(10).getHeight() - 414.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decvincpublico === '1' ? 'SI' :data.decvincpublico === '2' ? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 442,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decextranjero === '1' ? 'SI' : data.decextranjero === '2' ? 'NO' : '',{
        x: 72,
        y: pdfDoc.getPage(10).getHeight() - 466.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decmonextern === '1' ? 'SI': data.decmonextern === '2' ? 'NO' : '',{
        x: 342,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.dectransferencias  === '1' ? 'SI' : data.dectransferencias === '2' ? 'NO' : '',{
        x: 270,
        y: 148.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decimporta === '1' ? 'SI' : data.decimporta === '2' ? 'NO' : '',{
        x: 160,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decexporta === '1' ? 'SI' : data.decexporta === '2' ? 'NO' : '',{
        x: 286,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(10).drawText(data.decotrasmact === '1' ? 'SI' : data.decotrasmact === '2' ? 'NO' : '',{
        x: 366,
        y: 135.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 12

    pdfDoc.getPage(11).drawText(datanew.getDate() + ' días del mes de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 172,
        y: 233.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 147,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend + ' N° ' + data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 71,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 117,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 102,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(11).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 87.8,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 13

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 230,
        y: pdfDoc.getPage(12).getHeight() - 112,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent + ` (${data.grado})`,{
        x: 145,
        y: pdfDoc.getPage(12).getHeight() - 137,
        size: 10,
        color: rgb(0,0,0)
    })

    pdfDoc.getPage(12).drawText(data.declaranombres + ' '+ data.declaraapellidos,{
        x: 185,
        y: pdfDoc.getPage(12).getHeight() - 187,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 352,
        y: pdfDoc.getPage(12).getHeight() - 202.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declfechanace? data.declfechanace : '',{
        x: 196,
        y: pdfDoc.getPage(12).getHeight() - 217,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 231.3,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: pdfDoc.getPage(12).getHeight() - 246,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraocupacion_label_frontend,{
        x: 141,
        y: pdfDoc.getPage(12).getHeight() - 260.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: pdfDoc.getPage(12).getHeight() - 275,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(namesStudent.substring(0, 28),{
        x: 72,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.grado? data.grado : '',{
        x: 350,
        y: pdfDoc.getPage(12).getHeight() - 416,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 149,
        y: 285.7,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 71,
        y: 193,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaratipoid_label_frontend.length > 29 ? data.declaratipoid_label_frontend.substring(0,29) + '...' : data.declaratipoid_label_frontend,{
        x: 71,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText('N° '+data.declaradocumento + ' de ' + data.declaralugarexpide_label_frontend,{
        x: 322,
        y: 175.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaraemail? data.declaraemail : '',{
        x: 200,
        y: 161.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaracelular? data.declaracelular : '',{
        x: 200,
        y: 146.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(12).drawText(data.declaradireccion? data.declaradireccion : '',{
        x: 139,
        y: 132,
        size: 10,
        color: rgb(0,0,0)
    });

    // data page 14

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 260,
        y: pdfDoc.getPage(13).getHeight() - 160,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfMadre? namesOfMadre : '',{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 237,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesOfAcu === namesOfMadre? '(Los de la madre)' : namesOfAcu,{
        x: 150,
        y: pdfDoc.getPage(13).getHeight() - 253,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(data.declaranombres + ' ' + data.declaraapellidos,{
        x: 228,
        y: pdfDoc.getPage(13).getHeight() - 277,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(13).drawText(namesStudent? namesStudent : '',{
        x: 290,
        y: pdfDoc.getPage(13).getHeight() - 329.5,
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
}

export async function Chia(data:any) {
    const pdfUrl = '/Reserva_Bogota.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    pdfDoc.setTitle('2025 ' + namesStudent);

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText('2025',{
        x: 310,
        y: pdfDoc.getPage(0).getHeight() - 93.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText('2025'+data.documento,{
        x: 87,
        y: pdfDoc.getPage(0).getHeight() - 156,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.grado? data.grado : '',{
        x: 290,
        y: pdfDoc.getPage(0).getHeight() - 156,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent? namesStudent : '',{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 176,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.documento? data.documento : '',{
        x: 120,
        y: pdfDoc.getPage(0).getHeight() - 195.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoid_label_frontend.length > 29 ? data.tipoid_label_frontend.substring(0,29) + '...' : data.tipoid_label_frontend,{
        x: 247,
        y: pdfDoc.getPage(0).getHeight() - 195.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.mupioexp_label_frontend? data.mupioexp_label_frontend : '',{
        x: 428,
        y: pdfDoc.getPage(0).getHeight() - 195.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.fechanace? data.fechanace : '',{
        x: 240,
        y: pdfDoc.getPage(0).getHeight() - 215,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.municipio_label_frontend? data.municipio_label_frontend : '',{
        x: 292,
        y: pdfDoc.getPage(0).getHeight() - 235,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText('Colombia',{
        x: 450,
        y: pdfDoc.getPage(0).getHeight() - 235,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.direccion? data.direccion : '',{
        x: 110,
        y: pdfDoc.getPage(0).getHeight() - 255,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.telefono? data.telefono : '',{
        x: 430,
        y: pdfDoc.getPage(0).getHeight() - 255,
        size: 10,
        color: rgb(0,0,0)
    });

    if (data.nompadre.length > 0){
        pdfDoc.getPage(0).drawText(data.nompadre? data.nompadre : '',{
            x: 92,
            y: pdfDoc.getPage(0).getHeight() - 305,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.docpadre? data.docpadre : '',{
            x: 455,
            y: pdfDoc.getPage(0).getHeight() - 305,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.padreoficina? data.padreoficina : '',{
            x: 468,
            y: pdfDoc.getPage(0).getHeight() - 324.5,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.emailpadre? data.emailpadre : '',{
            x: 145,
            y: pdfDoc.getPage(0).getHeight() - 345,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.padrecelular? data.padrecelular : '',{
            x: 420,
            y: pdfDoc.getPage(0).getHeight() - 345,
            size: 10,
            color: rgb(0,0,0)
        });
    }
    if(data.nommadre.length > 0){
        pdfDoc.getPage(0).drawText(data.nommadre? data.nommadre : '',{
            x: 92,
            y: pdfDoc.getPage(0).getHeight() - 394,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.docmadre? data.docmadre : '',{
            x: 455,
            y: pdfDoc.getPage(0).getHeight() - 394,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.madreoficina? data.madreoficina : '',{
            x: 468,
            y: pdfDoc.getPage(0).getHeight() - 413.5,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.madreemail? data.madreemail : '',{
            x: 145,
            y: pdfDoc.getPage(0).getHeight() - 434,
            size: 10,
            color: rgb(0,0,0)
        });
        pdfDoc.getPage(0).drawText(data.madrecelular? data.madrecelular : '',{
            x: 420,
            y: pdfDoc.getPage(0).getHeight() - 434,
            size: 10,
            color: rgb(0,0,0)
        });
    }

    pdfDoc.getPage(0).drawText(data.acuparentesco_label_frontend? data.acuparentesco_label_frontend : '',{
        x: 92,
        y: pdfDoc.getPage(0).getHeight() - 466,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 92,
        y: pdfDoc.getPage(0).getHeight() - 485.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.docacu? data.docacu : '',{
        x: 455,
        y: pdfDoc.getPage(0).getHeight() - 485.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acuoficina? data.acuoficina : '',{
        x: 440,
        y: pdfDoc.getPage(0).getHeight() - 505,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acuemail? data.acuemail : '',{
        x: 145,
        y: pdfDoc.getPage(0).getHeight() - 523.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.acucelular? data.acucelular : '',{
        x: 422,
        y: pdfDoc.getPage(0).getHeight() - 523.8,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.eps? data.eps : '',{
        x: 180,
        y: pdfDoc.getPage(0).getHeight() - 562,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.emernombre? data.emernombre : '',{
        x: 100,
        y: pdfDoc.getPage(0).getHeight() - 637,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.emertelefono? data.emertelefono : '',{
        x: 400,
        y: pdfDoc.getPage(0).getHeight() - 637,
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
}