const formatDate = (string) => {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fecha = new Date(string).toLocaleDateString("es-PE", options);
    let hora = new Date(string).toLocaleTimeString();
    return fecha + " | " + hora;
}

export default formatDate