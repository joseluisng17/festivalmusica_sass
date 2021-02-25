document.addEventListener('DOMContentLoaded', function(){
    scrollNav();

    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header');

    // Registrar el Intersection a observar
    const observer = new IntersectionObserver( function(entries){
        //console.log(entries[0]);
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        }else{
            barra.classList.add('fijo');
        }
    });

    // Elemento a observar
    observer.observe(document.querySelector('.video'));
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    //console.log(enlaces);

    enlaces.forEach( function(enlace){
        //console.log(enlace);
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            //console.log(e.target.attributes.href.value);

            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}