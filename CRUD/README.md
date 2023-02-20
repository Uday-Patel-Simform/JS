# CRUD-app

Created a Product Management system where product contains following attributes.<br/>
ProductId<br/>
ProductName<br/>
Image<br/>
Price<br/>
Description<br/>

This application allow user to create new product, update existing product and user is able to filter product by product id and able to sort it by productId, Product Name and Price.Used localStorage for storing product.<br/>

index.html file contains navigation bar and an app component which is updated as the URL changes, all the HEML inside app component is loaded dynamically based on URL.<br/>

component folder contains home and form component's html, form is dynamically configured to eork as add product or edit product form.<br/>

app.js file holds al the logic for functions like:<br/>
rendering pages dynamically,<br/>
Adding ptoduct to the local storage(Create),<br/>
Displayig products on home page (Read),<br/>
Updating product in local storage (Update),<br/>
Deleting products from the local storage (Delet)<br/>

style.css has CSS for styling and mobile frendly behaviour.<br/>

## Live Demo
https://uday-patel-simform.github.io/CRUD-app/