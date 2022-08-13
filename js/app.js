const $sortElement=document.querySelector("#sort");
let products = getSaveProducts();

const filters={
    searchItem:"",
    sortBy:"byCreated"

}





const form = document.querySelector("#add-product-form");
form.addEventListener("submit",  (e)=> {
     e.preventDefault();
    const id=uuidv4();
    const timeStamp=moment().valueOf();

    products.push({
        id:id,
        title: e.target.elements.titleProduct.value,
        price:e.target.elements.priceProduct.value,
         created:timeStamp,
         updated:timeStamp,
        exist:true
    });
    saveProduct(products);
    e.target.elements.titleProduct.value = "";
    e.target.elements.priceProduct.value = "";
    renderProduct(products,filters);

})




renderProduct(products,filters);



document.querySelector("#search").addEventListener("input",  (e) => {
    filters.searchItem = e.target.value;

    renderProduct(products,filters);
})

document.getElementById("existProduct").addEventListener("change",  (e)=> {
    let filteredItems = [];
    let filtered = false;
    if (e.target.checked === true) {
        filtered = true;

        filteredItems = isExistProduct(products);
    }
    if (filtered) return renderProduct(products,filters);

    renderProduct(products,filters);;


})

window.addEventListener("storage",(e)=>{
    if(e.key==="products")
    {
        products=JSON.parse(e.newValue);
        renderProduct(products,filters);

    }
})

$sortElement.addEventListener("change",(e)=>{
  filters.sortBy=e.target.value;
  renderProduct(products,filters);  
})