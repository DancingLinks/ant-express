FROM python:2.7

MAINTAINER Qian Yu <348368689@qq.com>  

RUN mkdir -p /usr/scr/app
WORKDIR  /usr/scr/app

RUN pip install thrift
RUN pip install redis

COPY . /usr/scr/app

EXPOSE 9090
CMD ["python", "server.py"]
