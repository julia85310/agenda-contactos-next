'use client'
import {use, useState, useEffect} from 'react';
export default function ContactPage({params}){
    const {id} = use(params);
    const [contacto, setContacto] = useState({});

    useEffect(() => {
            fetchData();
    }, [])
    
    async function fetchData() {
        const url = "/api/agenda/contacto?id=" + id
        const res = await fetch(url);
        const data = await res.json();
        setContacto(data);
    }

    if (!contacto) {
        return <h1>Task not found</h1>;
    }
    
    return <div>
        <h1>{contacto.nombre} {contacto.apellidos}</h1>
        <p>ID: {id}</p>
        {!!contacto.correo && <p>Correo: {contacto.correo}</p>}
        <p>Teléfono: {contacto.telefono}</p>
        {!!contacto.fecha_nacimiento && <p>Fecha de nacimiento: {contacto.fecha_nacimiento}</p>}
    </div>
}