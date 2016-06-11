//Imported the request Module
var request = require('request');
var async = require('async')


function wrapperObject(affId)
{
	this.affId = affId;
}


function categoryProcessor(item,callback)
{
	var categoryObj = {
		name:item['apiName'],
		get:item['availableVariants']['v1.1.0']['get'],
		deltaGet:item['availableVariants']['v1.1.0']['deltaGet']
	};

	callback(null,categoryObj);

}






//Use this Function to get a list of all categories
//It returns a list of object having name,feed url and delta field url
//Delta field url is used to generate a list of small number of frequently changing items

wrapperObject.prototype.getAllCategories = function(opts,callback)
{
	reqOpts= {
		url : "https://affiliate-api.flipkart.net/affiliate/api/"+this.affId+".json",	
		method : "GET"
	}
	request(reqOpts,function(err,response,body){
		if(err)callback(err,null);
		else
		{
			async.map(JSON.parse(body)['apiGroups']['affiliate']['apiListings'],categoryProcessor,
				function(err,result){
					if(err)console.log(err);
					else console.log(result);
			});
		}

	});

}
wrapperObject.prototype.getThisCategoryLink = function(opts,callback)
{
	if(opts['category']==undefined)
	{
		callback(new Error("Category not provided"),null);
		return;
	}
	else var category = opts['category'];
	reqOpts= {
		url : "https://affiliate-api.flipkart.net/affiliate/api/"+this.affId+".json",	
		method : "GET"
	}
	request(reqOpts,function(err,response,body){
		if(err)callback(err,null);
		else
		{
			async.detect(JSON.parse(body)['apiGroups']['affiliate']['apiListings']
				,function(item,cb){
					if(item['apiName']==category)cb(null,true);
					else cb(null,false);
				},function(err,result){
					if(err)console.log(err);
					if(result==undefined)
					{
						callback(new Error("Category not matching"),null);
						return;
					}
					else 
					{
						callback(null,{	name:result['apiName'],
										get:result['availableVariants']['v1.1.0']['get'],
										deltaGet:result['availableVariants']['v1.1.0']['deltaGet']
									});
					}
			});
		}

	});
}


module.exports = function(affId)
{
	var obj = new wrapperObject(affId);
	return obj;
}

