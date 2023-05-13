# IMAGEIQ WIREFRAME

https://trello.com/b/U2NN9TsL/imageiq

## Technologies Used: 
* Node.js
* Express.js
* MongoDB
* Mongoose
* Bcrypt 
* JSON Web Tokens
* TenserFlow.js : JS library for training and deploying machine learning models, which will be used for image recognition tasks.
* MobileNet : A pre-trained model for image recognition available in TensorFlow.js.


## User Story 
As a user, I want a clean and responsive UI. Initially a clear home page that prompts account creation. Once an account is created there will be an option to drag and drop an image onto the screen. API will return information on what is in the image. The User will have the option to upload another image and begin a new search or access their user upload history

## Wireframe 

- backend
    - src
        - controllers
            - userController.js
            - imageController.js
            - authController.js
        - models
            - User.js
            - Image.js
        - api
            - mobileNetService.js
        - app.js
        - server.js
    - .env
    - package.json


