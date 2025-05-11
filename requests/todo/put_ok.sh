: ${APP_HOST:="http://localhost:8080"}
echo todo put ok
curl --request PUT \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
  "content": "meu item todo atualizado",
  "done": false
}'
echo