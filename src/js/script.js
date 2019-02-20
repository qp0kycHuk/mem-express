window.addEventListener('DOMContentLoaded', function () {
  const cartWrapper = document.querySelector('.cart__wrapper'),
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'),
    totallCost = document.querySelector('.cart__total > span'),
    titles = document.querySelectorAll('.goods__title'),
    empty = cartWrapper.querySelector('.empty');;

  function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = '';
  }

  function sliceTitle() {
    titles.forEach(function (item) {
      if (item.textContent.lenght < 70) {
        return;
      } else {
        const str = item.textContent.slice(0, 71) + ' ...';
        item.textContent = str;
      }
    });
  }

  function showConfirm() {
    let counter = 100;
    const id = setInterval(frame, 10);
    confirm.style.display = 'block';

    function frame() {
      if (counter == 10) {
        clearInterval(id);
        confirm.style.display = 'none';
      } else {
        counter--;
        confirm.style.transform = `translateY(-${counter}px)`;
        confirm.style.opacity = '.' + counter;
      }
    }
  }

  function calcGoods() {
    const items = cartWrapper.querySelectorAll('.goods__item');
    badge.textContent = items.length;
    if (items.length == 0) {
      empty.style.display = 'block';
    }
  }

  function calcTotal() {
    const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
    let total = 0;
    prices.forEach(function (item) {
      total += +item.textContent;
    });
    totallCost.textContent = total;
  }

  sliceTitle();
  addToCart();
  open.addEventListener('click', openCart);
  close.addEventListener('click', closeCart);

  function addToCart() {
    goodsBtn.forEach(function (btn, i) {
      btn.addEventListener('click', () => {
        let item = products[i].cloneNode(true),
          trigger = item.querySelector('button'),
          removeBtn = document.createElement('div');


        trigger.remove();




        removeBtn.classList.add('goods__item-remove');
        removeBtn.innerHTML = '&times';
        item.appendChild(removeBtn);

        cartWrapper.appendChild(item);
        if (empty) {
          empty.style.display = 'none';
        }
        showConfirm();
        calcGoods();
        calcTotal();
        removeFromCart();
      });
    });
  }


  function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    removeBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.parentElement.remove();
        calcGoods();
        calcTotal();
      });
    });
  }



});

//aaaaaaaaaaaaa