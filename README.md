# Asignment_MOB402
Run `$npm install` in client and server then create file .env with content `TOKEN_SEC_KEY=<random character>` in folder server.
You need replace API link by your API link in `App_client/data/API.js`.
Connect to your mongoDB including collections:
  `category`:
            `{
              "_id": {
                "$oid": "64250cd3a43d776e3a3c03c7"
               },
              "name": "Samsung 1"
              }`
              
   `products`:
              `{
                "_id": {
                  "$oid": "6432338035bce636016a29a1"
                },
                "name": "123",
                "price": 11111,
                "image": "/upload/Suhdo_cyberpunk_pixel_art__2d_platform_f41f768c-4f70-40fc-8a9d-534744da3c5c.png",
                "category": {
                  "$oid": "64250cd3a43d776e3a3c03ca"
                },
                "description": "ffdsfd"
              }`
              
   `users`:
             `{
                "_id": {
                  "$oid": "643291142503e7c6f172c75e"
                },
                "username": "Dung23",
                "image": "/upload/f4327a31-10aa-43e8-ab42-a9e6ad3b89ac.jpeg",
                "email": "dungntph22034@fpt.edu",
                "passwd": "$2b$10$qQEEpb0MR6U2PyY0.36tU.eCMV.711vyDQIIEeJHQbnPXmWycCHdq",
                "role": 1,
                "__v": 0,
                "token":"eyJhbGc"
              }`
