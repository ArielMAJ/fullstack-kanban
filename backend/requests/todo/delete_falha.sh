: ${APP_HOST:="http://localhost:8080"}
echo todo delete falha - sem token
curl --request DELETE \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json'
echo
echo todo delete falha - token inválido
curl --request DELETE \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN"
echo
echo todo delete falha - acesso a dados de outro usuário
curl --request DELETE \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER2_TOKEN"
echo
echo todo delete falha - requisição mal formatada
curl --request DELETE \
  --url $APP_HOST/todo/abc$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo
echo todo delete falha - todo inexistente
curl --request DELETE \
  --url $APP_HOST/todo/1928492 \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo