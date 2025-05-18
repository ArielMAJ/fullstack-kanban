: ${APP_HOST:="http://localhost:8080"}
echo todo get todos falha - sem token
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json'
echo
echo todo get todos falha - token inválido
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN"
echo