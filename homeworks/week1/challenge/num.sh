#!/bin/bash
for ((i = 1 ; i<=$1; i= i+1))
do
  touch "$i.js"
done
