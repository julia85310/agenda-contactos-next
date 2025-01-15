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

    async function eliminarContacto(contacto) {
        const result = window.confirm(`¿Deseas eliminar a ${contacto.nombre} ${contacto.apellidos}?`);
        if (!result) {
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/agenda", {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: contacto.id}),
            });

            const data = await res.json();

            if (res.ok) {
                fetchData();
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    return <div>
        <h1>Contactos</h1>
        <ul>
            {contactos.map((contacto) =>
                <li key={contacto.id}>
                    {contacto.nombre} {contacto.apellidos}
                    <button onClick={() => eliminarContacto(contacto)}></button>
                </li>
            )}
        </ul>
    </div>
}