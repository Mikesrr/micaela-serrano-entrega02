async function fetchData(url, selector, template) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar los datos desde ${url}`);
        }

        const datos = await respuesta.json();
        const elemento = document.querySelector(selector);

        if (elemento) {
            elemento.innerHTML = template(datos);
        }
    } catch (error) {
        console.error(error);
    }
}

const personal = document.getElementById("personal")
personal.innerHTML = ` 
                <div class="box">
                    <div class="box-content">
                        <img class="cv-image" src="./img/chicofigma1.png" alt="person">
                        <div class="personal-info">
                            <div class="contact">
                                <div>
                                    <h1 class="title-1">Nombre</h1>
                                    <p class="text-1">Front-end developer</p>
                                </div>
                                <div>
                                    <p>
                                        <i class="fa-solid fa-envelope"></i>
                                        <a href="email:ejemplo@mail.com" class="text-1">ejemplo@mail.com</a>
                                    </p>
                                    <p>
                                        <i class="fa-solid fa-phone"></i>
                                        <a href="tel:5491112345678" class="text-1">+54 9 11-1234-5678</a>
                                    </p>
                                </div>
                            </div>
                            <div class="description">
                                <p class="text-1">
                                    Self-motivated developer, who is willing to learn and create outstanding UI
                                    applications.
                                </p>
                                <p class="text-1 for-desktop">
                                    Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat
                                    malesuada molestie.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`;


const skills = document.getElementById("skills")
skills.innerHTML = ` 
    <div class="box-content">
    <h2 class="title-1">Skills</h2>
    <div class="skills-container">
        <ul>
            <li>
                <span class="title-1 text-dark">HTML</span>
                <div class="outer-bar">
                    <div class="big-inner-bar"></div>
                </div>
            </li>
            <li>
                <span class="title-1 text-dark">CSS</span>
                <div class="outer-bar">
                    <div class="small-inner-bar"></div>
                </div>
            </li>
            <li>
                <span class="title-1 text-dark">JS</span>
                <div class="outer-bar">
                    <div class="big-inner-bar"></div>
                </div>
            </li>
            <li>
                <span class="title-1 text-dark">REACT</span>
                <div class="outer-bar">
                    <div class="small-inner-bar"></div>
                </div>
            </li>
        </ul>
    </div>
