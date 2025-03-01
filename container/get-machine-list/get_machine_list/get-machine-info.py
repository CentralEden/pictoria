# coding: utf-8
import requests
from bs4 import BeautifulSoup
import re
import json
import boto3
from decimal import Decimal

base_url = 'https://p-town.dmm.com'
result_list = []
dynamo = boto3.resource('dynamodb')
master_table = dynamo.Table('pictoria-master')

with master_table.batch_writer() as bw:
    for i in range(1, 10):
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
                # 重複排除
                if name in result_list:
                    continue
                info_url = f'{base_url}{loc}'
                print(info_url)

                try:
                    detail_r = requests.get(info_url)
                except requests.exceptions.ChunkedEncodingError:
                    detail_r = requests.get(info_url)
                except Exception as e:
                    print(e)
                    continue
                
                detail_soup = BeautifulSoup(detail_r.content, "html.parser")
                # ボーダー
                for b in detail_soup.find_all(text=re.compile('.*4\.0円（25個）…[0-9\.]*回転')):
                    border = re.search(r'…([0-9\.]+)回転', b).group(1)
                # 導入日
                rollout_date_raw = detail_soup.find(text='導入開始日').parent.parent.find('td').text
                rollout_date = re.search(r'\d\d\d\d年\d\d月\d\d日', rollout_date_raw)
                if rollout_date:
                    rollout_date = rollout_date.group().replace('年', '/').replace('月', '/').replace('日', '')
                else:
                    print('導入日取得失敗')
                    continue
                print(rollout_date)

                # DB書き込み
                bw.put_item(Item={
                    'type': 'machines',
                    'name': name,
                    'border': Decimal(border),
                    'info_url': info_url,
                    'rollout_date': rollout_date
                })
                result_list.append(name)

# print(result_list)
# with open('./machine_info.json', 'w', encoding='utf-8') as f:
#     json.dump(result_list, f, aws acm list-certificates, indent=2)
print('Finished')
