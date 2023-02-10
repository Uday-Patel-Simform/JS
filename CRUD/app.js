// Getting the product list from local storage
let product_list = JSON.parse(localStorage.getItem('product_list')) || [];


// Single page routing
const routers = document.querySelectorAll('.nav-link');

routers.forEach(route => (route.addEventListener('click', (e) => {
    e.preventDefault();
    click_event = e || window.e;
    window.history.pushState({}, '', click_event.target.href);
    changeLocation();
})));

const routs = {
    "": "./component/home.html",
    "/": "./component/home.html",
    "#home": "./component/home.html",
    "#editproducts": "./component/form.html",
    "#addproduct": "./component/form.html"
}

const changeLocation = async () => {
    const path = window.location.hash;
    const route = routs[path];
    const html = await fetch(route).then((data) => data.text());
    // .then(text => document.querySelector('.app').innerHTML = text)
    document.querySelector('.function-container').innerHTML = html;
    if (path == '#home') {
        home_functions();
    } else if (path == '#addproduct' || path == '#editproducts') {
        products_toggle();
    }
}

window.addEventListener('popstate', changeLocation);
changeLocation();


// Updating the product list HTML on each change
function update_product_list(product_list) {
    let product_list_element = document.querySelector('.display-container');
    let product_listHTML = product_list.map(product => {
        return `

      <div class="product card d-flex justify-content-center align-items-center">
                                <div class="img_container">
                                <p class='product-image'>${product.image}</p>
                                </div>
                                <div class="card-body p-0">
                                    <div class="card-title"> ${product.productName}</div>
                                    <div class="card-id">Product Id: ${product.productId}</div>
                                    <div class="card-desc"> ${product.description}</div>
                                    <div class="card-price"> ${product.price + '/-'}</div>
                                    <div class="card-buttons">
                                    <a class="edit-button card-button" data-product-id="${product.productId}" href='#editproducts'>Edit</a>
                                    <button class="delete-button card-button" data-product-id="${product.productId}">Delete</button>
                                    </div>
                                    
                                </div>
                                </div>
    `;
    }).join('');
    product_list_element.innerHTML = product_listHTML;
}

// let delete_button = document.querySelectorAll('.delete-button');
// delete_button.forEach(button => {
//     button.addEventListener('click', (e) => {
//         let product_id = e.target.getAttribute('data-product-id');
//         delete_product(product_id);
//     });
// });

const home_functions = () => {
    // Delete a product from the product list
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            let productId = event.target.getAttribute('data-product-id');
            delete_product(productId);
        }
    });

    function delete_product(productId) {
        product_list.forEach(product => {
            if (product.productId === productId) {
                product_list.splice(product_list.indexOf(product), 1);
            }
        });
        localStorage.setItem('product_list', JSON.stringify(product_list));

        update_product_list(product_list);
    }


    // Filter/Search product by ID
    let filter = document.querySelector('.filter');
    filter.addEventListener('input', (e) => {
        e.preventDefault();
        if (e.target.value !== '') {
            let filtered_product = product_list.filter(product => product.productId === e.target.value);
            update_product_list(filtered_product);
        } else {
            update_product_list(product_list);
        }
    })

    // Sorting Product based on various criteria
    const sort_numbers = (a, b) => {
        return a - b;
    }
    const sort_products = (sortby) => {
        let sorted_product_list = product_list.sort((a, b) => {
            let sort_btn = document.querySelector('.sort-btn');
            if (sortby == 'Product Name') {
                sort_btn.textContent = sortby;
                return a.productName.localeCompare(b.productName);
            } else if (sortby == 'Product ID') {
                sort_btn.textContent = sortby;
                return sort_numbers(a.productId, b.productId);
            }
            else if (sortby == 'Price(L-H)') {
                sort_btn.textContent = sortby;
                return sort_numbers(a.price, b.price);
            }
            else if (sortby == 'Price(H-L)') {
                sort_btn.textContent = sortby;
                return sort_numbers(b.price, a.price);
            }
        });
        update_product_list(sorted_product_list);
    }
    let sort = document.querySelectorAll('.dropdown-item');
    sort.forEach(item => item.addEventListener('click', (e) => {
        sort_products(e.target.textContent);
    }));
    update_product_list(product_list);

    document.querySelectorAll('.edit-button').forEach(button => button.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            let productId = event.target.getAttribute('data-product-id');
            localStorage.setItem('edit_product_id', JSON.stringify(productId));
        }
    }))
}


// Handle form submit
const products_toggle = () => {
    let pid = document.querySelector('#productId');
    let pname = document.querySelector('#productName');
    let pimg = document.querySelector('#image');
    let pprice = document.querySelector('#price');
    let pdesc = document.querySelector('#description');
    let f_button = document.querySelector('.form-button');
    let form_data = document.querySelector('.productForm');

    // Edit a specific product from the array
    let id = JSON.parse(localStorage.getItem('edit_product_id'));
    // displaying specific product to edit
    const display_edit_product = (id) => {
        let product_list = JSON.parse(localStorage.getItem('product_list')) || [];
        let selected_product = product_list.find(product => product.productId === id);
        pid.value = selected_product.productId;
        pid.disabled=true;
        pname.value = selected_product.productName;
        pimg.value = selected_product.image;
        pprice.value = selected_product.price;
        pdesc.value = selected_product.description;
    }
    // update product in locale storage
    const edit_product = (productId, product) => {
        let product_index = product_list.findIndex(p => p.productId === productId);
        product_list[product_index] = product;
        localStorage.setItem('product_list', JSON.stringify(product_list));
    }

    // Add a product to the product list
    function add_product(product) {
        product_list.map(p => {
            if (p.productId === product.productId) {
                alert('Product Id should be unique')
            }
            else {
                product_list.push(product);
                localStorage.setItem('product_list', JSON.stringify(product_list));
                // form data reset on successful form submission
                form_data.reset();
                click_event = e || window.e;
                window.history.pushState({}, '', click_event.target.href);
                changeLocation();
            }
        })
    }
    // deciding button text based on page title
    if (window.location.hash == '#addproduct') {
        f_button.textContent = 'ADD Product';
    } else {
        display_edit_product(id);
        f_button.textContent = 'Save';
    }

    // handling form submit
    f_button.addEventListener('click', (e) => {
        e.preventDefault();
        let productId = pid.value;
        let productName = pname.value;
        let image = pimg.value;
        let price = pprice.value;
        let description = pdesc.value;

        // creating product
        let product = {
            productId: productId,
            productName: productName,
            image: image,
            price: price,
            description: description
        };
        // checking for empty fields
        if (!productId || !productName || !image || !price || !description) {
            alert("All fields are required");
            return;
        }
        // deciding which functionality to apply
        if (f_button.textContent == 'ADD Product') {
            add_product(product);
        } else if (f_button.textContent == 'Save') {
            edit_product(productId, product);
            // form data reset on successful form submission
            form_data.reset();
            click_event = e || window.e;
            window.history.pushState({}, '', click_event.target.href);
            changeLocation();
        }
    });
}