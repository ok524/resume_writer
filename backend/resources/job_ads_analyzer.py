from flask import Flask, request, jsonify
from flask_restful import Resource
from models.job_ads_highlighter import JobAdsHighlighter
from models.job_ads_crawler import JobAdsCrawler


class JobAdsAnalyzer(Resource):
    def get(self):
        url = request.args.get('url')
        job_ads_summary = JobAdsCrawler(url).extract_summary()
        job_ads_highlight=JobAdsHighlighter(job_ads_summary, 'data/structured_skills.json').extract_summary()
        return {
            'summary': job_ads_summary,
            'requirements': job_ads_highlight
        }
