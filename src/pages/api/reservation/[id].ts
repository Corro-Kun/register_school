import sql from "$lib/lib/sql";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
    try{
        const [municipality] = await sql.query('select * from municipio where departamento_id = 13;');
        const [dni] = await sql.query('select * from tipoid;');
        let [student] = await sql.query('select id, nombres, apellidos, documento, idtipoid as tipoid_id, mupioexp, nacefecha, direccion, municipio_id, barrio_id, telefono, enfermedad, matricula_id from estudiante where documento = ?;', [params.id]);
        let [neighborhood] = await sql.query('select * from barrio where municipio_id = ?;', [student[0].municipio_id]);
        student[0].fechanace = new Date(student[0].nacefecha).toISOString().split('T')[0];

        const data = {
            municipality: municipality,
            dni: dni,
            student: student,
            neighborhood: neighborhood
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