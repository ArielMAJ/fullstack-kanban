bash ./requests/reset.sh
bash ./requests/registro_ok.sh
bash ./requests/registro_falha.sh
bash ./requests/login_falha.sh
TOKEN=$(bash ./requests/login_ok.sh | tee /dev/tty | tail -n1 | sed -E 's/.*"token":"([^"]+)".*/\1/')
bash ./requests/protected_falha.sh
echo bash ./requests/protected_ok.sh $TOKEN
bash ./requests/protected_ok.sh $TOKEN
