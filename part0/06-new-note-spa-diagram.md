sequenceDiagram
participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server

server-->>browser: HTML document - it contains a form elemnt with the input of type "text" and the input of type "submit".
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server

server-->>browser: the css file
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate server

server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server.

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server

server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
deactivate server

Note right of browser: The browser executes the callback function that renders the notes in the HTML file.

Note right of browser: User types a note in the input field in the form and then click on the input "submit".

Note right of browser: The JavaScript code from spa.js is also responsible to send that data - value of input field (new note) to the server.

Note right of browser: The browser sends the value from the input field to the server.

Note right of browser: The event handler function in spa.js creates a new note and add it to the array of notes. Then renders all the notes in the page and send the new note to the server.

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server

Note right of browser: The server responds with HTTP status code 201 Created.
