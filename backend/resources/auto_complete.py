from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from transformers import AutoTokenizer, AutoModelWithLMHead
from nltk.tokenize import sent_tokenize
import torch

'''
tokenizer = AutoTokenizer.from_pretrained('distilgpt2')  # Initialize tokenizer
model = AutoModelWithLMHead.from_pretrained('distilgpt2')  # Download model and configuration from S3 and cache.
'''
tokenizer = AutoTokenizer.from_pretrained('./language_model')  # Initialize tokenizer
model = AutoModelWithLMHead.from_pretrained('./language_model')  # Download model and configuration from S3 and cache.
if torch.cuda.is_available(): model.to('cuda')
model.eval()

class AutoComplete(Resource):
    def get(self):
        context = self.get_last_sentence(request.args.get('context'))
        top_p = float(request.args.get('top_p')) if request.args.get('top_p') is not None else 0.9
        temperature = float(request.args.get('temperature')) if request.args.get('temperature') is not None else 1
        repetition_penalty = float(request.args.get('repetition_penalty')) if request.args.get('repetition_penalty') is not None else 1
        max_length = int(request.args.get('max_length')) if request.args.get('max_length') is not None else 50

        sentences = []

        input_ids = tokenizer.encode(context, return_tensors='pt')  # encode input context
        if torch.cuda.is_available(): input_ids = input_ids.to('cuda')
        outputs = model.generate(input_ids=input_ids, do_sample=True, num_return_sequences=5, max_length=max_length, top_p=top_p, temperature=temperature, repetition_penalty=repetition_penalty)
        seen = set()
        for i in range(5):  # 3 output sequences were generated
            output = tokenizer.decode(outputs[i], skip_special_tokens=True)[len(context):]
            sentence = self.get_first_sentence(output)

            if sentence not in seen:
                seen.add(sentence)
                sentences.append({'value': sentence, 'origin': output})
        sentences = [sentence for sentence in sentences if sentence]
        return {'context': context, 'sentences': sentences}

    def get_first_sentence(self, text):
        sent_token = sent_tokenize(text)
        if len(sent_token) == 0:
            sentence = text
        else:
            first_send_idx = text.find(sent_token[0])
            first_send_offset = {'start': first_send_idx, 'end': first_send_idx + len(sent_token[0])}
            sentence = text[:first_send_offset['end']]

        return sentence

    def get_last_sentence(self, text):
        sent_token = sent_tokenize(text)
        if len(sent_token) == 0:
            sentence = text
        else:
            last_sent_token = sent_token[len(sent_token)-1]
            last_send_token_idx = text.find(last_sent_token)
            last_send_offset = {'start': last_send_token_idx, 'end': last_send_token_idx + len(last_sent_token)}
            sentence = text[last_send_offset['start']:]

        return sentence