#!/bin/bash

ARTIFACT_URL="http://nexus.devtrip.com.ar/service/local/artifact/maven/redirect?r=releases&g=com.avantrip.berazategui&a=berazategui&v=LATEST&e=tgz"

mkdir {.tmp,berazategui_modules}

rm -r berazategui_modules/berazategui

wget $ARTIFACT_URL -O .tmp/bz.tgz

mkdir -p berazategui_modules/berazategui

tar -zxvf .tmp/bz.tgz -C berazategui_modules/berazategui

npm install

bower install

cd test

npm install

bower install


