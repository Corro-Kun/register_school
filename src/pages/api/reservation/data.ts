import type { APIRoute } from "astro";
import sql from "$lib/lib/sql";
import swj from "jsonwebtoken";

export const GET: APIRoute = async ({ params, request }) => {
    const token = request.headers.get("authorization") || "";
    const TOKEN = import.meta.env.SECRET_TOKEN || "";
    let error = false;

    swj.verify(token, TOKEN, (err: any, decoded: any) => {
        if (err){
            error = true;
            return
        }
        if (decoded.password !== import.meta.env.SECRET_PASSWORD){
            error = true; 
            return
        }
    }); 

    if (error){
        return new Response(JSON.stringify({message: "Unauthorized"}), {
            status: 401,
            headers: {"Content-Type": "application/json"}
        });
    }

    const [data]: any[] = await sql.query('SELECT r.nombres, r.apellidos, r.documento, t.abreviacion ,r.declaradocumento, r.declaranombres, r.declaraapellidos, r.declaraemail, r.declaradireccion, r.inftributaria, m.nombre as municipio FROM reservacupo r JOIN tipoid t ON t.id = r.declaratipoid JOIN municipio m ON m.id = r.declarareside WHERE r.kpsystem = 1;');

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
};