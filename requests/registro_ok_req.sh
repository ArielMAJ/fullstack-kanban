: ${APP_HOST:="http://localhost:8080"}
curl --request POST -s \
  --url $APP_HOST/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "'"${1:-test@example.com}"'",
	"password": "helloworld"
}'