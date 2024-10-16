import type { APIRoute } from "astro";
import mail from "$lib/lib/mail";
import sql from "$lib/lib/sql";
import passwordRandom from "$lib/lib/codeRandom";

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;

    const [student]: any[] = await sql.query(`SELECT id FROM estudiante WHERE documento = ?`, [id]);

    if (student.length === 0) {
        return new Response(JSON.stringify({message: 'Documento no encontrado'}), { status: 404 });
    }

    const [rows]: any[] = await sql.query(`SELECT * FROM verificar WHERE documento = ?`, [id]);
    const code = passwordRandom(20);
    if (rows.length === 0) {
        await sql.query(`INSERT INTO verificar (documento, codigo) VALUES (?, ?)`, [id, code]);
    }else{
        await sql.query(`UPDATE verificar SET codigo = ?, activo = 0 WHERE documento = ?`, [code, id]);
    }

    const [parents]: any[] = await sql.query('select email from estudiante_familia where idestudiante = ?;', [student[0].id]);

    parents.forEach((parent: any) => {
        mail(code, parent.email);
    });
    
    /*
    mail(code, 'networpava@gmail.com');
    */

    return new Response(JSON.stringify(rows[0]), { status: 200 });
};

export const POST: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const [rows]: any[] = await sql.query(`SELECT * FROM verificar WHERE documento = ?`, [id]);
    if (rows.length === 0) {
        return new Response(JSON.stringify({message: 'Documento no encontrado'}), { status: 404 });
    }
    const { codigo } = rows[0];

    if (codigo !== body.codigo) {
        await sql.query('DELETE FROM verificar WHERE documento = ?', [id]);
        return new Response(JSON.stringify({message: 'Código incorrecto'}), { status: 400 });
    }

    await sql.query(`UPDATE verificar SET activo = 1 WHERE documento = ?`, [id]);

    return new Response(JSON.stringify({message: 'Reserva Activada'}), { status: 200 });
};