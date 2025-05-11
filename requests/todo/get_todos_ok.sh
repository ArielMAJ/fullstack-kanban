: ${APP_HOST:="http://localhost:8080"}
echo todo get todos ok
curl --request GET \
  --url $APP_HOST/todo \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $USER_TOKEN"
echo