import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false)

    //Funcion q se ejecuta cdo el usuario escriba en un imput
    const actualizarState = e => {
        //console.log(e.target.value)
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })

    }

    // Extraer los valores de la cita
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario envía el formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "" ){
            //console.log("Hay un error")
            actualizarError(true)
            return;           
        }

        // Eliminar el mensaje previo
        actualizarError(false)

        // Asignar un ID
        cita.id = uuidv4()

        // Crear la cita
        crearCita(cita)

        // Reiniciar el Form cn el modificador del state
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return ( 
        <> 
            <h2>Crear citas</h2>

            { error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null }

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </>

     );
}


// Documentar componentes
Formulario.protoTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;