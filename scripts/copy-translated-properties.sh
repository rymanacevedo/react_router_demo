#!/bin/bash

display_usage() { 
	echo "This script must be run with two arguments, the path to the unzipped and translated property files amp_apps directory, the code base's amp_apps directory." 
        echo "An optional third parameter may be provided if you only want to look for certain properties, eg. italian. By default this script will work on all properties."
	echo -e "\nUsage:\n$0 <path to unzipped property files /amp-apps directory> <path to code repo's /amp_apps directory> <the language property abbreviation> \n" 
	echo -e "Example:"
        echo -e "$0 \"/Users/dsethi/Downloads/Final_QAedfiles/Final_QAed files/Final_QAed files/files/amp_apps\" ~/Documents/dev/amp_apps it"
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

language=$(3:-*)

cd "$1"
find . -name "*Messages*$3.properties" | sed "s|^\./||" > propertyFiles.txt

while read line; do
	#utf8 encode
	native2ascii -encoding utf8 $line $line"1"
	#escape single quote
	sed -i.bak "s/\'/\'\'/g" $line"1"
	echo "cp $line"1" $2/$line";
	#copy the encoded and escaped file to the code repo
        cp $line"1" $2"/"$line;

done <propertyFiles.txt
