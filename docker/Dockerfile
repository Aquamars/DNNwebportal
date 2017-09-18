MAINTAINER a40503 itriA40503@itri.org.tw
# install nginx
FROM nginx:latest
# copy DNN webportal
COPY ../build /user/share/nginx/html/DNN
# copy nginx.conf (enable gzip)
COPY default.conf /etc/nginx/nginx.conf