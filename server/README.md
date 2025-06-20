# RIASEC
Learning Project in SAFU

# Frontend

---

# Backend

---

## Для запуска программы требуется написать:

```
pip install sqlalchemy
```

```
pip install fastapi uvicorn
```

```
python -m uvicorn main:app --reload  
```

**В случае если файл базы данных отсутствует:**

```
# Инициализация/создание БД
python init_db.py

# Загрузка вопросов в БД
python fill_questions.py
```

**Для запуска бэкенд приложения**
```
python main.py
```

Все вопросы в формате JSON лежат в файле python `fill_questions.py`

