#!/bin/bash
FILE="log.txt"
DATE=$1

showTime(){
    hour=$(echo "$1" | awk '{print $5}' | awk -F':' '{sum += $1}END{print sum}')
    minutes=$(echo "$1" | awk '{print $5}' | awk -F':' '{sum += $2}END{print sum}')
    h=$(($minutes / 60 + $hour))
    m=$(($minutes % 60))
    for((i=0;i<$h;i=i+1))
    do
        echo -n "+"
    done
    echo -n "     $h:$m"
}

if [ -z "$DATE" ];then
    lines=$(cat $FILE)
else
    lines=$(cat $FILE | grep $DATE)
fi

mtr=$(echo "$lines" | grep MTR)
iss=$(echo "$lines" | grep ISS)

echo 'SUM   '$(showTime "$lines")

echo ''
echo 'MTR   '$(showTime "$mtr")
echo 'ISS   '$(showTime "$iss")





