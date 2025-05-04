: ${APP_HOST:="http://localhost:8080"}
echo login ok
curl --request POST -s \
  --url $APP_HOST/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.0.2' \
  --data '{
	"email": "test@example.com",
	"password": "helloworld"
}'
echo