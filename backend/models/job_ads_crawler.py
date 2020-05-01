import html
import os
import re
import requests
import AdvancedHTMLParser


class JobAdsCrawler(object):
    def __init__(self, url):
        self._url = url

    def fetch_url_code(self):
        response = requests.get(self._url)
        charset = requests.utils.get_encodings_from_content(response.text)
        response.encoding = charset[0]
        return html.unescape(response.text)

    @staticmethod
    def format_content(content):
        content = re.sub('>\s+<', '><', content)
        content = re.sub('<p [^<]*>\s*(<[^<]+>)* +(<\/[^<]+>)*<\/p>', '', content)
        content = re.sub('<li [^<]*>\s*', '\n- ', content)
        content = re.sub('(<p [^<]*>\s*)+', '\n\n', content)
        content = re.sub('<br >|<br \/>', '\n', content)
        content = re.sub('<[^<]+?>([ \n\t]* +)*', '', content)
        content = content.strip()
        return content

    def extract_summary(self):
        parser = AdvancedHTMLParser.AdvancedHTMLParser()
        parser.parseStr(self.fetch_url_code())

        if 'ctgoodjobs.hk' not in self._url:
            return {}

        job_title = parser.getElementsByClassName('job-title')[0].innerHTML.strip()

        job_description = parser.getElementsByClassName('jd-sec job-desc')[0].innerHTML.strip()
        job_description = self.format_content(job_description)

        skill_tags = parser.getElementsByClassName('tag skill-tag-blk')
        job_skills = [tag.innerHTML.strip() for tag in skill_tags]

        return {
            'job_title': job_title,
            'job_description': job_description,
            'job_skills': job_skills
        }