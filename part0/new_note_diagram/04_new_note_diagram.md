```mermaid
sequenceDiagram
  participant User
  participant Browser
  participant Server

  User->>Browser: Enter text into the text field
  User->>Browser: Click Save button

  Browser->>Server: Send note data to https://studies.cs.helsinki.fi/exampleapp/notes

  Server-->>Browser: Receive and process note data
  Browser-->>User: Confirmation of note creation
