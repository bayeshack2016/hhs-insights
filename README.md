# hhs-insights

**Vision**: Our goverment has wealth of data available on HHS. Our vision is to utilize the available information and make meaningful analysis out of it. For example: By joining the the data sets of doctors and provider information we can get more insight on why a particular area has more frauds. As more efforts are being made to standarize data like doctor ratings we can further leverage and allow people to make a more informed decision about insurance providers.

**Goal**: Our goal is to allow government to make use of the available data to solve problems on resource management, budgeting and better planning. For example: This can help in population lifestyle equitability, human migration, urban planning and even more.

**Problem**: Determine availability of providers and quality of doctors. We solve this by combining the datasets and querying for "NPI Deactivation Reason Code" and number of providers through elastic search.




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
