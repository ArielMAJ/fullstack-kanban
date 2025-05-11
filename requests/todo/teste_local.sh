if [ -z "${USER1_TOKEN}" ]; then
    bash ./requests/registro_ok_req.sh user1@example.com > /dev/null
    USER1_TOKEN=$(bash ./requests/login_ok_req.sh user1@example.com | jq -er .token)
fi
if [ -z "${USER2_TOKEN}" ]; then
    bash ./requests/registro_ok_req.sh user2@example.com > /dev/null
    USER2_TOKEN=$(bash ./requests/login_ok_req.sh user2@example.com | jq -er .token)
fi

echo Usando token 1: $USER1_TOKEN
echo Usando token 2: $USER2_TOKEN

export USER_TOKEN=$USER1_TOKEN
export USER1_TOKEN
export USER2_TOKEN

bash ./requests/todo/criar_ok.sh
bash ./requests/todo/criar_falha.sh
export TODO_ID=$(bash ./requests/todo/criar_ok_req.sh | jq -er .id)
bash ./requests/todo/put_ok.sh
bash ./requests/todo/put_falha.sh
bash ./requests/todo/get_ok.sh
bash ./requests/todo/patch_ok.sh
bash ./requests/todo/patch_falha.sh
bash ./requests/todo/get_ok.sh
bash ./requests/todo/get_falha.sh
bash ./requests/todo/delete_falha.sh
bash ./requests/todo/delete_ok.sh
bash ./requests/todo/get_todos_ok.sh
USER_TOKEN=$USER2_TOKEN bash ./requests/todo/get_todos_ok.sh
bash ./requests/todo/get_todos_falha.sh