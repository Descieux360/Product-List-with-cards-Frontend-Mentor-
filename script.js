import {cards} from './data.js'

const dessert_container = document.getElementById("dessert-container");

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
    image_wrapperEl.append(dessert_imageEl);

    // quantity logic
    if(card.quantity === 0){
        const button =  document.createElement("button");
        button.innerHTML = `<img src = "assets/images/icon-add-to-cart.svg"> add to cart`;
        image_wrapperEl.append(button);
       // put adding logic here

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
    price.innerText = card.price;
    description_wrapper.append(price);    
}

renderCards();