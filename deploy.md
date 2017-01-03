# 蚂蚁相传部署文档

## 环境要求

- 操作系统: CentOS 7+ / Ubuntu 16.04+ / 其他支持Docker 1.12+的Linux发型版
- Nginx 1.10+
- Docker 1.12+
- MongoDB 3.2+
- Redis 3.2+

## 配置环境

### 安装Nginx(以CentOS为例)

```
$ sudo yum install epel-release
$ sudo yum install nginx
```

### 安装Docker(以CentOS为例)

```
$ sudo tee /etc/yum.repos.d/docker.repo <<-'EOF'
  [dockerrepo]
  name=Docker Repository
  baseurl=https://yum.dockerproject.org/repo/main/centos/7/
  enabled=1
  gpgcheck=1
  gpgkey=https://yum.dockerproject.org/gpg
  EOF
$ sudo yum install docker
$ sudo systemctl enable docker.service
$ sudo systemctl start docker
```

### 安装MongoDB、Redis

生产环境(Linux):

```
$ sudo docker run -d -v /var/lib/mongo:/data/db -p 127.0.0.1:27017:27017  --name mongodb mongo:3.2
$ sudo docker run -d -v /var/lib/redis:/data -p 127.0.0.1:6379:6379 --name redis redis:3.2
```

开发环境(macOS):

```
$ docker run -d -v /usr/local/var/mongodb:/data/db -p 127.0.0.1:27017:27017  --name mongodb mongo:3.4
$ docker run -d -v /usr/local/var/db/redis:/data -p 127.0.0.1:6379:6379 --name redis redis:3.2
```

## 部署服务

### 验证服务

```
$ cd service/auth
$ docker build -t yezersky/ant-auth-service .
$ docker run -d --link redis:redis -p 127.0.0.1:9090:9090 --name ant-auth-service yezersky/ant-auth-service
```

### 路径规划服务

```
$ docker build -t ant-route-service .
$ docker run -d --link redis:redis -p 127.0.0.1:9090:9090 --name ant-route-service yezersky/ant-route-service
```

### 订单服务

```
$ cd service/order
$ docker build -t yezersky/ant-order-service .
$ docker run -d --link mongodb:mongodb --link redis:redis -p 127.0.0.1:9090:9090 --name ant-order-service yezersky/ant-order-service
```

### 日志服务

```
$ cd service/logger
$ docker build -t yezersky/ant-logger-service .
$ docker run -d --link mongodb:mongodb --link redis:redis -p 127.0.0.1:9090:9090 --name ant-logger-service yezersky/ant-logger-service
```


## 部署应用

```
$ cd app
$ docker build -t yezersky/ant-express
$ docker run -d --link mongodb:mongodb --link redis:redis \
                --link ant-auth-service:ant-auth-service \
                --link ant-route-service:ant-route-service \
                --link ant-order-service:ant-order-service \
                --link ant-logger-service:ant-logger-service \
                -p 127.0.0.1:3000:3000 --name ant-express yezersky/ant-express
```

