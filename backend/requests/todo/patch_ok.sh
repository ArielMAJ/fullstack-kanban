: ${APP_HOST:="http://localhost:8080"}
echo todo patch ok
curl --request PATCH \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN" \
  --data '{
  "done": true
}'
echo