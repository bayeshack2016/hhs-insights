## for ec2

from elasticsearch import Elasticsearch
import requests
import json
import csv
import sys

column_mappings = {
    'Provider Business Practice Location Address Postal Code': 'zip9',
    'Provider Business Practice Location Address City Name': 'city',
    'Provider Business Practice Location Address State Name': 'state',
    'Provider Business Practice Location Address Telephone Number': 'phone',
    'Provider First Name': 'first_name',
    'Provider Last Name (Legal Name)': 'last_name',
    'Provider Gender Code': 'gender',
    'Provider License Number_1': 'license_number',
    'Provider License Number State Code_1': 'license_state',
    'NPI': 'npi',
    'Last Update Date': 'last_update_date',
    'Is Sole Proprietor': 'sole_proprietor',
    'Healthcare Provider Primary Taxonomy Switch_1': 'taxonomy_switch',
    "Entity Type Code": 'entity_type_code',
    "NPI Deactivation Reason Code": 'npi_deactivation_reason_code',
    "NPI Deactivation Date": 'npi_deactivation_date',
    'Provider Organization Name (Legal Business Name)': 'organization_name'
}


def get_code_mappings():
    reader = csv.DictReader(open("tax_code_names.csv"))
    return dict([ (row['code'].strip(), row['name'].strip()) for row in reader ])

code_mappings = get_code_mappings()

def fix_row(row):
    mapped_row = dict([(c2, row[c1]) for c1,c2 in column_mappings.items()])
    codes = []
    for i in range(1,15):
        c = 'Healthcare Provider Taxonomy Code_%s' % str(i)
        v = row[c].strip()
        if v:
            codes.append(v)
    codes = list(set(codes))
    names = [code_mappings.get(code) for code in codes if code_mappings.get(code)]
    mapped_row['taxonomy_codes'] = codes
    mapped_row['taxonomy_names'] = names
    mapped_row['zip5'] = mapped_row['zip9'][:5]
    return mapped_row

def main(infile):
    es = Elasticsearch()
    npiReader = csv.DictReader(open(infile))
    for row in npiReader:
        result_row = fix_row(row)
        es.index(index="npi-rows3", doc_type="provider", body=result_row, id=result_row['npi'])

if __name__=="__main__":
    
    main(sys.argv[1])
    
