import {cards} from './data.js';

const body = document.getElementById('body');

const main = document.getElementById("main");

const dessert_container = document.getElementById("dessert-container");

const dessert_wrapper = document.createElement("div");
dessert_wrapper.classList.add('dessert-wrapper');

const heading = document.createElement('h1');
heading.innerText = "Desserts";

dessert_container.append(heading,dessert_wrapper)

const cart_container = document.getElementById("cart-container");

const cart_item_container = document.createElement('ul');
cart_item_container.classList.add('cart-item-container');

const confirmContainer = document.createElement('div');
confirmContainer.setAttribute('id','confirm-container');

let id = 0;

let isConfirmed = false;
const shade = document.createElement('div');


function renderCards(){
    
    cards.forEach((element) =>{

        element.quantity = 0;

        element.id = id;

        id++;

        const card_containerEl = document.createElement("div");
        card_containerEl.classList.add("card");
        
        element.domRef = card_containerEl;

        dessert_wrapper.append(card_containerEl);

        renderCard(element);
    });    

}

function renderCard(card){
    const container = card.domRef;
    container.innerHTML = "";

    const image_wrapperEl = document.createElement('div');
    image_wrapperEl.classList.add("image-wrapper");
    container.append(image_wrapperEl);

    const dessert_imageEl = document.createElement('img');
    dessert_imageEl.dataset.id = card.id;
    dessert_imageEl.setAttribute("src",card.image.desktop);
    dessert_imageEl.classList.add('dessert-image');
    image_wrapperEl.append(dessert_imageEl);

    const card_details = document.createElement('div');
    card_details.classList.add('card_details');
    card_details.innerHTML = `
      <p>${card.category}</p>
      <p>${card.name}</p>
      <p>$${card.price}</p>
    `;

    if(card.quantity === 0){
        const button =  document.createElement("button");
        button.dataset.id = card.id;
        button.classList.add(`btn-add`);
        button.innerHTML = `<img src = "assets/images/icon-add-to-cart.svg" class = "add-to-card"> add to cart`;
        image_wrapperEl.append(button);
    } 
    if( card.quantity > 0 ){
          
        const active_buttons_wrapperEl = document.createElement('div');
        active_buttons_wrapperEl.classList.add("active_buttons");
        image_wrapperEl.append(active_buttons_wrapperEl);

        const plus = document.createElement('img');
        plus.setAttribute("src", "assets/images/icon-increment-quantity.svg");
        plus.dataset.id = card.id;
        plus.classList.add('plus');
        active_buttons_wrapperEl.append(plus);

        const numberOfItems = document.createElement('span');
        numberOfItems.innerText = `${card.quantity}`;
        active_buttons_wrapperEl.append(numberOfItems);

        const minus = document.createElement('img');
        minus.setAttribute("src", "assets/images/icon-decrement-quantity.svg");  
        minus.dataset.id = card.id;
        minus.classList.add('minus');
        active_buttons_wrapperEl.append(minus); 
    } 
    container.append(card_details);
}

function updateQuantity(card, action = "add-item"){
       if(action === "add-item"){
            card.quantity++;
       } 
       if(action === "remove-item"){
            if(card.quantity > 0) card.quantity--;       
       }
       if(action === "delete-item"){
            card.quantity = 0; 
       } 
}

function renderCart(){

    const numberOfItems = document.createElement('h2');
    numberOfItems.innerText = `Your Cart(0)`;
    numberOfItems.classList.add("number-of-items");

    const empty_cart_img = document.createElement('img');
    empty_cart_img.setAttribute('src','./assets/images/illustration-empty-cart.svg');
    empty_cart_img.classList.add('empty_cart_img');

    const empty_cart_msg = document.createElement('p');
    empty_cart_msg.innerText = "Your added items will appear here";
    empty_cart_msg.classList.add("empty_cart_msg");

    const order_total = document.createElement('div');
    order_total.classList.add('order-total');
    order_total.innerHTML = `<p>Order Total</p> <span>$${Total().total}</span>`;

    const carbon_neutral = document.createElement('div');
    carbon_neutral.classList.add('carbon-neutral');
    carbon_neutral.innerHTML = `<img src = "./assets/images/icon-carbon-neutral.svg"> <p>This is a <strong>carbon neutral</strong> delivery</p>`;

    const confirm_order = document.createElement('button');
    confirm_order.classList.add('confirm_order_btn');
    confirm_order.addEventListener("click", ()=>{
        isConfirmed = true;
        if(isConfirmed === true){
            shade.classList.add('visible');
            body.append(shade);
            console.log("i was executed");
        } else{
            shade.remove();
        } 
        renderConfirm();
    });
    confirm_order.innerText = "Confirm Order";

    if(Total().totalQuantity === 0){ 
        cart_container.innerHTML = "";

        cart_container.append(numberOfItems,empty_cart_img,empty_cart_msg);
    } else {
        if(document.querySelector('.empty_cart_msg') || document.querySelector('.empty_cart_img')){
            document.querySelector('.empty_cart_msg').remove();
            document.querySelector('.empty_cart_img').remove();             
            cart_container.append(cart_item_container,order_total,carbon_neutral,confirm_order);        
        }
    }
    if(Total().totalQuantity > 0 ){
        document.querySelector('.number-of-items').innerText = `Your Cart(${Total().totalQuantity})`;
        document.querySelector('.order-total').innerHTML = `<p>Order Total</p> <span>$${Total().total}</span>`;
    }
}

