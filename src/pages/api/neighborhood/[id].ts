import sql from "$lib/lib/sql";
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) =>{
    try{
        const [neighborhood] = await sql.query(`select * from barrio where municipio_id = ${params.id};`);
        return new Response(JSON.stringify(neighborhood), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        });
    } catch (e) {
        return new Response(JSON.stringify({message: e}), { status: 500, headers: {"Content-Type": "application/json"} });
    }
}