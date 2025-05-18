: ${APP_HOST:="http://localhost:8080"}
echo todo get falha - sem token
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json'
echo
echo todo get falha - token inválido
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN"
echo
echo todo get falha - acesso a dados de outro usuário
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER2_TOKEN"
echo
echo todo get falha - requisição mal formatada
curl --request GET \
  --url $APP_HOST/todo/abc$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo