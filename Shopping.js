var pname = document.querySelector(".pname");
// console.log(pname);

var pcatagory = document.querySelector(".pcatagory");
// console.log(pcatagory)

var pprice = document.querySelector(".pprice");
// console.log(pprice)

var pquantity = document.querySelector(".pquantity");
// console.log(pquantity)

var psubmit = document.querySelector(".psubmit");
// console.log(psubmit)

var item_list = document.querySelector(".item_list");
// console.log(item_list)


//automatic get data
async function AutomaticReload() {
    try {
        var load = await axios.get("https://crudcrud.com/api/f44f034b4d394f5aaad9e41c57754ab6/products");
        load.data?.forEach(element => {
            var li = document.createElement("li");
            li.className = "items";
            li.style.fontSize = "30px";
            var total_price = element.ProductPrice * element.ProductQuantity;
            li.append(`${element.ProductName} ${element.ProductCatogory} ${element.ProductPrice} ${element.ProductQuantity} ${total_price} `)

            //purchase item 
            var purchased = document.createElement("button");
            purchased.className = "purchased";
            purchased.textContent = "Purchased";
            purchased.style.backgroundColor = "blue"
            //remove item
            var del = document.createElement("button");
            del.className = "delete";
            del.textContent = "Delete";
            del.style.backgroundColor = "red"
            li.append(purchased)
            li.append(del)
            li.append(` ${element._id}`)
            item_list.appendChild(li)
        });
    } catch (error) {
        console.log(error)
    }
}

AutomaticReload()
//on button click 
psubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (pname == "" || pcatagory.value == "Product Catagory" || pprice.value <= 0 || pquantity <= 0) {
        alert("Enter all the Input Feilds ..")
        pname.value = "";
        pcatagory.value = "Product Catagory";
        pprice.value = "";
        pquantity.value = "";

    } else {
        async function addedItem() {
            try {
                await axios.post("https://crudcrud.com/api/f44f034b4d394f5aaad9e41c57754ab6/products", {
                    "ProductName": `${pname.value}`,
                    "ProductCatogory": `${pcatagory.value}`,
                    "ProductPrice": `${pprice.value}`,
                    "ProductQuantity": `${pquantity.value}`
                })
                console.log("Upload Sucess")
                location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        addedItem()

    }
})

//on purchse button click 
item_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("purchased")) {
        var li = e.target.parentElement;
        li_text = li.innerText.split(" ");
        console.log(li_text);
        var new_quantity = li_text[3] - 1;

        async function updateAPi(li_text) {
            try {
                await axios.put(`https://crudcrud.com/api/f44f034b4d394f5aaad9e41c57754ab6/products/${li_text[6]}`, {
                    "ProductName": li_text[0],
                    "ProductCatogory": li_text[1],
                    "ProductPrice": li_text[2],
                    "ProductQuantity": new_quantity
                })
                console.log("Data Updated");
                location.reload()
            } catch (error) {
                console.log(error)
            }
        }
        updateAPi(li_text);
    }
})

//delete button 
item_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        var li = e.target.parentElement;
        li_text = li.innerText.split(" ");
        async function del_data(){
            await axios.delete(`https://crudcrud.com/api/f44f034b4d394f5aaad9e41c57754ab6/products/${li_text[6]}`)
            console.log("Item Deleted");
            location.reload()
        }
        del_data()
    }
})