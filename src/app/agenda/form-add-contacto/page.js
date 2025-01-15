'use client'
import {useState} from 'react';
export default function AddContactPage(){
    const emptyForm = {nombre: '', apellidos: '', correo: '', telefono: '', fecha_nacimiento: ''};
    const [formData, setFormData] = useState(emptyForm);

    async function addContact(e){
        e.preventDefault();
        if(!comprobaciones()){
            return;
        }
        
        try {
            const res = await fetch("http://localhost:3000/api/agenda", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setFormData(emptyForm);
                alert('Contacto añadido');
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    function comprobaciones(){
        const patternCorreo = /.+@.+\..+/;
        const patternTlf = /^[0-9]{9}$/;
        let todoGuay = true;
        if(!formData.nombre){
            alert('Nombre requerido');
            todoGuay = false;
        }else if(!formData.apellidos){
            alert('Apellidos requeridos');
            todoGuay = false;
        }else if(!formData.telefono){
            alert('Telefono requerido');
            todoGuay = false;
        }else if(!patternCorreo.test(formData.correo)){
            alert('Correo inválido');
            todoGuay = false;
        }else if(!patternTlf.test(formData.telefono)){
            alert('Telefono inválido (9 dígitos)');
            todoGuay = false;
        }
        return todoGuay;
    }

    return <div>
        <h1>Añadir un nuevo contacto</h1>
        <form onSubmit={(e) => addContact(e)}>
            <label>Nombre: <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required></input></label><br></br>
            <label>Apellidos: <input type="text" value={formData.apellidos} onChange={(e) => setFormData({...formData, apellidos: e.target.value})} required></input></label><br></br>
            <label>Correo: <input type="text" value={formData.correo} pattern=".+@.+\..+" onChange={(e) => setFormData({...formData, correo: e.target.value})}></input></label><br></br>
            <label>Teléfono: <input type="number" value={formData.telefono} pattern="[0-9]{9}" onChange={(e) => setFormData({...formData, telefono: e.target.value})}></input></label><br></br>
            <label>Fecha de naciemiento: <input type="date" value={formData.fecha_nacimiento} onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}></input></label><br></br>
            <input type='submit' value='Añadir contacto'></input>
        </form>
    </div>
}