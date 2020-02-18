curl -i \
    -H "Accept: application/json" \
    -H "X-HTTP-Method-Override: PUT" \
    -X POST -d "value":"30","type":"Tip 3","targetModule":"Target 3","configurationGroup":null,"name":"Configuration Deneme 3","description":null,"identity":"Configuration Deneme 3","version":0,"systemId":3,"active":true \
    http://localhost:8080/xx/xxx/xxxx


 curl -X POST -d "username":"billy" localhost:8000/apidb/customview

 curl -X POST -d '{"username":"billy","pass":"1234"}' --header "Content-Type: application/json" localhost:8000/apidb/customview

new line
curl -X POST -d '{"username":"billy","email":"da.joker@gmail.com"}' --header "Content-Type: application/json" localhost:8000/apidb/create -w "\n"



curl -X POST -d '{"username":"billy","comment":"hello, this is a test","email":"da.joker@gmail.com"}' --header "Content-Type: application/json" localhost:8000/apidb/comments -w "\n"
// GET
curl localhost:8000/apidb/comments
