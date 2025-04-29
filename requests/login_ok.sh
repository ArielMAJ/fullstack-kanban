curl --request POST \
  --url http://localhost:8080/login \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.0.2' \
  --data '{
	"email": "test@example.com",
	"password": "helloworld"
}'
echo