#coding=utf-8

import socket
import sys
sys.path.append('./gen') 
from gen import Route 
from gen.ttypes import *
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
import json
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

class RouteHandler:

	def plan(self, sender_id, receiver_id):

		people_json = r.get('people_data')
		people_data = json.loads(people_json)

		count = 288

		path = []

		if people_data[sender_id][receiver_id] > 0:
			path.append(sender_id)
			path.append(receiver_id)
			people_data[sender_id][receiver_id] -= 1
			r.set('people_data', people_data)
			return path

		max_people = 0
		sum_people = 0
		max_i = -1
		for i in range(0, count):
			people = min(people_data[sender_id][i], people_data[i][receiver_id])
			total = people_data[sender_id][i] + people_data[i][receiver_id]
			if people > max_people or (people == max_people and total > sum_people):
				max_people = people
				sum_people = total
				max_i = i

		if max_people > 0 and max_i >= 0:
			path.append(sender_id)
			path.append(max_i)
			path.append(receiver_id)
			people_data[sender_id][max_i] -= 1
			people_data[max_i][receiver_id] -= 1
			r.set('people_data', people_data)
			return path
		
		return path


handler = RouteHandler()
processor = Route.Processor(handler)

transport = TSocket.TServerSocket("localhost", 9090)

tfactory = TTransport.TBufferedTransportFactory()

pfactory = TBinaryProtocol.TBinaryProtocolFactory()

server = TServer.TSimpleServer(processor, transport, tfactory, pfactory) 
print "Starting Parcel thrift server in python..."
server.serve()
print "done!"