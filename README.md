
# Lyric Match - Song Guessing Game
A fun game where users guess the song title based on a snippet of lyrics. Built with React (frontend) and FastAPI (backend).


## Features

- Fetch random song lyrics

- Submit guesses and get feedback

- Track remaining attempts

-  Score system (+10 points for correct guesses & -5 for wrong guesses)

- Win/Lose popups with correct answers
# Backend (FastAPI)

## Tech Stack

FastAPI

Python

Uvicorn
## Setup Instructions

```
git clone
cd Lyric_backend
```

Install Package
```
pip install -r requirements.txt

```
Add .env file

```
OPENAI_API_KEY=

```

Start the backend server
```
python lyric.py

```

## API Reference

#### generete lyrics snippet

```http
  GET /generate-lyric
```
#### guess match 

```http
  POST /check-guess
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_guess`      | `string` | Submit a guess and get feedback |


# Frontend
## Tech Stack

- React.js

- Tailwind CSS

- Axios
## Setup Instructions

```
cd Lyric_UI
npm install
npm run dev

```
