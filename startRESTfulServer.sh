#!/bin/bash

pid_nums1=`ps aux | grep "RESTful_server_app.js" | grep -v grep | wc -l`
if [ $pid_nums1 -ne "0" ];then
   echo "RESTful_server_app Server is already running, please stop it first by command: sh stopRESTfulServer.sh "
   exit
else
   nohup node RESTful_server_app.js >> RESTfulServer.log 2>&1 &
   sleep 1
   pid_nums1=`ps aux | grep "RESTful_server_app.js" | grep -v grep | wc -l`
   if [ $pid_nums1 -ne "0" ]; then
       echo "Server started successfully, please check RESTfulServer.log to monitor."
	   exit
	else
       echo "Server started failed, please check RESTfulServer.log for detail."
	   exit
    fi    
fi

