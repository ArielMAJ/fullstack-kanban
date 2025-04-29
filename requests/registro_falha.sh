echo registro email repetido
curl --request POST \
  --url http://localhost:8080/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "test@example.com",
	"password": "helloworld"
}'
echo
echo registro senha invalida
curl --request POST \
  --url http://localhost:8080/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "test2@example.com",
	"password": "abc"
}'
echo
echo registro email invalido
curl --request POST \
  --url http://localhost:8080/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email": "test2@example",
	"password": "helloworld"
}'
echo
echo registro requisicao mal formatada
curl --request POST \
  --url http://localhost:8080/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test",
	"email2": "test2@example.com",
	"password": "helloworld"
}'
echo