# coding: utf-8
import requests
from bs4 import BeautifulSoup
import re
import json
import boto3
from decimal import Decimal

base_url = 'https://p-town.dmm.com'
result_list = {'machines': []}
dynamo = boto3.resource('dynamodb')
master_table = dynamo.Table('pictoria-master')

with master_table.batch_writer() as bw:
    for i in range(1, 2):
        print(f'page {i}')
        url = f'{base_url}/machines/search?machine_type=0&sort=pv_desc&page={i}'
        r = requests.get(url)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup.find_all('p'))
        a_link_tags = soup.find_all('a', class_='link')
        for a_link_tag in a_link_tags:
            # a_link_tag = a_link_tags[-1]
            loc = a_link_tag.get('href')
            title = a_link_tag.find('p', class_='title')
            if title and a_link_tag.find('div', class_='contents'):
                print('------------------------------')
                print(loc)
                print(title.text)
                name = f'{title.text}'
                detail_r = requests.get(f'{base_url}{loc}')
                detail_soup = BeautifulSoup(detail_r.content, "html.parser")
                for b in detail_soup.find_all(text=re.compile('.*4\.0円（25個）…[0-9\.]*回転')):
                    border = re.search(r'…([0-9\.]+)回転', b).group(1)
                    bw.put_item(Item={
                        'type': 'machines',
                        'name': name,
                        'border': Decimal(border)
                    })
                    # result_list['machines'].append({
                    #     'title': name,
                    #     'border': float(border)
                    # })

# print(result_list)
# with open('./machine_info.json', 'w', encoding='utf-8') as f:
#     json.dump(result_list, f, ensure_ascii=False, indent=2)
print('Finished')
