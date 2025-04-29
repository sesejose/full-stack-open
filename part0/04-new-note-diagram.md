sequenceDiagram
participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server

server-->>browser: HTML document - it contains a form elemnt with the input field "text" and an input of type "submit".
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server

server-->>browser: the css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server

server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server.

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server

server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
deactivate server

Note right of browser: The browser executes the callback function that renders the notes.

Note right of browser: User types a note in the input field "text" and click on the input "submit".

Note right of browser: The form has the "action" and "method" attributes that indicates the type of request (POST) and where to post (exampleapp/new_note).

Note right of browser: A code on the server is responsible for the POST request - and the data is sent as the body of the POST request.

Note right of browser: The browser sends the input text value to the server.

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server

Note right of browser: The server responds with HTTP status code 302. This is a URL redirect, with which the server asks the browser to perform a new HTTP GET request to the address defined in the header's Location - the address is exampleapp/notes.

server-->>browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
deactivate server

Note right of browser: Furthermore, the code in the server creates and new object note and adds it to the array of notes.

Note right of browser: The browser reloads the HTML page. The reload causes three more HTTP requests, GET notes.html, GET main.css and GET main.js

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server

server-->>browser: HTML document - it contains a form elemnt with the input of type "text" and the input of type "submit".
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server

server-->>browser: the css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server

server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server - it contains the last note.

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server

server-->>browser: [{content: "A new note added", date: "2025-04-29T11:15:22.689Z"}, ... ]
deactivate server

Note right of browser: The browser executes the callback function that renders the notes.
