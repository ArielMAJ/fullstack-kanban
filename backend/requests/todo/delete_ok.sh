: ${APP_HOST:="http://localhost:8080"}
echo todo delete ok
curl --request DELETE \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo