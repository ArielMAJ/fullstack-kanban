: ${APP_HOST:="http://localhost:8080"}
echo registro ok
curl --request POST \
  --url $APP_HOST/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "test@example.com",
	"password": "helloworld"
}'
echo