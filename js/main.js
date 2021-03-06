let api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

let $themeList = $("#theme-list");

let cargarPagina = function () {
    cargarTemas();
    $("#add-form").submit(agregarTema);
    $("#form-busqueda").submit(filtrarResultados);
};

let cargarTemas = function () {
    $.getJSON(api.url, function (temas) {
        temas.forEach(crearTema);
    });
}

let crearTema = function (tema) {
    let nombreTema = tema.author_name;
    let contenido = tema.content;
    let respuestas = tema.responses_count;
    //Aqui vamos a crear una fila nueva
    let $tr = $("<tr />");
    // Creamos la celda del contenido 
    let $contenidoCelda = $("<td />");
    // Insertamos el contenido
    $contenidoCelda.text(contenido);
    //Creamos la celda del autor
    let $autorCelda = $("<td />");
    //Insertamos el autor
    $autorCelda.text(nombreTema);
    //Creamos la celda de las respuestas
    let $respuestasCelda = $("<td />");
    //Insertamos el numero de respuestas
    $respuestasCelda.text(respuestas);

    $tr.append($contenidoCelda);
    $tr.append($autorCelda);
    $tr.append($respuestasCelda);

    //Agregamos filas a la tabla
    $themeList.append($tr);
}


let agregarTema = function (e) {
    e.preventDefault();
    let tema = $("#nombre-tema").val();
    let autor = $("#nombre-autor").val();
    let contador = 0;

    $.post(api.url, {
        author_name: autor,
        content: tema,
        responses_count: contador,
    }, function (tema) {
        crearTema(tema);
        $("#myModal").modal("hide");
    });
}

//establecer funcion para filtar los resultados 

function filtrarResultados(e){
    e.preventDefault();
    let parametrosBusqueda= $("#exampleInputName2").val().toLowerCase();
    //console.log(parametrosBusqueda);
    let temasFiltrados= cargarTemas.filter(function(tema){
        return tema.content.toLowerCase().indexOf(parametrosBusqueda) >= 0;
    });
    //crearTema(temasFiltrados);
};

/*let filtrarResultados = function (e) {
    e.preventDefault(); //para evitar que se recarge la pag. 
    let formaBusqueda = $("#exampleInputName2").val().toLowerCase();

    let temasFiltrados = $themeList.filter(function (tema) {
        return tema.contenido.toLocaleLowerCase().indexOf(formaBusqueda) >= 0;
    });

    cargarTemas(temasFiltrados);
};*/

$(document).ready(cargarPagina);
