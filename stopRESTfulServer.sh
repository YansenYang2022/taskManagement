#!/bin/bash

pid_nums1=`ps aux | grep "RESTful_server_app.js" | grep -v grep | wc -l`
if [ $pid_nums1 -eq "0" ];then
   echo "Server stop failed, there is no RESTful task server running.  "
   exit
fi

curl http://localhost/shutdown
echo " ... "
sleep 1
pid_nums1=`ps aux | grep "RESTful_server_app.js" | grep -v grep | wc -l`
if [ $pid_nums1 -ne "0" ];then
   echo "Server stop failed, please check RESTfulServer.log for detail.  "
   exit
else
   echo "Server stop successfully, you can start server again by: sh startRESTfulServer.sh "
   exit
      
fi

