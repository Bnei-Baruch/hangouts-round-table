#!/bin/sh

CONSTS_FILE="../consts.yaml"

echo "Generating Hangout IDs"

echo "---\nhangout_ids:" > "$CONSTS_FILE"

for i in `seq 1 500`;
do
  wget -x --load-cookies hangouts-cookies.txt https://plus.google.com/hangouts/_/ -O .hangouts.html
  hangout_id=$(grep -Po '(?<=https:\/\/plus.google.com\/hangouts\/_\/)g\w*' .hangouts.html);

  if [ ! -z "${hangout_id}" ]
  then
    echo "  - ${hangout_id}" >> "$CONSTS_FILE"
  fi
done   
