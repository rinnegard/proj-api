# proj-api

## Tekniker

Jag valde att använda samma tekniker som vi använt tidigare i kursen för servern. Så jag har en vanlig express server som använder bcryptjs och jsonwebtoken för att hantera autentisering. Jag tyckte det var enkelt att jobba med tidigare och det fungerade bra för den här typen av projekt.

#### Databas

Jag valde att använda [mongodb](https://www.mongodb.com/) istället för sqlite den här gången. Mongo fungerade bra att arbeta med i chatten. Så jag var intresserad att testa mer av det. Och jag tycker det passar in bättre i den här miljön då man använder mongo på ett liknande sätt till javascript till skillnad från att skriva sql-satser mitt i koden som man gör med sqlite.

#### Realtid

För realtid använder jag [socket.io](https://socket.io/) för att skicka data till klienten. Jag valde den för att jag är bekant med socket.io från chatten vi gjorde tidigare och det fungerade bra då och det var enkelt att jobba med.
