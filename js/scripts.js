$(document).ready(function(){

    //Progress bar
    let containerA = document.getElementById('circleA')

    let circleA = new ProgressBar.Circle(containerA, {
        color: '#00FFFF',
        strokeWidth: 8,
        duration: 1400,
        from: {color:'#aaa'},
        to: {color:'#1c2c40'},

        step: function(state, circle){

            circle.path.setAttribute('stroke', state.color)

            let value = Math.round(circle.value() * 60)

            circle.setText(value)
        }

    })

    let containerB = document.getElementById('circleB')

    let circleB = new ProgressBar.Circle(containerB, {
        color: '#00FFFF',
        strokeWidth: 8,
        duration: 1600,
        from: {color:'#aaa'},
        to: {color:'#1c2c40'},

        step: function(state, circle){

            circle.path.setAttribute('stroke', state.color)

            let value = Math.round(circle.value() * 254)

            circle.setText(value)
        }

    })

    let containerC = document.getElementById('circleC')

    let circleC = new ProgressBar.Circle(containerC, {
        color: '#00FFFF',
        strokeWidth: 8,
        duration: 2000,
        from: {color:'#aaa'},
        to: {color:'#1c2c40'},

        step: function(state, circle){

            circle.path.setAttribute('stroke', state.color)

            let value = Math.round(circle.value() * 32)

            circle.setText(value)
        }

    })

    let containerD = document.getElementById('circleD')

    let circleD = new ProgressBar.Circle(containerD, {
        color: '#00FFFF',
        strokeWidth: 8,
        duration: 2200,
        from: {color:'#aaa'},
        to: {color:'#1c2c40'},

        step: function(state, circle){

            circle.path.setAttribute('stroke', state.color)

            let value = Math.round(circle.value() * 5243)

            circle.setText(value)
        }

    })

    //Iniciando o loader quando o usuario chega no elemento
    let dataAreaOffset = $('#data-area').offset()
    let stop = 0

    $(window).scroll(function(e){

        let scroll = $(window).scrollTop()

        if(scroll > (dataAreaOffset.top - 500) && stop == 0){

            circleA.animate(1.0)
            circleB.animate(1.0)
            circleC.animate(1.0)
            circleD.animate(1.0)

            stop = 1

        }
    })

    //Parallax
    setTimeout(function(){

        $('#data-area').parallax({imageSrc:'img/uberlandia.png'})

    },250)

})

function mostrar(){
    const btn = document.querySelector('#btn-mais button')
    const cols = Array.from(document.querySelectorAll('#team-area .container .row > .col-md-3'))

    // Consider first 4 visible; others are the ones to toggle
    const extras = cols.slice(4)

    // If any extra is still hidden, show them; otherwise hide them
    const anyHidden = extras.some(col => col.classList.contains('desativo'))

    if(anyHidden){
        extras.forEach(col => col.classList.remove('desativo'))
        btn.innerHTML = 'Veja menos <i class="bi-caret-up-fill"></i>'
    }else{
        extras.forEach(col => col.classList.add('desativo'))
        btn.innerHTML = 'Veja mais <i class="bi-caret-down-fill"></i>'
        // bring button into view so user sees the collapse
        btn.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

}