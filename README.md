# Testing Shopify API

## Exercise Requirements

#### 1. Frontend (React + MobX/Redux)
Please implement two pages:  
Page 1 - Contains 1 input to enter the Shopify store name and 1 submit button "Import".  
Page 2 - Displays the result of the migration or, in the case of an error, displays error message.  

User should be able to enter a Shopify Store name and click on the "Import" button, causing a request to be sent to the backend.

#### 2. Backend (Node.js + Express + MongoDB + Shopify)

There should be one API endpoint on the backend (/api/migrate) which should accept the body with a "accountName" parameter.

The database should contain the following models:  
- Accounts  
- Products  

When server receives the request to the "/api/migrate" endpoint, we'll need to check if this store already exists in the database.  If so, we just need to re-run the migration using the already existing "offline Shopify access token". 

However, If there's no existing account in our database for the given storeName, we'll need to make the OAuth in Shopify with this store.  Once we receive the response from Shopify, we'll:
- Make the HMAC verification from Shopify and then, if it passes:
- Save the account with Shopify details
- Proceed with the migration of all Shopify products.
