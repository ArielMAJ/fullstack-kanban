#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Erro: coloque o token como argumento"
  exit 1
fi

curl --request GET \
  --url 'http://localhost:8080/protected' \
  --header "Authorization: Bearer $1"
echo