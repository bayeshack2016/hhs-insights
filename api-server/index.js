var fs = require("fs");
var _ = require('lodash');
var express = require('express');

var app = express();
var api = express.Router();

var elasticsearch = require('elasticsearch');
var esclient = new elasticsearch.Client({
	host: 'http://54.186.54.167:9200',
  	log: 'trace'
});

esclient.ping({
	requestTimeout: Infinity,
	// undocumented params are appended to the query string 
  	hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
    process.exit(1);
  } else {
    console.log('elasticsearch cluster is all OK');
  }
});

api.get('/', function (req, res, next) {
  	res.send('Hello bb-bayeshack!');
});

api.get('/providers-sample', function (req, res, next) {
	res.send(JSON.parse(fs.readFileSync('./providers_zip.json', 'utf8')));
});

// TBD /providers?state=XX&zip=XX&speciality=XX&facet=XX
api.get('/providers-by-zip', function (req, res, next) {
	var state      = req.param('state'),
		zip        = req.param('zip'),
		speciality = req.param('speciality'),
		facet      = req.param('facet');

	esclient.search({
	  index: 'npi-rows3',
	  body: {
	    "size": 0,
	    "aggs" : {
	        "group_by_field" : {
	            "terms" : {
	                "field" : "zip5",
	                "size" : 50000
	            }
	        }
	    }
	  }
	}).then(function (resp) {
		var results = {};
	    results.zip_codes = _.map(resp.aggregations.group_by_field.buckets, function(bucket) {
	    	return {'zip_code': bucket.key, 'num_providers': bucket.doc_count}
	    });
	    console.log("buckets.len", results.zip_codes.length);
	    results.max_num_providers = _.maxBy(results.zip_codes, 'num_providers')['num_providers'];
	    results.total_num_providers = _.sumBy(results.zip_codes, 'num_providers')['num_providers'];
	    res.send({result: results});
	}, function (err) {
	    console.trace(err.message);
	});
});

api.get('/providers-by-state', function (req, res, next) {
	esclient.search({
	  index: 'npi-rows3',
	  body: {
	    "size": 0,
	    "aggs" : {
	        "group_by_field" : {
	            "terms" : {
	                "field" : "state",
	                "size" : 100
	            }
	        }
	    }
	  }
	}).then(function (resp) {
		var results = {};
	    results.states = _.map(resp.aggregations.group_by_field.buckets, function(bucket) {
	    	return {'state': bucket.key, 'num_providers': bucket.doc_count}
	    });
	    console.log("buckets.len", results.states.length);
	    results.max_num_providers = _.maxBy(results.states, 'num_providers')['num_providers'];
	    results.total_num_providers = _.sumBy(results.states, 'num_providers')['num_providers'];
	    res.send({result: results});
	}, function (err) {
	    console.trace(err.message);
	});
});


app.use(api);

app.listen(3000, function () {
  console.log('bb-bayeshack app listening on port 3000!');
});