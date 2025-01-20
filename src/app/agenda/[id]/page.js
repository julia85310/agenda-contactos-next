'use client'
import {use, useState, useEffect} from 'react';
export default function ContactPage({params}){
    const {id} = use(params);
    const [contacto, setContacto] = useState({});
    const [modoEdicion, setModoEdicion] = useState(false);
    
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

    function comprobaciones(){
        const patternCorreo = /.+@.+\..+/;
        const patternTlf = /^[0-9]{9}$/;
        let todoGuay = true;
        if(!contacto.nombre){
            alert('Nombre requerido');
            todoGuay = false;
        }else if(!contacto.apellidos){
            alert('Apellidos requeridos');
            todoGuay = false;
        }else if(!contacto.telefono){
            alert('Telefono requerido');
            todoGuay = false;
        }else if(!patternCorreo.test(contacto.correo)){
            alert('Correo inválido');
            todoGuay = false;
        }else if(!patternTlf.test(contacto.telefono)){
            alert('Telefono inválido (9 dígitos)');
            todoGuay = false;
        }
        return todoGuay;
    }

    async function updateDatos(e){
        e.preventDefault();
        if (!comprobaciones()){
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/agenda", {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(contacto),
            });

            const data = await res.json();

            if (res.ok) {
                fetchData();
                setModoEdicion(false);
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    function deshacer(){
        setModoEdicion(false);
        fetchData();
    }
    
    return <div>
        {!modoEdicion? 
            <div>
            <h1>{contacto.nombre} {contacto.apellidos}</h1>
            <main className='datos'>
                <p>ID: {id}</p>
                {!!contacto.correo && <p>Correo: {contacto.correo}</p>}
                <p>Teléfono: {contacto.telefono}</p>
                {!!contacto.fecha_nacimiento && <p>Fecha de nacimiento: {contacto.fecha_nacimiento}</p>}
                <button onClick={() => setModoEdicion(true)}>Editar</button>
            </main>
            </div>:
            <main>
                <form onSubmit={(e) => updateDatos(e)}>
                    <label>Nombre: <input type="text" value={contacto.nombre} onChange={(e) => setContacto({...contacto, nombre: e.target.value})} required></input></label><br></br>
                    <label>Apellidos: <input type="text" value={contacto.apellidos} onChange={(e) => setContacto({...contacto, apellidos: e.target.value})} required></input></label><br></br>
                    <label>Correo: <input type="text" value={contacto.correo} pattern=".+@.+\..+" onChange={(e) => setContacto({...contacto, correo: e.target.value})}></input></label><br></br>
                    <label>Teléfono: <input type="number" required value={contacto.telefono} pattern="[0-9]{9}" onChange={(e) => setContacto({...contacto, telefono: e.target.value})}></input></label><br></br>
                    <label>Fecha de naciemiento: <input type="date" value={contacto.fecha_nacimiento} onChange={(e) => setContacto({...contacto, fecha_nacimiento: e.target.value})}></input></label><br></br>
                    <input className='submit' type='submit' value='Confirmar'></input><button onClick={deshacer}>Deshacer</button>
                </form>
            </main>
            }
    </div>
}