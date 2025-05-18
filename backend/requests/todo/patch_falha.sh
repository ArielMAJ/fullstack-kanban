: ${APP_HOST:="http://localhost:8080"}
echo todo patch falha - sem token
curl --request PATCH \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --data '{
  "done": true
}'
echo
echo todo patch falha - token inválido
curl --request PATCH \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN" \
  --data '{
  "done": true
}'
echo
echo todo patch falha - acesso a dados de outro usuário
curl --request PATCH \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER2_TOKEN" \
  --data '{
  "done": true
}'
echo
echo todo patch falha - requisição mal formatada
curl --request PATCH \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
  "done": true
}'
echo