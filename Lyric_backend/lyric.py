from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage
import os
from dotenv import load_dotenv
from song import song_titles
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model_name="gpt-3.5-turbo")

# Temporary session storage (stores only in memory)
active_session = {"correct_song": None, "guesses": [], "lyrics": None}

class GuessRequest(BaseModel):
    user_guess: str

# Function to randomly select a song
def get_random_song():
    return random.choice(song_titles)

# Function to generate lyrics 
def generate_lyrics(song_title):
    prompt = f"""
    Generate a short (3-4 lines) lyric snippet from the song "{song_title}" without mentioning the title.
    Make sure it's recognizable but doesn't reveal the title directly.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()

# Function to get an engaging LLM response for incorrect guesses
def generate_feedback(user_guess, correct_song, attempts_left):
    prompt = f"""
    Act like an interactive game host. The player guessed "{user_guess}" but the correct song is "{correct_song}".
    They have {attempts_left} attempt(s) left.
    
    Provide a fun, engaging response. Be encouraging but do NOT reveal the correct answer yet. 
    Example styles:
    - "Ooh, close one! You’re on the right track, but not quite!"
    - "Nope! But don’t give up, you got this!"
    - "Not that one! Maybe think about a classic hit?"
    
    Make it sound like a fun game. Keep it short and friendly.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()

# Function to generate a response when the user wins
def generate_correct_response(correct_song):
    prompt = f"""
    Act like an interactive game host. The player guessed the song "{correct_song}" correctly!
    Celebrate their win with an enthusiastic message.
    
    Example styles:
    - "Yes! You got it! {correct_song} is the one! 🎉"
    - "Boom! You nailed it! {correct_song} was the answer!"
    - "Bravo! That’s right, it’s {correct_song}! Well played!"
    
    Keep it fun and energetic.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()

@app.get("/generate-lyric")
async def generate_lyric():
    """Generates a lyric snippet and initializes a new guessing session."""
    selected_song = get_random_song()
    lyrics_snippet = generate_lyrics(selected_song)

    # Reset session data
    active_session["correct_song"] = selected_song
    active_session["guesses"] = []
    active_session["lyrics"] = lyrics_snippet

    return {"lyrics": lyrics_snippet, "attempts_remaining":3}

@app.post("/check-guess")
async def check_guess(guess_request: GuessRequest):
    """Checks the user's guess and allows up to 3 attempts before revealing the correct answer."""
    if not active_session["correct_song"]:
        raise HTTPException(status_code=400, detail="No active session. Generate lyrics first.")

    user_guess = guess_request.user_guess.strip().lower()
    correct_song = active_session["correct_song"].strip().lower()
    
    # Track user's guess
    active_session["guesses"].append(user_guess)

    if user_guess == correct_song:
        response_message = generate_correct_response(active_session["correct_song"])
        active_session["correct_song"] = None  # End session on correct answer
        return {"correct": True, "message": response_message}

    attempts_left = 3 - len(active_session["guesses"])

    if attempts_left > 0:
        feedback = generate_feedback(user_guess, correct_song, attempts_left)
        return {"correct": False, "message": feedback, "attempts_remaining": attempts_left}
    else:
        correct_answer = active_session["correct_song"]
        active_session["correct_song"] = None  # End session after max attempts
        return {"correct": False, "message": f"Game over! The correct answer was: {correct_answer}","attempts_left": 0, "correct_song_title": correct_answer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
