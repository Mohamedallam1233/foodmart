(function($) {

  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
	}

  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      }
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });
  }

  var initProductQty = function(){

    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('#quantity').val());
          if(quantity>0){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);

function deletepro(e){
e.parentElement.parentElement.remove()
const disprize= parseFloat((e.parentElement.querySelector('.sub-prize').textContent).replace("$", ""))
const cart_total=parseFloat((document.querySelector('.cart-total').textContent).replace("$", ""))
console.log(document.querySelector('.cart-total').textContent,disprize);
document.querySelector('.cart-total').textContent=`$${cart_total-disprize}`;
document.querySelector('.total').innerHTML=`$${cart_total-disprize}`;
document.querySelector('.badge').innerHTML=+document.querySelector('.badge').textContent-1

}

function addtocart(e){
  let product=e.parentElement.parentElement.querySelector('h3').textContent;
  let prize=e.parentElement.parentElement.querySelector('.price').textContent;
  const totalPrice=document.querySelector('.total').textContent;
  const number=e.parentElement.parentElement.querySelector('#quantity').value;
  const image_product=e.parentElement.parentElement.querySelector('.tab-image').src
  let cart=document.querySelector('.list-cart');
  
var priceNumber = parseFloat(prize.replace("$", ""));


var nameProducts = document.querySelectorAll('.name_product');
var searchTerm = product;
var found = false;

nameProducts.forEach(function(element) {
  if (element.textContent.includes(searchTerm)) {
    found = true;
  }
});

if (found==false) {
  cart.innerHTML +=`<li class="list-group-item d-flex justify-content-between lh-sm">
  <div>
    <div class="d-flex align-items-center">
    <img src='${image_product}' style="width:50px;50px;">
    <h6 class="my-0 name_product">${product}</h6>
    </div>
    <span class="text-body-secondary">quantity:${number}</span>
    
  </div>
  <div class='d-flex align-items-center'>
  <span class="text-body-secondary px-2 sub-prize">$${number*priceNumber}</span>
  <i class="fa-solid fa-trash-can" style="color:tomato" onclick="deletepro(this)"></i>
  </div>
</li>`
if(totalPrice.includes('$')){
  var totalprize_num=parseFloat(totalPrice.replace("$", ""));
  document.querySelector('.total').innerHTML=`$${+totalprize_num+number*priceNumber}`
}
else{
  document.querySelector('.total').innerHTML=`$${+totalPrice+number*priceNumber}`
}
document.querySelector('.cart-total').textContent=document.querySelector('.total').innerHTML
document.querySelector('.badge').innerHTML=+document.querySelector('.badge').textContent+1

} else {
  alert('هذا المنتج موجود مسبقا في عربتك')
}

}

function checkoutpage(){
  window.location.href='./checkout.html'
}