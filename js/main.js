$(document).ready(function () {
    AOS.init();
//animirani linkovi
$("#navlista a").hover(
    function(){
    $(this).stop(true,true).animate
    (
        {
            fontSize: '+=5px'
        }, 500
    );
    },
    function(){
    $(this).stop(true,true).animate
    (
        {
            fontSize: '-=5px'
        }, 500
    );
});
//menjanje slike na background-u
setInterval(function(){
    var current = $('#slajder .show');
    var next = current.next().length ? current.next() : current.parent().children(':first');
    
    current.hide().removeClass('show');
    next.fadeIn().addClass('show');
}, 3000)
//dinamicko ispisivanje p tagova
var pTagText = [`Since 1978, a family tradition carried out with passion and quality
 the real Italian Pizza and a genuine pizzeria with delivery are our best features.`,
 ` Biggy... simply good! We have wide range of pizzas made with original italian recipes from 1970.
Try our pizzas and you will see why we are the best pizzeria in town!`]
var pTag = []
var drzacPTagova = document.getElementById('about');
for (let i=0; i<pTagText.length; i++){
    pTag[i] = document.createElement('p');
    pTag[i].innerHTML += pTagText[i];
    pTag[i].classList.add('pt-2', 'tekstAbout','wrap','mx-auto');
    drzacPTagova.appendChild(pTag[i]);
}
//dinamicko ispisivanje pica 
var pizzaImg = ['pizza-1','pizza-2','pizza-4', 'pizza-5','pizza-7','pizza-8','pizza-3','pizza-6'];
var pizzaImena = ['Capricciosa', 'Marinara', 'Quattro Formaggi', 'Prosciutto e Funghi', 'Margherita','Braccio di Ferro','Mediterranea', 'Parmigiana']
var pizzaSastojci = [`Tomato sauce, mozzarella, ham, artichokes, mushrooms, and olives`,`Tomato sauce, garlic and basil`,
`Tomato sauce, mozzarella, parmesan, gorgonzola cheese, artichokes, and oregano`,` Tomato sauce, mozzarella, ham, spinach, and mushrooms`,
`Tomato sauce, mozzarella, and oregano`,`Mozzarella, ricotta cheese, and parmesan`,`Tomato sauce, buffalo mozzarella, cherry tomatoes and pepper`, `Tomato sauce, mozzarella, eggplants and parmesan flakes`]
var pizzaCena32 = [12.99,13.99,15.99,11.99, 10.99, 9.99, 10.99, 11.99]
var pizzaCena50 = [17.99, 18.99, 20.99, 16.99, 15.99, 14.99, 15.99, 16.99]
var pica32 = '32cm'
var pica50 = '50cm'
var drzacPica = `<div class="row d-flex space-between pt-5">`
for (let i=0; i<pizzaImena.length; i++)
{
    drzacPica+=`<div class="col-lg-6 col-md-6 col-sm-12 text-center odvajanje font-weight-bold pt-2">
    <img src="img/${pizzaImg[i]}.jpg" class="slikaPica borderZaPicu borderLRB borderT" alt="${pizzaImg} slika" />
    <p class="sirinaTagaUPizza mx-auto borderLRB fontpica mb-0"> ${pizzaImena[i]} </p>
    <p class="wrap sirinaTagaUPizza mx-auto borderLRB mb-0"> Ingredients: ${pizzaSastojci[i]} </p>
    <p class="sirinaTagaUPizza mx-auto borderLRB mb-0"> Price: $${pizzaCena32[i]} <i class="fas fa-long-arrow-alt-right"></i> ${pica32} </p>
    <p class="sirinaTagaUPizza mx-auto borderLRB mb-0"> Price: $${pizzaCena50[i]} <i class="fas fa-long-arrow-alt-right"></i> ${pica50}</p>
    </div>`;
    if(((i+1)%4)==0 && i!=pizzaImena.length-1)
    drzacPica+=`</div> <div class="row pt-5">`
    if(i==pizzaImena.length-1){
    drzacPica+=`</div>`;
    }
}
var containerPizza = document.getElementById('drzacZaPice');
console.log(containerPizza);
containerPizza.innerHTML+=drzacPica;
$('#send').attr('class','btn-background');
$('#send').hover(function()
{
    $(this).stop(true,true).animate(
    {
        padding: '+=5px',
    }
    , 750);
},
function()
{
    $(this).stop(true,true).animate(
    {
        padding: '-=5px',
    }
    , 500);
});
var inputi = document.querySelectorAll('input');
for (let i=0; i<inputi.length; i++)
{
    inputi[i].classList.add('bg-transparent','inputbg');
}
var ddlPica = document.getElementById('izaberiPicu');
var options = `<option value="0" class="text-dark font-weight-bold"> Choose.. </option> `;
for (let i=0; i<pizzaImena.length; i++)
{
    options+=`<option value="${i+1}" class="text-dark font-weight-bold"> ${pizzaImena[i]} </option>`
}
ddlPica.innerHTML+=options;
var ispisDodataka = document.getElementById('dodaci');
var dodaci = ['Tomato Sauce', 'Mozzarella','Parmesan','Olives','Mushrooms','Ham','Eggplant'];
var dodaciIspis='<br/>'
for(let i=0; i<dodaci.length; i++)
{
    dodaciIspis+=`<input type="checkbox" name="extra" value="${i+1}" class="ml-5" /> <span class="boja ml-2"> Extra ${dodaci[i]} <span> <br/>`
    if(i==dodaci.length-1){
        dodaciIspis+=`<p class="boja font-weight-bold mx-auto notewidth mt-3"> Note: 0.7$ extra charge per additional ingredient </p>`
    }
}
document.getElementById('dodaci').innerHTML+=dodaciIspis;
//animacija ddl

//Provera forme
document.getElementById('send').addEventListener('click', function(){
    vrednostiForme = []
    ukupnaCena= []
    var radi = true;
    var Ime = $('#ime');
    var vrIme = Ime.val();
    var RegExpIme = /^[A-ZČĆĐŠŽ][a-zčćđšž]{2,29}$/
    if(proveriMe(vrIme, RegExpIme))
    {
        vrednostiForme.push(vrIme);
        oduzmi(Ime);
    }
    else{ dodaj(Ime); radi = false;}
       
    var Prezime = $('#prezime');
    var vrPrezime = Prezime.val();
    var RegExpPrezime = /^([A-ZČĆĐŠŽ][a-zčćđšž]{2,})(\s[A-ZČĆĐŠŽ][a-zčćđšž]{2,})*$/
    if(proveriMe(vrPrezime, RegExpPrezime))
    {
        vrednostiForme.push(vrPrezime);
        oduzmi(Prezime);        
    }
    else{
     dodaj(Prezime);
     radi = false;
    }
    var Broj = $('#brojTelefona');
    var vrBroj = Broj.val();
    var RegExpBroj = /^((\+3816[0-9]{7,9})|(06[0 1 2 3 4 5 6 9][0-9]{6,7}))$/
    if(proveriMe(vrBroj, RegExpBroj))
    {
        vrednostiForme.push(vrBroj);
        oduzmi(Broj);
    }
    else
    { 
        dodaj(Broj);
        radi = false;
    }
   

     var Adresa = $('#adresa');
     var vrAdresa=Adresa.val();
     var RegExAdresa = /^([A-ZČĆĐŠŽ][a-zčćđšž\.]+)(\s[A-zČĆĐŠŽčćđšž][a-zčćđšž]+)*\s?(([0-9\w]{2,4})|([0-9]))$/
     if(proveriMe(vrAdresa, RegExAdresa))
     {
         vrednostiForme.push(vrAdresa);
         oduzmi(Adresa);
     }
     else{
        dodaj(Adresa);
        radi = false;
     }
     var izaberi= $('#izaberiPicu');
     var vrIzabrane = izaberi.val();
     if(vrIzabrane!=0)
     {
         vrednostiForme.push(vrIzabrane);
         oduzmi(izaberi);
     }
     else{
         dodaj(izaberi)
         radi = false;
     }
     var velicina = document.getElementsByName('size');
     var vrVelicina = '';
     for(let i = 0; i<velicina.length; i++)
     {
         if(velicina[i].checked)
         {
            vrVelicina=velicina[i].value;
            break;
         }
     }
     if(vrVelicina!='')
     {
         vrednostiForme.push(vrVelicina);
         velicina[velicina.length-1].nextElementSibling.nextElementSibling.classList.remove('d-block');
     }
     else {
         velicina[velicina.length-1].nextElementSibling.nextElementSibling.classList.add('d-block');
         radi = false;
        }
     var sviDodaci = document.getElementsByName('extra');
     var uzmiDodatke = [];
     for (let i=0; i<sviDodaci.length; i++)
     {
        if(sviDodaci[i].checked) uzmiDodatke.push(sviDodaci[i].value);
     }
     for(let i=0; i<pizzaImena.length; i++)
     {
        if(vrVelicina==32 && pizzaImena[i]==pizzaImena[vrIzabrane-1])
        {
        ukupnaCena.push(pizzaCena32[i])
        break;
        }
        if(vrVelicina==50 && pizzaImena[i]==pizzaImena[vrIzabrane-1])
        {
        ukupnaCena.push(pizzaCena50[i])
        break;
        }
     }
    var cenaDodatka = 0.7
     for (let i=0; i<uzmiDodatke.length; i++)
     {
        ukupnaCena.push(cenaDodatka);
     }
 
     var ingredientsPrice = cenaDodatka*(ukupnaCena.length-1);
     var totalPrice=ukupnaCena[0]+ingredientsPrice;  
     if(radi)
         
     {
       if(confirm(`Your Order:\nSelected pizza: ${pizzaImena[vrIzabrane-1]}
Selected size: ${vrVelicina}cm\nPizza price: ${ukupnaCena[0]}
Additional ingredients selected: ${ukupnaCena.length-1}*$0.7 = $${Math.round(ingredientsPrice*100)/100}
Grand total: $${Math.round(totalPrice*100)/100}`)== true)
     {
         alert('Thanks for ordering pizza!');
     }
    
    }

});
function proveriMe(vrednost, regEx)
{
    return regEx.test(vrednost);
}
function dodaj(element){ element.next().addClass('d-block')}
function oduzmi(element){ element.next().removeClass('d-block');}
});
