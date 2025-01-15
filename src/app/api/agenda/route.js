import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvdrkmbpxzqxegsexpmk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHJrbWJweHpxeGVnc2V4cG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzEyMzcsImV4cCI6MjA1MjUwNzIzN30.FLFfxcijVBRLAGI3a3Na7Gs2M_eIicklSkZp4RnvaX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data: contactos, error } = await supabase.from('contacto').select('*').order('nombre', { ascending: true }).order('apellidos', { ascending: true });;

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(contactos), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function comprobaciones(body){
  const patternCorreo = /.+@.+\..+/;
  const patternTlf = /^[0-9]{9}$/;
  if(!body.nombre){
    return new Response(
      JSON.stringify({ error: 'Nombre requerido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.apellidos){
    return new Response(
      JSON.stringify({ error: 'Apellidos requeridos'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.telefono){
    return new Response(
      JSON.stringify({ error: 'Teléfono requerido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.correo){
    body = {...body, correo: null};
  }else if(!patternCorreo.test(body.correo)){
    return new Response(
      JSON.stringify({ error: 'Correo inválido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  if(!patternTlf.test(body.telefono)){
    return new Response(
      JSON.stringify({ error: 'Teléfono inválido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.fecha_nacimiento){
    body = {...body, fecha_nacimiento: null};
  }
  return body;
}

export async function POST(request) {
  const body = await request.json();
  const res = comprobaciones(body);

  if(res instanceof Response){
    return res;
  }

  try {
    const { data: data, error } = await supabase.from('contacto').insert([res]);
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request) {
  const body = await request.json();
  const res = comprobaciones(body);

  if(res instanceof Response){
    return res;
  }

  if (!res.id) {
    return new Response(
      JSON.stringify({ error: 'ID requerido para actualizar' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data: data, error } = await supabase.from('contacto')
    .update({
      nombre: body.nombre,
      apellidos: body.apellidos,
      telefono: body.telefono,
      correo: body.correo,
      fecha_nacimiento: body.fecha_nacimiento
    }).eq('id', body.id);
    
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request){
    const body = await request.json();
    
    try{
      const {data: data, error} = await supabase.from('contacto').delete().eq('id', body.id);

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
}
