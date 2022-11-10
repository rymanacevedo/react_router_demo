#!/bin/bash
display_usage() { 
	echo "This script must be run with two arguments, the path to the amp_apps directory, and the name of the output archive." 
	echo -e "\nUsage:\n$0 <amp_apps dir> <output archive>\n" 
	echo -e "Example:"
        echo -e "$0 ../amp_apps missingProperties.zip"
	} 

if [  $# -le 1 ] 
	then 
		display_usage
		exit 1
	fi 

if [[ ( $# == "--help") ||  $# == "-h" ]] 
	then 
		display_usage
		exit 0
	fi 


echo "Starting the python program\n"
python identify-missing-properties.py $1
echo "Starting zipping the function\n"
zip -r $2 -@ < out.txt
echo "Cleaning up"
rm out.txt
