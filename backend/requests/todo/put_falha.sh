: ${APP_HOST:="http://localhost:8080"}
echo todo put falha - sem token
curl --request PUT \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --data '{
  "content": "meu item todo atualizado",
  "done": false
}'
echo
echo todo put falha - token inválido
curl --request PUT \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN" \
  --data '{
  "content": "meu item todo atualizado",
  "done": false
}'
echo
echo todo put falha - acesso a dados de outro usuário
curl --request PUT \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER2_TOKEN" \
  --data '{
  "content": "meu item todo atualizado",
  "done": false
}'
echo
echo todo put falha - requisição mal formatada
curl --request PUT \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
	"contents": "meu item todo",
  "done": false
}'
echo