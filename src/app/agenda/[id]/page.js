'use client'
import {use, useState, useEffect} from 'react';
export default function ContactPage({params}){
    const {id} = use(params);
    const [contacto, setContacto] = useState({});

    useEffect(() => {
            fetchData();
        }, [])
    
    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/agenda/contacto');
        const data = await res.json();
        setContacto(data);
    }

    return <div>
        <h1>Contacto de {contacto.nombre} {contacto.apellidos}</h1>
        <p>ID: {contacto.id}</p>
        <p>Correo: {contacto.correo}</p>
        <p>Teléfono: {contacto.telefono}</p>
        <p>Fecha de nacimiento: {contacto.fechaNacimiento}</p>
    </div>
}