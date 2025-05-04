: ${APP_HOST:="http://localhost:8080"}
echo protected token invalido
curl --request GET \
  --url $APP_HOST/protected \
  --header "Authorization: Bearer tokeninvalido"
echo
echo protected sem token
curl --request GET \
  --url $APP_HOST/protected
echo