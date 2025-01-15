'use client';

import {useState, useEffect} from 'react';

export default function AgendaPage(){

    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/agenda');
        const data = await res.json();
        setContactos(data);
    }

    return <div>
        <h1>Contactos</h1>
        <ul>
            {contactos.map((contacto) =>
                <li key={contacto.id}>
                    {contacto.nombre} {contacto.apellidos}
                </li>
            )}
        </ul>
    </div>
}