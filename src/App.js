import { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  // Citas en local storage
  /* Importante: Local Storage solo almacena Strings */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales = []
  }

  // Arreglo de citas (todas)
  const [citas, guardarCitas] = useState(citasIniciales)

  // Use Effect para realizar ciertas operaciones cuando el state cambia (el useEffect siempre es un arrowFunction)
  useEffect(() =>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else{
      localStorage.setItem('citas', JSON.stringify([]))
    }

    console.log('Documento listo o algo paso con las citas');
  }, [citas]) //en este caso al pasarle citas como dependencia, va a estar atento a cdo cambie el state citas



  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita])
  }

  // Funcion para eliminar cita, por su ID para
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id )
    guardarCitas(nuevasCitas)
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>

            {
              citas.map( cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
