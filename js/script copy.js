const burgerButton = document.querySelector('.burger');
const menu = document.querySelector('.support');

burgerButton.addEventListener('click', changeBurgerStatus);

function changeBurgerStatus() {
    burgerButton.classList.toggle('burger--active');
}

function changeMenuVisibility() {
    menu.classList.add('menu-mobile');
}

const product = document.querySelectorAll('.product');
const productSize = document.querySelectorAll('.product__size');

product.forEach(item => {
    const addToCartButton = item.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
        const productSizes = item.querySelectorAll('.product__size .item__size--selected');
        if (productSizes.length === 0) {
            item.querySelector('.product__size').classList.add('is-invalid');

            setTimeout(() => {
                item.querySelector('.product__size').classList.remove('is-invalid');
            }, 300);
        } else {
            addToCart(item);
        }
    });

    const sizeButton = item.querySelectorAll('.size__item');
    sizeButton.forEach(size => {
        size.addEventListener('click', () => {
            selectSize(size);
        });
    });
});


function selectSize(item) {
    const sizeItems = item.querySelectorAll('.size__item');

    sizeItems.forEach(sizeItem => {
        sizeItem.addEventListener('click', () => {
            sizeItems.forEach(item => item.classList.remove('item__size--selected'));

            sizeItem.classList.add('item__size--selected');
        });
    });
}

function addToCart(item) {
    const productName = item.querySelector('.product__name').textContent;
    const productPrice = item.querySelector('.product__price').textContent;
    const productSize = item.querySelector('.size-item.size-item--selected').textContent;

    // Create new cart item
    const cartItem = document.createElement('li');
    cartItem.className = 'cart__item item';

    const itemImage = item.querySelector('.product__image').cloneNode();
    itemImage.className = 'item__image';

    const itemInfo = document.createElement('div');
    itemInfo.className = 'item__info';

    const itemHeader = document.createElement('div');
    itemHeader.className = 'item__header';

    const itemName = document.createElement('span');
    itemName.className = 'item__name';
    itemName.textContent = productName;

    const itemPrice = document.createElement('span');
    itemPrice.className = 'item__price';
    itemPrice.textContent = productPrice;

    const itemBody = document.createElement('div');
    itemBody.className = 'item__body';

    const itemSize = document.createElement('span');
    itemSize.className = 'item__property';
    itemSize.textContent = productSize;

    // Append elements
    itemHeader.appendChild(itemName);
    itemHeader.appendChild(itemPrice);
    itemInfo.appendChild(itemHeader);
    itemInfo.appendChild(itemBody);
    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemInfo);
    itemBody.appendChild(itemSize);

    document.querySelector('.cart__list').appendChild(cartItem);
}