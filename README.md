# Translation Project using LM with Basic Authentication

This project provides a simple text translation using language models and it has a user authentication system using FastAPI, SQLAlchemy, and JWT (JSON Web Tokens). It allows users to register, log in, and verify tokens, select and translate text. The database interaction is handled with SQLAlchemy, while passwords are securely hashed using Passlib.

## Features

- **User Registration**: Create new users with hashed passwords.
- **User Authentication**: Log in users and generate JWT tokens.
- **Token Verification**: Verify the validity of a JWT token.
- **Cross-Origin Resource Sharing (CORS)**: Configured for specific origins.

## Requirements

- Python 3.7+
- FastAPI
- SQLAlchemy
- Pydantic
- Passlib
- Python-JOSE
- Torch
- Transformers (Hugging Face)

Requirements will be updates soon.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/your-project.git
   cd your-project

   ```

2. Create a virtual environment and activate it:

   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`

   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

   ```

## Configuration

Update the following variables in the main file to fit your needs:

- `SECRET_KEY`: A secret key for encoding the JWT tokens. Replace with a strong secret.
- `ALGORITHM`: The algorithm used for JWT encoding (e.g., HS256).
- `ACCESS_TOKEN_EXPIRE_MINUTES`: The duration (in minutes) for which an access token remains valid.
- `SQLALCHEMY_DATABASE_URL`: The SQLite database URL for local usage.

## Translation Model Setup

The project uses MarianMT models from Hugging Face for translation between various languages. The model will automatically select cuda (if available) or cpu for inference.

The translation logic is implemented in translation_module.translation, which loads the necessary models dynamically based on the source and target languages.

### Supported Languages

MarianMT models cover many language pairs. Modify the source and target languages based on the ISO 639-1 code (e.g., en for English, fr for French).

## Database Setup

This codebase uses SQLite as the default database. The connection URL is set in `SQLALCHEMY_DATABASE_URL` as `'sqlite:///./lingomateai.db'`.

- Models: The `User` model is defined in the `models.py` file.
- Migrations: Run the following command to create the tables:
  ```bash
  python main.py

  ```

## Usage

# Starting the Server

Run the FastAPI application using:
```bash
uvicorn main:app --reload
The API will be accessible at http://localhost:8000.

## API Endpoints

### Register a new user

- **Endpoint**: `/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Login and obtain a JWT token

- **Endpoint**: `/token`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Verify a JWT token

- **Endpoint**: `/verify-token/{token}`
- **Method**: `GET`
- **Path Parameter**: `token` - The JWT token to be verified.
- **Response**:
  ```json
  {
    "message": "Token is valid"
  }
  ```

### Translate text

- **Endpoint**: `/translate`
- **Method**: `POST`
- **Body**:
  ```json
 {
  "source_lang": "en",
  "target_lang": "fr",
  "text": "Hello, how are you?"
}

  ```
- **Response**:
  ```json
  {
     "translated_text": "Bonjour, comment ça va?"
  }
  ```

## Middleware

CORS middleware is configured to allow requests from `http://localhost:3000`.

## Security

- **Password Hashing**: Passwords are hashed using bcrypt via Passlib.
- **JWT**: Tokens are signed with a secret key and contain an expiration time.
