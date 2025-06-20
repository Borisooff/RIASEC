from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uuid

from models import Question, UserAnswer, AnswerOption
from database import Session as LocalSession
import json

app = FastAPI()

print(__file__)
# Разрешаем CORS (например, для доступа с фронта)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← в проде указать домен фронта
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()

@app.get("/questions")
def get_questions(limit: int = None, db: Session = Depends(get_db)):
    query = db.query(Question)
    if limit:
        query = query.limit(limit)
    questions = query.all()

    result = []
    for q in questions:
        result.append({
            "id": q.id,
            "text": q.text,
            "category": q.category,
            "options": [
                {
                    "id": opt.id,
                    "text": opt.text,
                }
                for opt in q.options
            ]
        })
    return result

@app.post("/answer")
def save_answer(session_id: str, question_id: int, option_id: int, db: Session = Depends(get_db)):
    answer = UserAnswer(
        session_id=session_id,
        question_id=question_id,
        option_id=option_id
    )
    db.add(answer)
    db.commit()
    return {"status": "ok"}

@app.get("/results")
def calculate_results(session_id: str, db: Session = Depends(get_db)):
    answers = db.query(UserAnswer).filter_by(session_id=session_id).all()
    results = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}
    for answer in answers:
        option = db.get(AnswerOption, answer.option_id)
        if option and option.points:
            points = json.loads(option.points)
            for category, score in points.items():
                results[category] += score
    return results

@app.get("/new-session")
def create_session():
    return {"session_id": str(uuid.uuid4())}
