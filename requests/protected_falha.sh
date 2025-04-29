echo token invalido
curl --request GET \
  --url 'http://localhost:8080/protected' \
  --header "Authorization: Bearer tokeninvalido"
echo
echo sem token
curl --request GET \
  --url 'http://localhost:8080/protected'
echo