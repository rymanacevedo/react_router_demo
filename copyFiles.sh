# run this file to keep the react /amp procject in sync with bob project until the time that we can remove bob
# we also load submodules images into this directory so when running react locally the images can be found.  We should probably just move all images into the amp project and update references

mkdir -p public/author-app/images
cp -R ../client/js/author-app/src/main/webapp/images/* public/author-app/images

mkdir -p public/css
cp -R ../client/standalone/bob/src/main/webapp/css/* public/css

mkdir -p public/fonts
cp -R ../client/standalone/bob/src/main/webapp/fonts/* public/fonts

mkdir -p public/images
cp -R ../client/standalone/bob/src/main/webapp/images/* public/images

mkdir -p public/js
cp -R ../client/standalone/bob/src/main/webapp/js/* public/js

mkdir -p public/resources
cp -R ../client/standalone/bob/src/main/webapp/resources/* public/resources
