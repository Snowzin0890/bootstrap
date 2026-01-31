$(document).ready(function(){

    // Progress bar - Dados das progress bars (container, multiplicador, duração)
    const progressBarsData = [
        { id: 'circleA', multiplier: 60, duration: 1400 },
        { id: 'circleB', multiplier: 254, duration: 1600 },
        { id: 'circleC', multiplier: 32, duration: 2000 },
        { id: 'circleD', multiplier: 5243, duration: 2200 }
    ];

    // Criar progress bars dinamicamente
    const circles = [];
    progressBarsData.forEach(data => {
        const container = document.getElementById(data.id);
        const circle = new ProgressBar.Circle(container, {
            color: '#00FFFF',
            strokeWidth: 8,
            duration: data.duration,
            from: { color: '#aaa' },
            to: { color: '#1c2c40' },
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                let value = Math.round(circle.value() * data.multiplier);
                circle.setText(value);
            }
        });
        circles.push(circle);
    });

    //Iniciando o loader quando o usuario chega no elemento
    let dataAreaOffset = $('#data-area').offset()
    let stop = 0

    $(window).scroll(function(e){

        let scroll = $(window).scrollTop()

        if(scroll > (dataAreaOffset.top - 500) && stop == 0){

            circles.forEach(circle => circle.animate(1.0))
            stop = 1

        }
    })

    //Parallax
    // setTimeout serve para carregar primeiro as imagens
    setTimeout(function(){

        $('#data-area').parallax({imageSrc:'img/uberlandia.png'})
        $('#apply-area').parallax({imageSrc: 'img/pattern.png'});

    },250)
    
    // Filtro portfólio
  $('.filter-btn').on('click', function() {

    let type = $(this).attr('id');
    let boxes = $('.project-box');

    $('.main-btn').removeClass('active');
    $(this).addClass('active');

    if(type == 'dsg-btn') {
      eachBoxes('dsg', boxes);
    } else if(type == 'dev-btn') {
      eachBoxes('dev', boxes);
    } else if(type == 'seo-btn') {
      eachBoxes('seo', boxes);
    } else {
      eachBoxes('all', boxes);
    }

  });


  function eachBoxes(type, boxes) {

    if(type == 'all') {
      $(boxes).fadeIn();
    } else {
      $(boxes).each(function() {
        if(!$(this).hasClass(type)) {
          $(this).fadeOut('slow');
        } else {
          $(this).fadeIn();
        }
      });
    }
  }

  // scroll para as seções
  let navBtn = $('.nav-item');

  let bannerSection = $('#mainSlider');
  let aboutSection = $('#about-area');
  let servicesSection = $('#services-area');
  let teamSection = $('#team-area');
  let portfolioSection = $('#portfolio-area');
  let contactSection = $('#contact-area');

  let scrollTo = '';

  $(navBtn).click(function(e) {

    e.preventDefault();

    let btnId = $(this).attr('id');

    if(btnId == 'about-menu') {
      scrollTo = aboutSection;
    } else if(btnId == 'services-menu') {
      scrollTo = servicesSection;
    } else if(btnId == 'team-menu') {
      scrollTo = teamSection;
    } else if(btnId == 'portfolio-menu') {
      scrollTo = portfolioSection;
    } else if(btnId == 'contact-menu') {
      scrollTo = contactSection;
    } else {
      scrollTo = bannerSection;
    }

    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top - 70
    }, 250);
  });

})

function mostrar(){

    // Obtém o botão de "Veja mais/menos"
    const btn = document.querySelector('#btn-mais button')

    // Obtém todos os elementos de colunas da área de time
    const cols = Array.from(document.querySelectorAll('#team-area .container .row > .col-md-3'))

    // Considera os primeiros 4 visíveis; o restante são os que serão alternados
    const extras = cols.slice(4)

    // Verifica se algum elemento extra está ainda oculto; se sim, mostra; senão, oculta
    const anyHidden = extras.some(col => col.classList.contains('desativo'))

    if(anyHidden){

        // Remove a classe "desativo" para mostrar os elementos
        extras.forEach(col => col.classList.remove('desativo'))
        btn.innerHTML = 'Veja menos <i class="bi-caret-up-fill"></i>'

    }else{

        // Adiciona a classe "desativo" para ocultar os elementos
        extras.forEach(col => col.classList.add('desativo'))
        btn.innerHTML = 'Veja mais <i class="bi-caret-down-fill"></i>'

    }

    // Forçar recálculo do parallax após mudança no DOM
    setTimeout(function(){
        $(window).trigger('resize.px.parallax');
    }, 50);

}

// Validação de formulário
document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('#contact-form');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            
            const nome = document.querySelector('#contact-form input[name="name"]').value.trim();
            const email = document.querySelector('#contact-form input[name="email"]').value.trim();
            const mensagem = document.querySelector('#contact-form textarea').value.trim();
            
            // Validar campos vazios
            if(!nome || !email || !mensagem){
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                alert('Por favor, insira um email válido!');
                return;
            }
            
            // Se passou na validação, mostrar mensagem de sucesso
            alert('Obrigado! Sua mensagem foi enviada com sucesso!');
            form.reset();
        });
    }
});