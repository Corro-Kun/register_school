import type { APIRoute } from "astro";
import CreateToken from '$lib/lib/swj';

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    if (body.password !== import.meta.env.SECRET_PASSWORD) {
        return new Response(JSON.stringify({message: 'Invalid password'}), {
            status: 401,
            headers: {"Content-Type": "application/json"}
        });
    }

    const token = await CreateToken({password: body.password});

    return new Response(JSON.stringify({token: token}), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
};