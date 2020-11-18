# proj-api


Jag valde att använda samma tekniker som vi använt tidigare i kursen för servern. Så jag har en vanlig express server som använder bcryptjs och jsonwebtoken för att hantera autentisering. Jag tyckte det var enkelt att jobba med tidigare och det fungerade bra.

Jag valde att använda mongodb istället för sqlite den här gången. Mongo fungerade bra att arbeta med i chatten. Så jag var intresserad att testa mer av det. Och jag tycker det passar in bättre i den här miljön då man använder mongo på ett liknande sätt till javascript till skillnad från att skriva sql-satser mitt i koden som man gör med sqlite.

För realtid använder jag socket.io för att skicka data till klienten. Jag valde den för det fungerade bra tidigare och det var enkelt att jobba med.
