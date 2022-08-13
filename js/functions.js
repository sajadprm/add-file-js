const getSaveProducts = () => {
try{
    const jsonProducts = localStorage.getItem("products");

    return jsonProducts !== null ? JSON.parse(jsonProducts) : [];

}catch(error)
{
    return [];
}
}

const saveProduct = products => localStorage.setItem("products", JSON.stringify(products));

const removeProduct = (id) => {
    const findIndex = products.findIndex((item) => item.id === id);
    if (findIndex > -1) return products.splice(findIndex, 1);

}
const toogleExistProduct = id => product.exist = !product.exist;



const renderProduct = (list, filters) => {
    products = sortProduct(products, filters.sortBy);
    const filteredItem = list.filter(function (item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase());

    })
    const $root = document.querySelector("#products");
    $root.innerHTML = "";
    filteredItem.forEach(item => {

        createElementDom(item)
        $root.appendChild(createElementDom(item));



    });




}
const createElementDom = (product) => {
    const $product = document.createElement("div");
    const $checkBox = document.createElement("input");
    $checkBox.setAttribute("class","item");
    const $productTitle = document.createElement("a");
    $productTitle.setAttribute("class","item");
    const $removeBtn = document.createElement("button");
    $removeBtn.setAttribute("class","item");
    const $productPrice=document.createElement("p");
    $productPrice.setAttribute("class","item");
    $checkBox.setAttribute("type", "checkbox");
    $checkBox.checked = !product.exist;
    $product.appendChild($checkBox);
    $checkBox.addEventListener("change", function (e) {
        toogleExistProduct(product.id);
        saveProduct(products);
        renderArticles(products, searchItem);

    })
    $productTitle.textContent = product.title;
    $productTitle.setAttribute("href", `./edit-product.html#${product.id}`);
    $product.appendChild($productTitle);
    $productPrice.textContent=product.price;
    $product.appendChild($productPrice);
    $removeBtn.textContent = "Remove";
    $product.appendChild($removeBtn);
    $removeBtn.addEventListener("click", function (e) {
        removeProduct(product.id);
        saveProduct(products);
        renderProduct(products, filters);
    })
    return $product;
}


const isExistProduct = products => products.filter((item) => item.exist === true)


const updateMessage = timeStamp => `Last Edited : ${moment(timeStamp).locale("fa").fromNow()}`;


const sortProduct = (products, sortBy) => {
    if (sortBy === "byCreated") {
        return products.sort((a, b) => {
            if (a.created > b.created) {
                return -1;
            } else if (a.created < b.created) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "byEdited") {
        return products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1;
            } else if (a.updated < b.updated) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return products;
    }
}