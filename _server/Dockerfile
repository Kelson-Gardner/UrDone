FROM python:3.11.1

ENV PYTHONBUFFERED=1

WORKDIR /server

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD [ "python3", "manage.py", "runserver" ]