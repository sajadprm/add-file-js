const $titleElement=document.querySelector("#title-product");
const $priceElement=document.querySelector("#price-product");
const $removeElement=document.querySelector("#remove-product");
const $lastEditElement=document.querySelector("#last-edit-product");

let products=getSaveProducts();
const productId=location.hash.substring(1);

let product=products.find((item)=>{
   return item.id===productId;
});

if(!product)
{
    location.assign("./index.html");
}



$titleElement.value=product.title;
$priceElement.value=product.price;
product.updated=moment().valueOf();

$lastEditElement.textContent=updateMessage(product.updated);



$titleElement.addEventListener("input",(e)=>{
  product.title=e.target.value;

    saveProduct(products);
    product.updated=moment().valueOf();
    $lastEditElement.textContent=updateMessage(product.updated);
    
})

$priceElement.addEventListener("input",(e)=>{
    product.price=e.target.value;
  
      saveProduct(products);
      product.updated=moment().valueOf();
      $lastEditElement.textContent=updateMessage(product.updated);
  });

$removeElement.addEventListener("click",(e)=>{
    removeProduct(productId);
    saveProduct(products);
    location.assign("./index.html");
})



window.addEventListener("storage",(e)=>{
    if(e.key==='products')
    {
       products=JSON.parse(e.newValue);
       product=products.find((item)=>{
        return item.id===productId;
     });

    }
    if(!product)
     {
    location.assign("./index.html");
     }
     $titleElement.value=product.title;
     $priceElement.value=product.price;
     product.updated=moment().valueOf();
     $lastEditElement.textContent=updateMessage(product.updated);


})