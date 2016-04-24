# hhs-insights
 TBD


## Architecture
 `Notebooks` ==> `API server(AWS)` ==> `ElasticSearch(AWS)` 


## Directory structure
```shell
- jupyter/
   - A collecition of ipynb notebooks to render interesting visualizations
- api-server/
   - NodeJS API server that provides a simple API that Jupyter notebooks call into.
- data-loader/
   - scripts to parse and normalize CSV data and store to elasticsearch.
 
 ```

 
### API Server
 - Endpoints
  - GET /providers-by-state?speciality=<string>
    - returns an aggregated report of providers grouped by states.
    - can optionally be filtered by speciality, eg `speciality=Diabetes`
  - GET /providers-by-zip
    - returns an aggregated report of providers grouped by Zip codes.


### Interesting Notebooks
 - Fraud occurences
   - Plot a heatmap based on number of provider deactivations due to fraud.
 - Provider distribution by state
   - Plot a heatmap based on raw counts of providers across states.
 - Provider distribution by zip
   - Plot a heatmap based on raw counts of providers across zip code boundaries.

### Datasets
 - NPPES provider data from cms.gov. [URL](https://www.cms.gov/Regulations-and-Guidance/HIPAA-Administrative-Simplification/NationalProvIdentStand/DataDissemination.html)
 - ~4.8 million providers data.
