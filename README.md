## Resume4Jobs
Resume4Jobs is a resume builder utilizing new AI and web technologies to help job seekers write a **Complete**, **Accurate** and **Customized** resume. The following is the highlighted features and capabilities in our system:
- **Complete**
  - Provide step-by-step guide to help user create a resume
  - Provide writing suggestion by resume-oriented language model
- **Accurate**
  - Provide language checking functions
- **Customized**
  - Provide job advertisement summary to help user tailor resume
  - Export resume using professional-like resume templates

## Deployment
```
$ git clone https://github.com/edwincheung37/Resume4Jobs.git
$ cd Resume4Jobs/
```
### Configure Files
Update the domain name at [client/.env](client/.env)
```
DOMAIN=<domain-name>
```
Update MongoDB connection string at [backend/config/app.conf](backend/config/app.conf)
```
#MongoDB Setting
MONGODB_SETTINGS = {
    'host': 'mongodb://root:xaUBJZbG5v{W*[{&@<server-ip>:27017/resume4Job?authSource=admin',
}
```
### Build & Run Docker Images
```
$ docker-compose build
$ docker-compose up -d
```
