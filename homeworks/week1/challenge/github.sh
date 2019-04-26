#!/bin/bash
ID=$1
text=$(curl https://api.github.com/users/"$ID") 
name=$(echo "$text" | grep 'name')
location=$(echo "$text" | grep 'location')
bio=$(echo "$text" | grep 'bio')
blog=$(echo "$text" | grep 'blog')
echo $name | awk -F'\"' '{print $4}'
echo $location | awk -F'\"' '{print $4}'
echo $bio | awk -F'\"' '{print $4}'
echo $blog | awk -F'\"' '{print $4}'
