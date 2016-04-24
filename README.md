# hhs-insights
 TBD


## Directory structure
```shell
- jupyter/
   - A collecition of ipynb notebooks to render interesting visualizations
- api-server/
   - NodeJS API server that provides a simple API that Jupyter notebooks call into.
- data-loader/
   - scripts to parse and normalize CSV data and store to elasticsearch.
 
 ```

## Architecture
 `Notebooks` ==> `API server(AWS)` ==> `ElasticSearch(AWS)` 
 
### API Server
 - Endpoints
  - GET /providers-by-state?speciality=<string>
    - returns an aggregated report of providers grouped by states.
    - can optionally be filtered by speciality, eg `speciality=Diabetes`
  - GET /providers-by-zip
    - returns an aggregated report of providers grouped by Zip codes.
