echo senha invalida
curl --request POST \
  --url http://localhost:8080/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "test@example.com",
	"password": "senhainvalida"
}'
echo
echo email invalido
curl --request POST \
  --url http://localhost:8080/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "test2@example.com",
	"password": "helloworld"
}'
echo
echo requisicao mal formatada
curl --request POST \
  --url http://localhost:8080/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email2": "test@example.com",
	"password": "senhainvalida"
}'
echo