```mermaid
sequenceDiagram
  participant User
  participant Browser
  participant Server

  User->>Browser: Launches https://studies.cs.helsinki.fi/exampleapp/spa

  Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server-->>browser: HTML document
  deactivate server

  Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
  activate server
  server-->>browser: the css file
  deactivate server

  Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa/spa.js
  activate server
  server-->>browser: the JavaScript file
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
  activate server
  server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
  deactivate server

