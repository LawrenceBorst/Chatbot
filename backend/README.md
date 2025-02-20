# Chatbot Backend

This folder contains the chatbot backend code. To run the backend itself, run

```
flask run
```

The flask environment variables are automatically fetched from the `.env` file. It is seen that the entry point is `main.py`

To set up the backend, first install dependencies

```
poetry install
```

To upgrade the database (this needs to run to create the database)

```
poetry run flask db upgrade
```