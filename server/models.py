from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
import json

Base = declarative_base()

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    category = Column(String)  # R, I, A, S, E, C
    options = relationship("AnswerOption", back_populates="question")

class AnswerOption(Base):
    __tablename__ = "answer_options"
    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    text = Column(String)
    points = Column(String)  # JSON в виде строки
    question = relationship("Question", back_populates="options")

class UserAnswer(Base):
    __tablename__ = "user_answers"
    session_id = Column(String, primary_key=True)
    question_id = Column(Integer, ForeignKey("questions.id"), primary_key=True)
    option_id = Column(Integer, ForeignKey("answer_options.id"))