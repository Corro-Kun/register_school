
import { PDFDocument, rgb } from 'pdf-lib';

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export async function Acudiente(data:any){
    const pdfUrl = '/acudiente_medillin.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());  

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // student data

    let namesStudent = data.nombres + ' ' + data.apellidos;

    let datanew = new Date();
    let dateBirth = new Date(data.fechanace+'T00:00:00');

    pdfDoc.getPage(0).drawText(datanew.getDate() + ' de ' + month[datanew.getMonth()] + ' de ' + datanew.getFullYear(),{
        x: 273,
        y: pdfDoc.getPage(0).getHeight() - 142,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(namesStudent,{
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
    
    pdfDoc.getPage(0).drawText(data.telefono,{
        x: 260,
        y: pdfDoc.getPage(0).getHeight() - 312.5,
        size: 10,
        color: rgb(0,0,0)
    });

    // acudiente data

    pdfDoc.getPage(0).drawText(data.nomacu + ' ' + data.apellacu,{
        x: 185,
        y: pdfDoc.getPage(0).getHeight() - 387,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.tipoidacu_label_frontend.length > 29 ? data.tipoidacu_label_frontend.substring(0,29) + '...' : data.tipoidacu_label_frontend,{
        x: 160,
        y: pdfDoc.getPage(0).getHeight() - 406.5,
        size: 10,
        color: rgb(0,0,0)
    });

    pdfDoc.getPage(0).drawText(data.docacu + ' de ' + data.munexpacu_label_frontend,{
        x: 328,
        y: pdfDoc.getPage(0).getHeight() - 406.5,
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