import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import formatDate from "./utils/formatDate";

const App = () => {
    const [tareas, setTareas] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const ENDPOINT = "api/tarea/";

    const mostrarTareas = async () => {
        const response = await fetch(ENDPOINT + "Lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data);
        } else {
            console.log("status code:", response.status)
        }
    }

    useEffect(() => {
        mostrarTareas();
    }, []);

    const guardarTarea = async (e) => {
        e.preventDefault();

        const response = await fetch(ENDPOINT + "Guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ descripcion: descripcion })
        });

        if (response.ok) {
            setDescripcion("")
            await mostrarTareas();
        }
    }

    const cerrarTarea = async (id) => {

        const response = await fetch(ENDPOINT + "Cerrar/" + id, {
            method: "DELETE"
        });

        if (response.ok) {
            await mostrarTareas();
        }
    }

    return (
        <div className="container bg-dark p-4 vh-100">

            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarTarea}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese la descripcion de la tarea"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit" >Agregar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map((item) => (
                                <div key={item.idTarea} className="list-group-item list-group-item-action">
                                    <h5 className="text-primary">{item.descripcion}</h5>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => cerrarTarea(item.idTarea)}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;