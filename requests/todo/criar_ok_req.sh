: ${APP_HOST:="http://localhost:8080"}
curl --request POST -s \
  --url $APP_HOST/todo \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
	"content": "meu item todo"
}'