from sqlalchemy import create_engine
from models import Base


def initialize_database():
    # Подключаемся к SQLite (файл riasec_test.db будет создан автоматически)
    engine = create_engine("sqlite:///riasec_test.db")

    # Создаем все таблицы
    Base.metadata.create_all(engine)
    print("Все таблицы успешно созданы в riasec_test.db")


if __name__ == "__main__":
    initialize_database()