import os
from flashtext import KeywordProcessor
from nltk.stem.porter import *
import spacy
import json


class JobAdsHighlighter:

    def __init__(self, job_ads_summary, skills_list_file_path):
        self.nlp = spacy.load("en_core_web_sm")
        self.stemmer = PorterStemmer()
        self.job_ads_summary = job_ads_summary
        self.skills_list = self.load_structured_skills_list(skills_list_file_path)
        self.candidate_keywords = self.generate_candidate_keywords()


    @staticmethod
    def read_from_file(file_path):
        with open(file_path, 'r', encoding="utf-8") as f:
            content = f.read()

        return content

    def load_structured_skills_list(self, input_file_path):
        structured_skills_list = {}
        with open(input_file_path, 'r') as structured_skills:
            skills = json.load(structured_skills)
            for category in skills:
                for name in skills[category]:
                    formatted_name = "{}: {}".format(category, name)
                    structured_skills_list[formatted_name] = [self.stemmer.stem(s) for s in
                                                              (skills[category][name] + [name])]

        return structured_skills_list

    def generate_candidate_keywords(self):
        keywords = []

        for sentence in self.job_ads_summary.get("job_description", '').splitlines():
            doc = self.nlp(sentence)
            keywords += [re.split(" or | and | & ", chunk.text) for chunk in doc.noun_chunks]

        for skill in self.job_ads_summary.get("job_skills", []):
            doc = self.nlp(skill)
            keywords += [re.split(" or | and | & ", chunk.text) for chunk in doc.noun_chunks]

        return list(dict.fromkeys(sum(keywords, [])))

    def extract_summary(self):
        result = {}
        result['Development Languages'] = []

        keyword_processor = KeywordProcessor()
        keyword_processor.add_keywords_from_dict(self.skills_list)

        for keyword in self.candidate_keywords:
            matched_keyword = keyword_processor.extract_keywords(self.stemmer.stem(keyword))

            if not matched_keyword:
                # print('"{}" is not matched in our skill database.'.format(keyword))
                continue

            for i in range(len(matched_keyword)):
                category, name = str(matched_keyword[i]).split(": ", 1)

                if category not in result:
                    result[category] = {}

                if name not in result[category]:
                    result[category][name] = []

                result[category][name].append(keyword)

                if category == 'Tools & Technologies':
                    result['Development Languages'].append(keyword)

        return result


    @staticmethod
    def dump_json_to_file(data, output_file_path):
        with open(output_file_path, "w+") as f:
            json.dump(data, f, indent=4, sort_keys=True)
