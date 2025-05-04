: ${APP_HOST:="http://localhost:8080"}
echo login senha invalida
curl --request POST \
  --url $APP_HOST/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "test@example.com",
	"password": "senhainvalida"
}'
echo
echo login email invalido
curl --request POST \
  --url $APP_HOST/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "test2@example.com",
	"password": "helloworld"
}'
echo
echo login requisicao mal formatada
curl --request POST \
  --url $APP_HOST/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email2": "test@example.com",
	"password": "senhainvalida"
}'
echo