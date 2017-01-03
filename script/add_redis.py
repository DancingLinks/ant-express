#coding=utf-8

import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0)

people_data_json_file = open('/home/price/ant/script/people.json')
people_data_json = people_data_json_file.read()
people_data_json_file.close()

r.set('people_data', people_data_json)
