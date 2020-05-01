FROM python:3.7-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader punkt
RUN python -m spacy download en_core_web_sm
COPY . ./
CMD [ "python", "api.py" ]