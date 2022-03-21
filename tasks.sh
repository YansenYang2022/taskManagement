#!/bin/bash
serverHost="111.231.31.105"

#param1 is operation:
#support operation name: done/add/list/set/modify/
operate="$1"
todayDate="$(date +%Y-%m-%d)"

#using this to delete task, input param 2 is the task id
if [ "$operate" == "done" -o "$operate" == "delete" ];then
   curl -X DELETE http://$serverHost/task/$2
fi

#using this to create task, input 
#param 2: title
#param 3: due date
if [ "$operate" == "add" ];then
   curl -X POST -d "title=$2&due_date=$3" http://$serverHost/task
fi

#using this to list task
#param 2: blank / all / task id / --expiring-today
if [ "$operate" == "list" ];then

  if [ "$2" == "--expiring-today" ];then
	curl http://$serverHost/task/due_date/$todayDate
  else
	 if [ "$2" == "" -o "$2" == "all" ];then
		curl http://$serverHost/task
	 else
		curl http://$serverHost/task/$2
	fi
  fi

fi

if [ "$operate" == "set" -o "$2" == "modify" ];then
    curl -X PUT -d "title=$3&due_date=$4&id=$2" http://$serverHost/task
fi



echo ""

