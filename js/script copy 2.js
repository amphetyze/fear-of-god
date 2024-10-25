const burgerButton = document.querySelector('.burger');
const menu = document.querySelector('.support');

burgerButton.addEventListener('click', changeBurgerStatus);

function changeBurgerStatus() {
    burgerButton.classList.toggle('burger--active');
}

function changeMenuVisibility() {
    menu.classList.add('menu-mobile');
} const products = document.querySelectorAll('.product');

products.forEach(product => {
    const addToCartButton = product.querySelector('.add-to-cart');
    const sizeItems = product.querySelectorAll('.size__item');

    addToCartButton.addEventListener('click', () => {
        const selectedSize = product.querySelector('.size__item.size__item--selected');

        if (!selectedSize) {
            const sizeContainer = product.querySelector('.product__size');
            sizeContainer.classList.add('is-invalid');

            setTimeout(() => {
                sizeContainer.classList.remove('is-invalid');
            }, 300);
        } else {
            addToCart(product, selectedSize.textContent);
            checkCartForEmpty()
            selectedSize.classList.remove('size__item--selected');
            addToCartButton.innerHTML = `
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <use href="/img/sprites.svg#product-mark"></use>
            </svg>`;
            addToCartButton.setAttribute('disabled', 'disabled');

            setTimeout(() => {
                addToCartButton.innerHTML = `
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use href="/img/sprites.svg#product-plus"></use>
                </svg>`;
                addToCartButton.removeAttribute('disabled');
            }, 2000);
        }
    });

    sizeItems.forEach(sizeItem => {
        sizeItem.addEventListener('click', () => {
            sizeItems.forEach(item => {
                item.classList.remove('size__item--selected');
            });
            sizeItem.classList.add('size__item--selected');
        });
    });
});

function addToCart(product, selectedSize) {
    const productName = product.querySelector('.product__name').textContent;
    const productPrice = product.querySelector('.product__price').textContent;

    const cartItem = document.createElement('li');
    cartItem.className = 'cart__item item';

    const itemImage = product.querySelector('.product__image').cloneNode();
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
    itemSize.textContent = `Size: ${selectedSize}`;

    const itemFooter = document.createElement('div');
    itemFooter.className = 'item__footer';
    const footerButton = document.createElement('button');
    footerButton.className = 'item__button';
    footerButton.innerHTML = `
    <svg class="item__button-icon" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <use href="/img/sprites.svg#delete-icon"></use>
    </svg>`;

    itemHeader.appendChild(itemName);
    itemHeader.appendChild(itemPrice);
    itemInfo.appendChild(itemHeader);
    itemInfo.appendChild(itemBody);
    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemInfo);
    itemBody.appendChild(itemSize);
    itemInfo.appendChild(itemFooter);
    itemFooter.appendChild(footerButton);

    document.querySelector('.cart__list').appendChild(cartItem);
}

function checkCartForEmpty() {
    const cartList = document.querySelector('.cart__list');
    const cartItems = cartList.querySelectorAll('.cart__item');

    if (cartItems.length === 0) {
        const emptyCartText = document.createElement('span');
        emptyCartText.className = 'cart-empty';
        emptyCartText.textContent = 'В корзине пока пусто.';
        document.querySelector('.cart').appendChild(emptyCartText);
    } else {
        document.querySelector('.cart-empty').remove();
    }
}

checkCartForEmpty();