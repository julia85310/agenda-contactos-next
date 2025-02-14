import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvdrkmbpxzqxegsexpmk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2ZHJrbWJweHpxeGVnc2V4cG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzEyMzcsImV4cCI6MjA1MjUwNzIzN30.FLFfxcijVBRLAGI3a3Na7Gs2M_eIicklSkZp4RnvaX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
const {searchParams} = new URL(request.url)
const idBuscado = searchParams.get("id")
  try {
    const { data: contacto, error } = await supabase.from('contacto').select('*').eq('id', idBuscado).single();

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(contacto), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}