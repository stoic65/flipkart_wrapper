# Flipkart API Wrapper

Use this wrapper to generate dynamic content from Flipkart

Inorder to earn from this you would need to create an affiliate account

https://affiliate.flipkart.com/ 

Else use the affiliate id 'contyxtin'

Example

```javascript

var flipkart_wrapper = require('./flipkart_wrapper');
var flipApi = flipkart_wrapper(YOUR_AFFILIATE_ID);


flipApi.getAllCategories({},function(err,resp){
	console.log(resp);
});

flipApi.getThisCategoryLink({category:"jewellery"},function(err,response){
	console.log(response);
});


````
