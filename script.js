import {cards} from './data.js'

const main = document.getElementById("main");

const dessert_container = document.getElementById("dessert-container");

const cart_container = document.getElementById("cart-container");

function renderCards(){
    
    cards.forEach((element) =>{

        element.quantity = 0;

        const card_containerEl = document.createElement("div");
        card_containerEl.classList.add("card");
        
        element.domRef = card_containerEl;

        dessert_container.append(card_containerEl);

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
    dessert_imageEl.setAttribute("src",card.image.desktop);
    dessert_imageEl.classList.add('dessert-image');
    image_wrapperEl.append(dessert_imageEl);

    // quantity logic
    if(card.quantity === 0){
        const button =  document.createElement("button");
        button.innerHTML = `<img src = "assets/images/icon-add-to-cart.svg" class = "add-to-card"> add to cart`;
        image_wrapperEl.append(button);
       // put adding logic here
       button.addEventListener('click', ()=>{
          card.quantity += 1;
          updateCart(card.name, card.price, card.quantity);
          renderCard(card);
        });
    } 
    if( card.quantity > 0 ){
          
        const active_buttons_wrapperEl = document.createElement('div');
        active_buttons_wrapperEl.classList.add("active_buttons");
        image_wrapperEl.append(active_buttons_wrapperEl);

        const plus = document.createElement('img');
        plus.setAttribute("src", "assets/images/icon-increment-quantity.svg");
        plus.classList.add('plus');
        active_buttons_wrapperEl.append(plus);
        plus.addEventListener("click",()=>{
            card.quantity += 1;
            updateCart(card.name, card.price, card.quantity);
            renderCard(card);
        });

        const numberOfItems = document.createElement('span');
        numberOfItems.innerText = `${card.quantity}`;
        active_buttons_wrapperEl.append(numberOfItems);

        const minus = document.createElement('img');
        minus.setAttribute("src", "assets/images/icon-decrement-quantity.svg");  
        minus.classList.add('minus');
        active_buttons_wrapperEl.append(minus);
        minus.addEventListener('click',()=>{
            card.quantity -= 1;
            updateCart(card.name, card.price, card.quantity);
            renderCard(card);
        });      
    }

    const description_wrapper = document.createElement('div');
    description_wrapper.classList.add('description-wrapper');
    container.append(description_wrapper);

    const name = document.createElement('p');
    name.classList.add('name');
    name.innerText = card.name;
    description_wrapper.append(name);
  
    const category = document.createElement('p');
    category.classList.add('category');
    category.innerText = card.category;
    description_wrapper.append(category); 
 
    const price = document.createElement('p');
    price.classList.add('price');
    price.innerText = card.price + '$';
    description_wrapper.append(price);    
}

    const orderTotal = document.createElement('div');
    orderTotal.innerHTML = `<p>Order Total</p>   <span>$${showTotal().totalPrice}</span>`;

    const carbon_neutral = document.createElement('div');
    carbon_neutral.innerHTML = `<img src = "./assets/images/icon-carbon-neutral.svg" /> <p> This delivry is carbon neutral<p/>`

    const confirmOrder = document.createElement('button');
    confirmOrder.setAttribute("id","confirm order");
    confirmOrder.innerText = "Confirm Order";
    confirmOrder.addEventListener("click",()=>{
         displayConfirmation();
    });    


function updateCart(name, price, quantity){
   const numberOfElements = document.getElementById("number-of-items");
   numberOfElements.innerHTML = `Your Cart (${showTotal().total})`;

   const cart_state= document.getElementById("cart-state");

   const emptyCart = document.createElement("div");
   emptyCart.innerHTML = `<div id="empty-cart">
                            <img src="assets/images/illustration-empty-cart.svg">
                            <div>Your added Items will appear here</div>
                            `;
   if(showTotal().total === 0){
    cart_state.innerHTML = "";
    cart_state.append(emptyCart); 
   } 

   if(quantity === 0 && cart_state.querySelector(`#${name.replace(/\s+/g, "")}`) !== null){
        cart_state.querySelector(`#${name.replace(/\s+/g, "")}`).remove();
        orderTotal.innerHTML = `<p>Order Total</p>   <span>$${showTotal().totalPrice}</span>`;
   }
        

   if(quantity > 0){
    if(document.querySelector("#empty-cart"))
        document.querySelector("#empty-cart").remove();
    if(cart_state.querySelector(`#${name.replace(/\s+/g, "")}`)){
        cart_state.querySelector(`#${name.replace(/\s+/g, "")}`).innerHTML = `<div>${name}</div>
                        <div> 
                        <div><span>x ${quantity}</span> <span>@$${price}</span> <span>$${quantity * price}</span></div> 
                     </div>`;
        const removeItem = document.createElement('img');
        removeItem.setAttribute("src","./assets/images/icon-remove-item.svg");
        cart_state.querySelector(`#${name.replace(/\s+/g, "")}`).append(removeItem);    
        orderTotal.innerHTML = `<p>Order Total</p>   <span>$${showTotal().totalPrice}</span>`;        
        return;             
      };
      const itemElement = document.createElement('li');
      itemElement.setAttribute("id",`${name.replace(/\s+/g, "")}`);
      itemElement.style.background = "green";
      cart_state.append(itemElement);

      itemElement.innerHTML = `<div>${name}</div>
                               <div> 
                                    <div><span>x ${quantity}</span> <span>@$${price}</span> <span>$${quantity * price}</span></div> 
                                </div>`;

      const removeItem = document.createElement('img');
      removeItem.setAttribute("src","./assets/images/icon-remove-item.svg");
      itemElement.append(removeItem);
      removeItem.addEventListener("click", ()=>{
        removeItem.parentElement.remove();
        quantity = 0;
      }); 
      orderTotal.innerHTML = `<p>Order Total</p>   <span>$${showTotal().totalPrice}</span>`;
      cart_container.append(orderTotal, carbon_neutral, confirmOrder);
   }
} 

function displayConfirmation(){
     const modalContainer = document.createElement('div');
     modalContainer.style.position = 'fixed';
     modalContainer.style.backgroundColor = 'red';
     modalContainer.style.zIndex = 100;
     modalContainer.style.top = 0;
     const confirmHearder = document.createElement('div');
     confirmHearder.innerHTML = `<img src = './assets/images/icon-order-confirmed.svg'>
                                <h2>Order confirm</h2>
                                <h4>We hope you enjoy your Food</h4>`;
     modalContainer.append(confirmHearder);   
     const ItemsContainer = document.createElement('div');
     let selectedItems = cards.filter((element)=> element.quantity > 0);
     selectedItems.forEach((item) =>{
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `<img src = ${item.image.thumbnail} /> 
                                 <div>
                                    <h2>${item.name}</h2>
                                    <div><span>${item.quantity}x</span> <span>@$${item.price}</span></div>
                                 </div>
                                 <div>
                                   ${item.price * item.quantity}
                                 </div>`;
        ItemsContainer.append(itemElement);                         
     });     
     modalContainer.append(ItemsContainer); 
     let totalEl = document.createElement('div');
     totalEl.innerHTML = `<span>Order Total</span> <span>${showTotal().totalPrice}</span>`;
     let confirmButton = document.createElement('button');
     confirmButton.innerText = 'Start New order';
     confirmButton.addEventListener("click",function (){
         cards.forEach((e)=>{
            e.quantity = 0;
            updateCart(e.name, e.price, e.quantity);
         });
         cart_container.remove(orderTotal, carbon_neutral, confirmOrder);
         dessert_container.innerHTML = "";
         renderCards();
     });
     modalContainer.append(totalEl, confirmButton);
     main.append(modalContainer);                    
}

function showTotal(){
    let totalPrice = 0;
    let total = 0;
    for ( let element of cards){
        totalPrice = element.price * element.quantity + totalPrice;
        total += element.quantity;
    }
    if(isNaN(total)){
    total = 0
    totalPrice = 0;
    }
    return {totalPrice, total};
}

updateCart();

renderCards();