</div>`;

function certificates(datos) {
    let template = "";

    datos.slice(0, 1).forEach((dato) => {
        const img = document.createElement("div");
        img.classList.add("image");
        img.style.backgroundImage = `url(${dato.img})`;

        const certificate = document.createElement("div");
        certificate.classList.add("certificate");
        certificate.appendChild(img);

        template += `
        <div class="certificates-container mt-16">
            ${certificate.outerHTML}
            <div class="text-certi">
                <h4 class="text-2">${dato.titulo}</h4>
                <p class="text-3">${dato.fecha}</p>
            </div>
        </div>`;
    });

    datos.slice(1, 3).forEach((dato) => {
        const img = document.createElement("div");
        img.classList.add("image");
        img.style.backgroundImage = `url(${dato.img})`;

        const certificate = document.createElement("div");
        certificate.classList.add("certificate");
        certificate.appendChild(img);

        template += `
        <div class="certificates-container mt-16 none">
            ${certificate.outerHTML}
            <div class="text-certi">
                <h4 class="text-2">${dato.titulo}</h4>
                <p class="text-3">${dato.fecha}</p>
            </div>
        </div>`;

    });

    return template;
}

fetchData(
    "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/certificado",
    "#certificates",
    certificates
);

function experiences(datos) {
    let template = "";

    datos.slice(0, 1).forEach((dato) => {
        template += `
        <div class="experience-card bordered mt-16">
        <div class="title">
            <img src="${dato.img}" alt="Adidas">
            <span class="text-3">${dato.fecha}</span>
            <h3 class="text-2">
            ${dato.titulo}
            </h3>
        </div>
        <div class="content">
            <span class="text-3">Feb 2022 - Actualidad</span>
            <h3 class="text-2">
                Front-end Developer
            </h3>
            <p class="text-2">
            ${dato.descripcion}
            </p>
        </div>
    </div>`;
    });

    datos.slice(1, 2).forEach((dato) => {
        template += `
        <div class="experience-card bordered mt-16 none">
        <div class="title">
            <img src="${dato.img}"" alt="Adidas">
            <span class="text-3">${dato.fecha}</span>
            <h3 class="text-2">
            ${dato.titulo}
            </h3>
        </div>
        <div class="content">
            <span class="text-3">Feb 2022 - Actualidad</span>
            <h3 class="text-2">
                Front-end Developer
            </h3>
            <p class="text-2">
            ${dato.descripcion}
            </p>
        </div>
    </div>`;
    });

    return template;
}

fetchData(
    "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/experiencia",
    "#experiences",
    experiences
);

const botonResponsive = document.querySelector("#responsive");
botonResponsive.classList.add("active");

let originalData = null;
let currentPage = 1;

function limpiarPaginacion() {
    document.querySelector(".controls-container").innerHTML = "";
    currentPage = 1;
}

function Responsive(datos) {
    let template = "";

    if (datos.responsive && datos.responsive.length > 0) {
        // Almacenar los datos originales
        originalData = datos.responsive;

        const contador = document.querySelector("#proyec_numero");
        contador.innerHTML = `Proyecto(${originalData.length})`;

        const itemsPerPage = 3;
        let currentData = originalData;

        // Función para renderizar la página actual
        function renderPage(page) {
            template = ""; // Reinicializa la variable template

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const slicedData = currentData.slice(start, end);

            slicedData.forEach((dato) => {
                template += `
                        <div class="slide">
                            <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                            <div class="portfolio-content">
                                <span class="title-2">
                                    ${dato.etiqueta}
                                </span>
                                <h3 class="title-1 mt-16">
                                    ${dato.titulo}
                                </h3>
                                <p class="text-1 mt-24">
                                    ${dato.descripcion}
                                </p>
                                <div class="buttons-container mt-16">
                                    <button class="active">Demo</button>
                                    <button class="outlined">Code</button>
                                </div>
                            </div>
                        </div>`;
            });

            // Actualizar la paginación
            if (currentData.length) {
                const totalPages = Math.ceil(currentData.length / itemsPerPage);
                const paginationContainer = document.querySelector(".controls");
                paginationContainer.innerHTML = "";

                for (let i = 1; i <= totalPages; i++) {
                    const pageElement = document.createElement("div");
                    pageElement.classList.add("page");
                    if (i === page) {
                        pageElement.classList.add("active");
                    }
                    pageElement.innerHTML = `<span>${i}</span>`;
                    pageElement.addEventListener("click", () => {
                        currentPage = i;
                        renderPage(currentPage);
                    });
                    paginationContainer.appendChild(pageElement);
                }
            } else {
                limpiarPaginacion()
            }

            // Mostrar la vista actual
            document.querySelector("#carrusel").innerHTML = template;
        }

        renderPage(currentPage); // Renderiza la página 1 al principio
        renderPage(vista);
    }
}

fetchData(
    "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
    "#carrusel",
    Responsive
);

function Responsive2(datos) {
    let template = "";

    if (datos.responsive && datos.responsive.length > 0) {

        datos.responsive.slice(0, 1).forEach((dato) => {
            template += `
            <div class="slide">
                    <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                    <div class="portfolio-content">
                        <span class="title-2">
                        ${dato.etiqueta}
                        </span>
                        <h3 class="title-1 mt-16">
                        ${dato.titulo}
                        </h3>
                        <p class="text-1 mt-24">
                        ${dato.descripcion}
                        </p>
                        <div class="buttons-container mt-16">
                            <button class="active">Demo</button>
                            <button class="outlined">Code</button>
                        </div>
                    </div>
                    </div>`;
        });
    }
    return template;

}

fetchData(
    "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
    "#porfolio",
    Responsive2
);

const botones = document.querySelector(".buttons-container")
botones.addEventListener("click", (e) => {

    const botonReact = document.querySelector("#react");
    const botonResponsive = document.querySelector("#responsive");
    const botonJavaScript = document.querySelector("#javascript")

    if (e.target === botonReact) {

        botonResponsive.classList.remove("active");
        botonJavaScript.classList.remove("active");
        botonReact.classList.add("active");

        let originalData = null;
        let currentPage = 1;

        function limpiarPaginacion() {
            document.querySelector(".controls-container").innerHTML = "";
            currentPage = 1;
        }

        function carrusel(datos) {
            let template = "";

            if (datos.React && datos.React.length > 0) {
                // Almacenar los datos originales
                originalData = datos.React;

                const contador = document.querySelector("#proyec_numero");
                contador.innerHTML = `Proyecto(${originalData.length})`;

                const itemsPerPage = 3;
                let currentData = originalData;

                // Función para renderizar la página actual
                function renderPage(page) {
                    template = ""; // Reinicializa la variable template

                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    const slicedData = currentData.slice(start, end);

                    slicedData.forEach((dato) => {
                        template += `
                        <div class="slide">
                            <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                            <div class="portfolio-content">
                                <span class="title-2">
                                    ${dato.etiqueta}
                                </span>
                                <h3 class="title-1 mt-16">
                                    ${dato.titulo}
                                </h3>
                                <p class="text-1 mt-24">
                                    ${dato.descripcion}
                                </p>
                                <div class="buttons-container mt-16">
                                    <button class="active">Demo</button>
                                    <button class="outlined">Code</button>
                                </div>
                            </div>
                        </div>`;
                    });

                    // Actualizar la paginación
                    if (currentData.length) {
                        const totalPages = Math.ceil(currentData.length / itemsPerPage);
                        const paginationContainer = document.querySelector(".controls");
                        paginationContainer.innerHTML = "";

                        for (let i = 1; i <= totalPages; i++) {
                            const pageElement = document.createElement("div");
                            pageElement.classList.add("page");
                            if (i === page) {
                                pageElement.classList.add("active");
                            }
                            pageElement.innerHTML = `<span>${i}</span>`;
                            pageElement.addEventListener("click", () => {
                                currentPage = i;
                                renderPage(currentPage);
                            });
                            paginationContainer.appendChild(pageElement);
                        }
                    } else {
                        limpiarPaginacion()
                    }

                    // Mostrar la vista actual
                    document.querySelector("#carrusel").innerHTML = template;
                }

                renderPage(currentPage); // Renderiza la página 1 al principio
                renderPage(vista);
            }
        }
        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#carrusel",
            carrusel
        );

    } else if (e.target === botonResponsive) {
        botonJavaScript.classList.remove("active");
        botonReact.classList.remove("active");
        botonResponsive.classList.add("active");

        let originalData = null;
        let currentPage = 1;

        function limpiarPaginacion() {
            document.querySelector(".controls-container").innerHTML = "";
            currentPage = 1;
        }

        function Responsive(datos) {
            let template = "";

            if (datos.responsive && datos.responsive.length > 0) {
                // Almacenar los datos originales
                originalData = datos.responsive;

                const contador = document.querySelector("#proyec_numero");
                contador.innerHTML = `Proyecto(${originalData.length})`;

                const itemsPerPage = 3;
                let currentData = originalData;

                // Función para renderizar la página actual
                function renderPage(page) {
                    template = ""; // Reinicializa la variable template

                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    const slicedData = currentData.slice(start, end);

                    slicedData.forEach((dato) => {
                        template += `
                        <div class="slide">
                            <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                            <div class="portfolio-content">
                                <span class="title-2">
                                    ${dato.etiqueta}
                                </span>
                                <h3 class="title-1 mt-16">
                                    ${dato.titulo}
                                </h3>
                                <p class="text-1 mt-24">
                                    ${dato.descripcion}
                                </p>
                                <div class="buttons-container mt-16">
                                    <button class="active">Demo</button>
                                    <button class="outlined">Code</button>
                                </div>
                            </div>
                        </div>`;
                    });

                    // Actualizar la paginación
                    if (currentData.length) {
                        const totalPages = Math.ceil(currentData.length / itemsPerPage);
                        const paginationContainer = document.querySelector(".controls");
                        paginationContainer.innerHTML = "";

                        for (let i = 1; i <= totalPages; i++) {
                            const pageElement = document.createElement("div");
                            pageElement.classList.add("page");
                            if (i === page) {
                                pageElement.classList.add("active");
                            }
                            pageElement.innerHTML = `<span>${i}</span>`;
                            pageElement.addEventListener("click", () => {
                                currentPage = i;
                                renderPage(currentPage);
                            });
                            paginationContainer.appendChild(pageElement);
                        }
                    } else {
                        limpiarPaginacion()
                    }

                    // Mostrar la vista actual
                    document.querySelector("#carrusel").innerHTML = template;
                }

                renderPage(currentPage); // Renderiza la página 1 al principio
                renderPage(vista);
            }
        }

        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#carrusel",
            Responsive
        );
    }
    else if (e.target === botonJavaScript) {

        botonReact.classList.remove("active");
        botonResponsive.classList.remove("active");
        botonJavaScript.classList.add("active");


        let originalData = null;
        let currentPage = 1;

        function limpiarPaginacion() {
            document.querySelector(".controls-container").innerHTML = "";
            currentPage = 1;
        }


        function carrusel(datos) {

            let template = "";

            if (datos.javascript && datos.javascript.length > 0) {
                // Almacenar los datos originales
                originalData = datos.javascript;

                const contador = document.querySelector("#proyec_numero");
                contador.innerHTML = `Proyecto(${originalData.length})`;

                const itemsPerPage = 3;
                let currentData = originalData;

                // Función para renderizar la página actual
                function renderPage(page) {
                    template = ""; // Reinicializa la variable template

                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    const slicedData = currentData.slice(start, end);

                    slicedData.forEach((dato) => {
                        template += `
                        <div class="slide">
                            <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                            <div class="portfolio-content">
                                <span class="title-2">
                                    ${dato.etiqueta}
                                </span>
                                <h3 class="title-1 mt-16">
                                    ${dato.titulo}
                                </h3>
                                <p class="text-1 mt-24">
                                    ${dato.descripcion}
                                </p>
                                <div class="buttons-container mt-16">
                                    <button class="active">Demo</button>
                                    <button class="outlined">Code</button>
                                </div>
                            </div>
                        </div>`;
                    });

                    // Actualizar la paginación
                    if (currentData.length) {
                        const totalPages = Math.ceil(currentData.length / itemsPerPage);
                        const paginationContainer = document.querySelector(".controls");
                        paginationContainer.innerHTML = "";

                        for (let i = 1; i <= totalPages; i++) {
                            const pageElement = document.createElement("div");
                            pageElement.classList.add("page");
                            if (i === page) {
                                pageElement.classList.add("active");
                            }
                            pageElement.innerHTML = `<span>${i}</span>`;
                            pageElement.addEventListener("click", () => {
                                currentPage = i;
                                renderPage(currentPage);
                            });
                            paginationContainer.appendChild(pageElement);
                        }
                    } else {
                        limpiarPaginacion()
                    }

                    // Mostrar la vista actual
                    document.querySelector("#carrusel").innerHTML = template;
                }

                renderPage(currentPage); // Renderiza la página 1 al principio
                renderPage(vista);
            }
        }
        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#carrusel",
            carrusel
        );
    }

    // porfolio de un sola img

    if (e.target === botonReact) {

        function carrusel(datos) {

            let template = "";

            if (datos.React && datos.React.length > 0) {

                datos.React.slice(0, 1).forEach((dato) => {
                    template += `
                    <div class="slide">
                    <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                    <div class="portfolio-content">
                        <span class="title-2">
                        ${dato.etiqueta}
                        </span>
                        <h3 class="title-1 mt-16">
                        ${dato.titulo}
                        </h3>
                        <p class="text-1 mt-24">
                        ${dato.descripcion}
                        </p>
                        <div class="buttons-container mt-16">
                            <button class="active">Demo</button>
                            <button class="outlined">Code</button>
                        </div>
                    </div>
                    </div>`;
                });
            }
            return template;

        }
        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#porfolio",
            carrusel
        );

    } else if (e.target === botonResponsive) {

        function Responsive(datos) {
            let template = "";

            if (datos.responsive && datos.responsive.length > 0) {

                datos.responsive.slice(0, 1).forEach((dato) => {
                    template += `
                    <div class="slide">
                            <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                            <div class="portfolio-content">
                                <span class="title-2">
                                ${dato.etiqueta}
                                </span>
                                <h3 class="title-1 mt-16">
                                ${dato.titulo}
                                </h3>
                                <p class="text-1 mt-24">
                                ${dato.descripcion}
                                </p>
                                <div class="buttons-container mt-16">
                                    <button class="active">Demo</button>
                                    <button class="outlined">Code</button>
                                </div>
                            </div>
                            </div>`;
                });
            }
            return template;

        }

        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#porfolio",
            Responsive
        );

    } else if (e.target === botonJavaScript) {

        function carrusel(datos) {

            let template = "";

            if (datos.javascript && datos.javascript.length > 0) {

                datos.javascript.slice(0, 1).forEach((dato) => {
                    template += `
                    <div class="slide">
                    <img class="img_porfolio" src="${dato.img}" alt="Portfolio">
                    <div class="portfolio-content">
                        <span class="title-2">
                        ${dato.etiqueta}
                        </span>
                        <h3 class="title-1 mt-16">
                        ${dato.titulo}
                        </h3>
                        <p class="text-1 mt-24">
                        ${dato.descripcion}
                        </p>
                        <div class="buttons-container mt-16">
                            <button class="active">Demo</button>
                            <button class="outlined">Code</button>
                        </div>
                    </div>
                    </div>`;
                });
            }
            return template;

        }
        fetchData(
            "https://my-json-server.typicode.com/Mikesrr/API-Digitaleers/proyecto",
            "#porfolio",
            carrusel
        );
    }
});
