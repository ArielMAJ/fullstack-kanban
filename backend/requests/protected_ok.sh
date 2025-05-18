#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Erro: coloque o token como argumento"
  exit 1
fi

: ${APP_HOST:="http://localhost:8080"}

echo protected ok
curl --request GET \
  --url $APP_HOST/protected \
  --header "Authorization: Bearer $1"
echo