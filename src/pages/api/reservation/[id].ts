import sql from "$lib/lib/sql";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    try{
        const [municipality]: any[] = await sql.query('select * from municipio ORDER BY nombre ASC;');
        const [dni]: any[] = await sql.query('select * from tipoid;');
        const [ocupation]: any[] = await sql.query('select * from ocupacion;');
        const [country]: any[] = await sql.query('select * from pais;');
        const [parents]: any[] = await sql.query('select * from parentesco where descripcion != "Padre" and descripcion != "Madre" and descripcion != "Acudiente";');
        let [student]: any[] = await sql.query('select id, nombres, apellidos, documento, idtipoid as tipoid_id, mupioexp, nacefecha, direccion, municipio_id, barrio_id, telefono, enfermedad, matricula_id from estudiante where documento = ?;', [params.id]);
        let [neighborhood]: any[] = await sql.query('select * from barrio;');
        student[0].fechanace = new Date(student[0].nacefecha).toISOString().split('T')[0];
        let [father]: any[] = await sql.query('select id, nombres, apellidos, documento, email, celular from estudiante_familia where idestudiante = ?  and idparentesco = 1 ;', [student[0].id]);
        let [mother]: any[] = await sql.query('select id, nombres, apellidos, documento, email, celular from estudiante_familia where idestudiante = ?  and idparentesco = 2 ;', [student[0].id]);
        let [grade]: any[] = await sql.query('select g.titulo from matricula m JOIN grupo u ON m.idgrupo = u.id JOIN grado g ON u.idgrado = g.id where m.idestudiante = ?;', [student[0].id]);
        let [eps]: any[] = await sql.query('select eps.nombre from estudiante JOIN eps ON estudiante.ideps = eps.id where estudiante.id = ?;', [student[0].id]);
        student[0].grado = grade.length > 0 ? grade[0].titulo : null;
        student[0].eps = eps.length > 0 ? eps[0].nombre : null;
        const data = {
            municipality: municipality,
            dni: dni,
            parents: parents,
            ocupation: ocupation,
            student: student,
            country: country,
            neighborhood: neighborhood,
            father: father.length > 0 ? father[0] : null,
            mother: mother.length > 0 ? mother[0] : null
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        });
    } catch (e) {
        return new Response(JSON.stringify({message: e}), { status: 500,
            headers: {"Content-Type": "application/json"}
         });
    }
}

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();

        let [student]: any[] = await sql.query('select id, idinstitucion from estudiante where documento = ?;', [params.id]);

        await sql.query('update estudiante set mupioexp = ?, direccion = ?, municipio_id = ?, barrio_id = ?, telefono = ?, enfermedad = ? where id = ?;', [body.mupioexp, body.direccion, body.municipio_id, body.barrio_id, body.telefono, body.enfermedad, student[0].id]);

        const dateNow = new Date();

        const year = dateNow.getFullYear();
        const month = String(dateNow.getMonth() + 1).padStart(2, '0'); 
        const day = String(dateNow.getDate()).padStart(2, '0'); 

        const currentDate = `${year}/${month}/${day}`;

        const [verify]: any[] = await sql.query('select * from reservacupo where estudiante_id = ?;', [student[0].id]);

        let id = 0;

        if (verify.length > 0){
            await sql.query('update reservacupo set apellidos = ?, nombres = ?, documento = ?, tipoid_id = ?, mupioexp_id = ?, fechanace = ?, direccion = ?, municipio_id = ?, barrio_id = ?, telefono = ?, observacion = ?, fecha = ?, padrevivo = ?, madrevive = ?, emernombre = ?, emertelefono = ?, tipoemer = ? where estudiante_id = ?;', [body.apellidos, body.nombres, params.id, body.tipoid_id, body.mupioexp, body.fechanace, body.direccion, body.municipio_id, body.barrio_id, body.telefono, body.enfermedad, currentDate, body.padrevivo, body.madreviva, body.emernombre, body.emertelefono, body.tipoemer, student[0].id]);
            id = verify[0].id;
        }else{
            const [insert]: any[] = await sql.query('insert into reservacupo (estudiante_id, estado, apellidos, nombres, documento, tipoid_id, mupioexp_id, fechanace, direccion, municipio_id, barrio_id, telefono, observacion, anyo, institucion_id, fecha, padrevivo, madrevive, emernombre, emertelefono, tipoemer ) values (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [student[0].id, body.apellidos, body.nombres, params.id, body.tipoid_id, body.mupioexp, body.fechanace, body.direccion, body.municipio_id, body.barrio_id, body.telefono, body.enfermedad, '2025', student[0].idinstitucion, currentDate, body.padrevivo, body.madreviva, body.emernombre, body.emertelefono, body.tipoemer]);
            id = insert.insertId;
        }

        await sql.query('update estudiante set reservacupo_id = ? where id = ?;', [id, student[0].id]);

        if (body.padrevivo === '1'){
            await sql.query('update estudiante_familia set email = ?, celular = ? where idestudiante = ? and idparentesco = 1;', [body.emailpadre, body.padrecelular, student[0].id]);
            await sql.query('update reservacupo set nompadre = ?, apellpadre = ?, docpadre = ?, emailpadre = ?, padrecelular = ?, tipoidpadre_id = ?, munexppadre_id = ?, padreoficina = ? where id = ?;', [body.nompadre, body.apellpadre, body.docpadre, body.emailpadre, body.padrecelular, body.tipoidpadre_id, body.munexppadre_id, body.padreoficina ,id]);
        }
        if (body.madreviva === '1'){
            await sql.query('update estudiante_familia set email = ?, celular = ? where idestudiante = ? and idparentesco = 2;', [body.madreemail, body.madrecelular, student[0].id]);
            await sql.query('update reservacupo set nommadre = ?, apellmadre = ?, docmadre = ?, madreemail = ?, madrecelular = ?, tipoidmadre_id = ?, munexpmadre_id = ?, madreoficina = ? where id = ?', [body.nommadre, body.apellmadre, body.docmadre, body.madreemail, body.madrecelular, body.tipoidmadre_id, body.munexpmadre_id, body.madreoficina, id]);
        }
        
        await sql.query('update reservacupo set acuparentesco_id = ?, nomacu = ?, apellacu = ?, docacu = ?, tipoidacu_id = ?, munexpacu_id = ?, acuemail = ?, acucelular = ?, declaratipo = ?, declaranombres = ?, declaraapellidos = ?, declaradocumento = ?, declaratipoid = ?, declaraemail = ?, declaracelular = ?, declarafechanace = ?, declaralugarnace = ?, declaradireccion = ?, declarareside = ?, declaraocupacion = ?, declaralugarexpide = ?, decactivos = ?, decpasivos = ?, decpatrimonio = ?, decotrosing = ?, decconcepto = ?, decrpublicos = ?, decppublic = ?, decvincpublico = ?, decextranjero = ?, decorigen = ?, decimporta = ?, decexporta = ?, decinversiones = ?, dectransferencias = ?, decmonextern = ?, deccuentasme = ?, kpsystem = ?, declaraparentesco = ?, declarapais = ?, acuoficina= ?, prodtypeex = ?, prodident = ?, prodnum = ?, prodmonto = ?, prodcountr = ?, prodmuni = ?, prodmoneda = ?, declaraempresa = ?, inftributaria = ?, declaranit = ? where id = ?;', [body.acuparentesco_id, body.nomacu, body.apellacu, body.docacu, body.tipoidacu_id, body.munexpacu_id, body.acuemail, body.acucelular, body.declaratipo, body.declaranombres, body.declaraapellidos, body.declaradocumento, body.declaratipoid, body.declaraemail, body.declaracelular, body.declfechanacedb , body.declaralugarnace, body.declaradireccion, body.declarareside, body.declaraocupacion, body.declaralugarexpide, body.decactivos, body.decpasivos, body.decpatrimonio, body.decotrosing, body.decconcepto, body.decrpublicos, body.decppublic, body.decvincpublico, body.decextranjero, body.decorigen, body.decimporta, body.decexporta, body.decinversiones, body.dectransferencias, body.decmonextern, body.deccuentasme, 1, body.declaraparentesco, body.declarapais , body.acuoficina , body.prodtypeex, body.prodident, body.prodnum, body.prodmonto, body.prodcountr, body.prodmuni, body.prodmoneda, body.declaraempresa, body.inftributaria, body.declaranit, id]);

        return new Response(JSON.stringify({message: 'ok'}), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        });
    } catch (error) {
        return new Response(JSON.stringify({message: error}), { status: 500,
            headers: {"Content-Type": "application/json"}
        });
    }
};