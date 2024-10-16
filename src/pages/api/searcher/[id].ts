import sql from "$lib/lib/sql";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
    const [student]: any[] = await sql.query('select nombres, apellidos, id from estudiante where documento = ?;', [params.id]);
    if (student.length === 0) {
        return new Response(JSON.stringify({message: 'No se encontró el estudiante'}), { status: 404 });
    }
    const [matricule]: any[] = await sql.query('select id from matricula where idestudiante = ? and idanyo = 11', [student[0].id]);
    if (matricule.length === 0) {
        return new Response(JSON.stringify({message: 'No se encontró la matrícula'}), { status: 404 });
    }
    const [photo]: any[] = await sql.query('select * from fotos where idmatricula = ?;', [matricule[0].id]);
    const data = {
        names: student[0].nombres,
        lastnames: student[0].apellidos,
        photo: photo[0] === undefined ? null : photo[0].data.toString('base64'),
        type: photo[0] === undefined ? null : photo[0].imagetype
    }
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
};