function selectedItems(card){
    const list_item =  document.createElement('li');
    let delBtn = document.createElement('img');
    delBtn.setAttribute('src','./assets/images/icon-remove-item.svg');
    delBtn.dataset.id = card.id;
    delBtn.classList.add('delete')

    if(document.querySelector(`#cart_item${card.id}`)){

        document.querySelector(`#cart_item${card.id}`).innerHTML = `
                           <div id = "cart_item${card.id}" class = "list_item_info">
                              <h3>${card.name}</h3>
                              <span>${card.quantity}x</span>
                              <span>@${card.price}$</span>
                              <span>$${card.quantity * card.price}</span>
                           </div>`;                  
    } else {
        
        list_item.innerHTML = `<div id = "cart_item${card.id}" class = "list_item_info">
                                <h3>${card.name}</h3>
                                <span>${card.quantity}x</span>
                                <span>@${card.price}$</span>
                                <span>$${card.quantity * card.price}</span>
                            </div>`;
        list_item.append(delBtn);                    
        cart_item_container.append(list_item);
    }

    if(card.quantity === 0 && document.querySelector(`#cart_item${card.id}`)){
        const el = document.querySelector(`#cart_item${card.id}`);
        el.innerHTML = "";
        if(el) el.parentElement.remove();
        return;
    } 
    if(Total().total === 0 ){
       cart_item_container.innerHTML = ""; 
    }
     
}

function renderConfirm(){
    const confirm_header = document.createElement('div');
    confirm_header.innerHTML = `
                                <img src = "./assets/images/icon-order-confirmed.svg" />
                                <h2>Order Confirmation</h2>
                                <p>We hope you enjoy your food</p>
    `;
    confirmContainer.append(confirm_header);
    const confirmedList = document.createElement('ul');
    cards.forEach((item)=>{
         if(item.quantity > 0){
            const itemEl = document.createElement('li');
            itemEl.innerHTML = `
                               <div class = "confirm-item-image">
                                  <img src = "${item.image.thumbnail}" />
                                  <div class = "confirm-item-prop">
                                      <p>${item.name}</p>
                                      <div>
                                        <span>${item.quantity}x</span><span>@$${item.price}</span>
                                      </div>
                                  </div>
                               </div>
                               <div class = "confirm-item-total">
                                   $${item.quantity * item.price}
                               </div>
            `;
            confirmedList.append(itemEl);  
         }
    });
    const confirm_reset = document.createElement('button');
    confirm_reset.classList.add('confirm_reset');
    confirm_reset.innerText = "Start New Order";
    confirm_reset.addEventListener('click', ()=>{
       confirmContainer.innerHTML = "";
       confirmContainer.remove();
       isConfirmed = false;
        if(isConfirmed === true){
            shade.classList.add('visible');
            body.append(shade);
        } else{
            shade.remove();
        } 
       cards.forEach((item)=>{
          item.quantity = 0;
          selectedItems(item);
          renderCard(item); 
       });
        renderCart();
    });
    confirmContainer.append(confirm_header,confirmedList,confirm_reset);
    body.append(confirmContainer);
}


function Total(){
    let total = 0;
    let totalQuantity = 0;
    for(let i = 0; i< cards.length; i++){
       total = cards[i].price * cards[i].quantity + total;
       totalQuantity = cards[i].quantity + totalQuantity;
    }
    if(isNaN(totalQuantity))
        return {total , totalQuantity : 0 }
    return {total, totalQuantity};
}

document.addEventListener("click", (event) => {
    const target = event.target;
    const id = target.dataset.id;
    if (!id) return;

    const card = cards.find(c => c.id == id);
    //A cleaner version of writting this const card = cards[id];

    if (target.classList.contains("btn-add") || target.classList.contains("plus")) {
        updateQuantity(card, "add-item");
    }

    if (target.classList.contains("minus")) {
        updateQuantity(card, "remove-item");
    }
    if(target.classList.contains("delete")){
        updateQuantity(card, "delete-item");
    }
    renderCard(card);
    renderCart();
    selectedItems(card);
});

renderCart();
renderCards();

const images = document.querySelectorAll(".dessert-image");

function updateImages() {
  const isMobile = window.innerWidth <= 375;
  const isTablet = window.innerWidth > 375 && window.innerWidth <= 768; 
  console.log(isTablet, isMobile);
  images.forEach(img => {
    if (isMobile) {
      img.src = cards[img.dataset.id].image.mobile;
    }
    else if(isTablet){
      img.src = cards[img.dataset.id].image.tablet;  
    } else{
       img.src = cards[img.dataset.id].image.desktop; 
    }
  });
}

updateImages();

let timeout;

window.addEventListener("resize", () => {
  clearTimeout(timeout);
  timeout = setTimeout(updateImages, 150);
});