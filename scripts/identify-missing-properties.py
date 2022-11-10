#####################################################################################################################################
#Author: Cody Constine Date: 8/8/2016
#See readme for purpose
#Usage: ./identify-missing-properties.py <target>
#####################################################################################################################################
import os, csv, sys
lang = ["_de", "_es", "_fr", "_ja", "_it"] #add new Language
output = 'output.csv' #name of output file
prop = ".properties" #properties extention
dialect = 'excel' #Dialect of the csv file
delimiter = ',' #Delimiter for the csv file
out = 'out.txt' #Name of file path output file, please also change in missing.sh

def findFiles(name): #This function finds the file name
	fFound = [];
	for root, dirs, files in os.walk(name):
		for file in files:
			if file.endswith(prop):
				d = os.path.dirname(__file__)
				fFound.append(os.path.join(root, file))
	return fFound;

def groupFiles(lst): #this function groups the files into the correct groups
	i = len(lst) 
	a = 0 #file is alone if this is 0, also stores group size
	for x in range(0,i-1):
		end = lst[x].find(prop)
		start = lst[x].rfind('/')+1
		name = lst[x][start:end]
		diff = end-start
		if(name[:diff-3] not in lst[x+1][start:end]): #If the next file does not match the current file name, the group is over
			if(a == 0): #files that end here have no group
				with open(out,'a') as f:
					f.write(lst[x][:start-1] + "\n")
				f.closed
				continue 
			missingFile(lst[x-a:x]) #Pass each group to missingFiles
			with open(out,'a') as f:
				f.write(lst[x][:start-1] + "\n")
			f.closed
			a = 0 #Reset the a to determine if the file is alone
			continue
		a = a+1 #count group size

def missingFile(lst): #This function takes a group of files, and determines what is missing
	with open(output, 'a') as f: #add file paths to rows
		tmp = []
		writer = csv.writer(f, delimiter = delimiter,  quoting=csv.QUOTE_MINIMAL, dialect=dialect)
		tmp.append(lst[0])
		tmp.append('')
		for l in lang:
			tmp.append('')
		writer.writerow(tmp)
	f.closed
	for x in range(1,len(lst)):
		with open(lst[x],'r') as f: #This reads in all data of each forgien Language
			read_data = f.read()
		f.closed
		with open(lst[0], 'r') as f2: #This reads english line by line and checks if the key is present in the Language
			row = 0
			for line in f2:
				end = line.find('=')
				if(end == -1):
					continue
				key = line[:end] 
				value = line[end+1:].rstrip()
				if key not in read_data:
					lang_id = 0
					for l in lang:
						tmp = l +prop #This allows me to see which Language the program is on
						if tmp in lst[x]:
							placeX(key, lang_id, value)
						lang_id = lang_id + 1
			row = row+1
		f2.closed

def placeX(key, lang_id, value): #This Fuction places a X in the column if a key is missing
	newRow = True
	data = []
	row_id = 0
	with open(output, 'r') as f: #Open the file, and see if the key already present
		reader = csv.reader(f, delimiter = delimiter, dialect=dialect)
		for row in reader:
			if row[0] == key:
				newRow = False
				break
			row_id = row_id +1
	f.closed
	with open(output, 'a') as f: #Add row if it is not present
		writer = csv.writer(f, delimiter = delimiter, quoting=csv.QUOTE_MINIMAL, dialect=dialect)
		if(newRow):
			tmp = []
			tmp.append(key)

			tmp.append(value)
			for l in lang:
				tmp.append('')
			writer.writerow(tmp)
	f.closed
	with open(output, 'r') as f: #extrat data
		reader = csv.reader(f, delimiter = delimiter,  dialect=dialect)
		data =[row for row in reader]
	f.closed
	with open(output, 'w') as f: #rewrite extrated data a rebuild the sheet
		writer = csv.writer(f, delimiter = delimiter, quoting=csv.QUOTE_MINIMAL, dialect=dialect)
		data[row_id][lang_id+2] = 'X'
		for row in data:
			writer.writerow(row)
	f.closed

def main():
	with open(output, 'w') as f: #This adds the header to the CSV file
		tmp = []
		writer = csv.writer(f, delimiter = delimiter, quoting=csv.QUOTE_MINIMAL, dialect=dialect)
		tmp.append("Attribute")
		tmp.append("English Value")
		for l in lang:
			tmp.append(l)
		writer.writerow(tmp)
	f.closed
	lst = findFiles(sys.argv[1])
	groupFiles(lst)

if __name__=="__main__":
	main()
