: ${APP_HOST:="http://localhost:8080"}
echo todo criar falha - sem token
curl --request POST \
  --url $APP_HOST/todo \
  --header 'Content-Type: application/json' \
  --data '{
	"content": "meu item todo"
}'
echo
echo todo criar falha - token inválido
curl --request POST \
  --url $APP_HOST/todo \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer 123$USER_TOKEN" \
  --data '{
	"content": "meu item todo"
}'
echo
echo todo criar falha - requisição mal formatada
curl --request POST \
  --url $APP_HOST/todo \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
	"contents": "meu item todo"
}'
echo