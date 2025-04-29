echo registro ok
curl --request POST \
  --url http://localhost:8080/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "test@example.com",
	"password": "helloworld"
}'
echo