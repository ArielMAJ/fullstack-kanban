: ${APP_HOST:="http://localhost:8080"}
echo todo get ok
curl --request GET \
  --url $APP_HOST/todo/$TODO_ID \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo