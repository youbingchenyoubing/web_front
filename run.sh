docker run -v ./nginx/nginx.conf:/etc/nginx/nginx.conf -v ./nginx/proxy.conf:/etc/nginx/proxy.conf -v ./nginx/conf.d:/etc/nginx/conf.d -v ./dist:/home/dist nginx:latest