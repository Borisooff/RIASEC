from sqlalchemy.orm import Session
from models import Question, AnswerOption, UserAnswer
from database import Session
import json
import uuid


def get_questions(session: Session, limit: int = None):
    """Получение списка вопросов с вариантами ответов"""
    query = session.query(Question)
    if limit:
        query = query.limit(limit)
    return query.all()


def save_answer(session: Session, session_id: str, question_id: int, option_id: int):
    """Сохранение ответа пользователя"""
    answer = UserAnswer(
        session_id=session_id,
        question_id=question_id,
        option_id=option_id
    )
    session.add(answer)
    session.commit()


def calculate_results(session: Session, session_id: str):
    """Расчет результатов теста"""
    answers = session.query(UserAnswer).filter_by(session_id=session_id).all()

    results = {"R": 0, "I": 0, "A": 0, "S": 0, "E": 0, "C": 0}

    for answer in answers:
        option = session.get(AnswerOption, answer.option_id)
        if option and option.points:
            points = json.loads(option.points)
            for category, score in points.items():
                results[category] += score

    return results


def run_test():
    """Запуск теста"""
    session = Session()
    test_session_id = str(uuid.uuid4())

    try:
        # Получаем все вопросы
        questions = get_questions(session)

        print("Добро пожаловать в тест RIASEC!\n")
        print("Отвечайте на вопросы, используя шкалу от 1 до 5:\n")

        for question in questions:
            print(f"\n{question.text}")
            for i, option in enumerate(question.options, 1):
                print(f"{i}. {option.text}")

            while True:
                try:
                    choice = int(input("Ваш выбор (1-5): "))
                    if 1 <= choice <= len(question.options):
                        save_answer(session, test_session_id, question.id, question.options[choice - 1].id)
                        break
                    else:
                        print("Пожалуйста, введите число от 1 до", len(question.options))
                except ValueError:
                    print("Введите корректный номер варианта!")

        # Расчет результатов
        results = calculate_results(session, test_session_id)

        print("\nРезультаты:")
        for category, score in sorted(results.items(), key=lambda x: x[1], reverse=True):
            print(f"{category}: {score} баллов")

    finally:
        session.close()


if __name__ == "__main__":
    run_test()