---
title: BitBucket 101 - access token
subtitle: Get access token
date: 2022-07-21
published: 2022-07-22
lastModified: 2022-07-22
quality: good
---

How do I obtain an HTTP access token from to work with BitBucket through API? Here is [my answer](https://stackoverflow.com/questions/70393902/how-do-i-obtain-an-http-access-token-from-a-bitbucket-repository-on-bitbucket-cl)

## Get access token

Atlassian has vast documentation, but I have a problem with it. I had a hard time understanding how to get an access token simply to download archives from private repositories. 

Finally I did it and here's my step by step tutorial.

1. Insert your workspace name instead of `{workspace_name}` and go to the following link in order to create an **OAuth consumer**
```
https://bitbucket.org/{workspace_name}/workspace/settings/api
```
   - set callback URL to http://localhost:8976 (doesn't need to be a real server there)
   - select permissions: repository -> read
2. Use consumer's **Key** as a `{client_id}` and open the following URL in the browser
```
https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code
```
3. After you press "Grant access" in the browser it will redirect you to 
```
http://localhost:8976?code=<CODE>
```
Note: you can spin your local server to automate this step

4. Use the code from the previous step and consumer's **Key** as a `{client_id}`, and consumer's **Secret** as `{client_secret}`:
```
curl -X POST -u "{client_id}:{client_secret}" \
  https://bitbucket.org/site/oauth2/access_token \
  -d grant_type=authorization_code \
  -d code={code} \
```
5. You should receive similar json back
```
{
  "access_token": <access_token>,
  "scopes": "repository",
  "token_type": "bearer",
  "expires_in": 7200,
  "state": "authorization_code",
  "refresh_token": <refresh_token>
}
```
6. Use the access token in the following manner
```
curl https://api.bitbucket.org/2.0/repositories/{workspace_name} \
--header "Authorization: Bearer {access_token}
```

## Example

I wrote a "package manager" for myself. This script downloads archived git repositories from BitBucket. First I request access token and start a local web server where after user's authentication an authorization code will be automatically retrieved and used to get the access token. BitBucket credentials are stored in the `.env` file

```python
"""
https://support.atlassian.com/bitbucket-cloud/docs/oauth-consumer-examples/

OAuth consumer examples: Python using rauth library

pip install rauth
pip install python-dotenv
pip install fastapi
pip install "uvicorn[standard]"
"""

import argparse
import asyncio
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import json
import os
from rauth import OAuth2Service, OAuth2Session
import requests
import uvicorn

parser = argparse.ArgumentParser(description='N Package Manager')
parser.add_argument('modules', metavar='MODULES', nargs='*',
                    help='list of modules to download')

# web server
app = FastAPI()

# read .env
load_dotenv()

# globals
loop = None
stop = False
server = None
authorize_code = None
workspace = 'JumboSkill'
PACKAGE_MANAGER_CACHE = '.package_manager_cache'

# Create a new consumer at https://bitbucket.org/account/user/{username}/api
CONSUMER_KEY = os.getenv('BITBUCKET_CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('BITBUCKET_CONSUMER_SECRET')
CONSUMER_REDIRECT_URL = 'http://localhost:8967'
PORT = 8967
TEST_SESSION_URL = "https://api.bitbucket.org/2.0/repositories/{workspace}"
DOWNLOADS_URL = "https://api.bitbucket.org/2.0/repositories/{workspace}/{repo_slug}/downloads"
DOWNLOAD_MASTER_BRANCH_URL = "https://bitbucket.org/{workspace}/{repo_slug}/get/master.tar.gz"
DOWNLOAD_TAG_URL = "https://bitbucket.org/{workspace}/{repo_slug}/get/{tag}.tar.gz"


def create_service_wrapper():
    # API URLs from 
    # https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/
    # https://developer.atlassian.com/cloud/bitbucket/rest/intro/
    AUTHORIZE_URL = 'https://bitbucket.org/site/oauth2/authorize'
    ACCESS_TOKEN_URL = 'https://bitbucket.org/site/oauth2/access_token'
    BASE_URL = 'https://bitbucket.org/site/'

    # create the service wrapper
    bitbucket = OAuth2Service(
        client_id=CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        name='bitbucket',
        authorize_url=AUTHORIZE_URL,
        access_token_url=ACCESS_TOKEN_URL,
        base_url=BASE_URL,
        )
    
    return bitbucket


def read_cache(wrapper):
    access_token = None
    session = None
    if os.path.isfile(PACKAGE_MANAGER_CACHE):
        with open(PACKAGE_MANAGER_CACHE, 'r') as f:
            try:
                [access_token, refresh_token] = f.readlines()
                access_token = access_token.strip()
                refresh_token = refresh_token.strip()
            except:
                access_token = None
                return session, access_token
            
            print('Restored tokens')
            print(f'Access token: {access_token}')
            print(f'Refresh token: {refresh_token}')
            session = restore_session(wrapper, access_token)
            # test session
            test_url = TEST_SESSION_URL.replace('{workspace}', workspace)
            try:
                r = session.get(test_url)
                print(f'Restored session test status code: {r.status_code}')
                if not r.ok:
                    session = refresh_session(wrapper, refresh_token)
                    r = session.get(test_url)
                    print(f'Refreshed session test status code: {r.status_code}')
                    if not r.ok:
                        access_token = None
                        session = None
            except:
                access_token = None
                session = None
                return session, access_token
    return session, access_token


def authenticate():
    print('Visit the following link to authenticate me')
    print(f'  https://bitbucket.org/site/oauth2/authorize?client_id={CONSUMER_KEY}&response_type=code')
    print('')


def start_new_session(bitbucket):
    global authorize_code
    data = {
        'grant_type': 'authorization_code',
        'code': authorize_code,
    }
    authorize_code = None
    access_token_response = bitbucket.get_raw_access_token(data=data)
    response_data = access_token_response.json()
    access_token = response_data['access_token']
    refresh_token = response_data['refresh_token']
    print(f'Access token: {access_token}')
    print(f'Refresh token: {refresh_token}')
    print('')
    with open(PACKAGE_MANAGER_CACHE, 'w') as f:
        f.writelines([access_token, '\n', refresh_token])
    
    session = bitbucket.get_session(access_token)
    return session


def refresh_session(bitbucket, refresh_token):
    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    }
    session = bitbucket.get_auth_session(data=data, decoder=json.loads)
    return session


def restore_session(bitbucket, access_token):
    session = OAuth2Session(
        client_id=CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        access_token=access_token,
        service=bitbucket,
        )
    return session
    

@app.get("/", response_class=HTMLResponse)
async def read_root(code: str = ''):
    print(f'Received code {code}')
    global authorize_code
    authorize_code = code
    return """
    <html>
        <head>
            <title>N Package Manager</title>
        </head>
        <body>
            <h1>Access granted!</h1>
            <p>Code has been received, now you can close this window</p>
        </body>
    </html>
    """


async def check_for_code():
    while not stop:
        await asyncio.sleep(1)
        if authorize_code != None:
            break


async def start_web_server():
    config = uvicorn.Config(app, port=PORT, log_level="info")
    global server
    server = uvicorn.Server(config)
    await server.serve()


async def stop_web_server():
    if server:
        await server.shutdown()


def download_archive(session, workspace, repo_slug, tag):
    url = (DOWNLOAD_MASTER_BRANCH_URL
           .replace('{workspace}', workspace)
           .replace('{repo_slug}', repo_slug)
           .replace('{tag}', tag))
    print(f'Download URL: {url}')
    
    with session.get(url, stream=True) as r:
        r.raise_for_status()
        output_path = f'{repo_slug}-{tag}.tar.gz'
        with open(output_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192): 
                f.write(chunk)
            print('Archive saved!')
            
            
async def package_manager(modules):
    print('Welcome to N Package Manager!')
    print('')
    
    wrapper = create_service_wrapper()
    session, access_token = read_cache(wrapper)
    
    if not access_token:
        start_web_server()
        authenticate()
        await check_for_code()
        await stop_web_server()
        session = start_new_session(wrapper)
    
    for module in modules:
        print(f'Download module {module}')
        repo_slug = module
        tag = 'rev1'
        download_archive(session, workspace, repo_slug, tag)

    
if __name__ == '__main__':
    args = parser.parse_args()
    if args.modules:
        loop = asyncio.get_event_loop()
        try:
            loop.run_until_complete(package_manager(args.modules))
            loop.run_until_complete(loop.shutdown_asyncgens())
        except KeyboardInterrupt:
            print('Keyboard interrupt')
            stop = True
        finally:
            loop.close()
    else:
        print('No modules specified.')

```


## Reference

- https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/
- https://developer.atlassian.com/cloud/bitbucket/rest/intro/
- https://developer.atlassian.com/cloud/bitbucket/rest/api-group-downloads/?utm_source=%2Fbitbucket%2Fapi%2F2%2Freference%2Fresource%2Frepositories%2F%257Bworkspace%257D%2F%257Brepo_slug%257D%2Fdownloads&utm_medium=302#post
- https://bitbucket.org/neupokoev/workspace/settings/api
- https://rauth.readthedocs.io/en/latest/ (addition to requests)
- https://requests.readthedocs.io/en/latest/api/#requests.Response.content
- https://stackoverflow.com/questions/47169474/parallel-asynchronous-io-in-pythons-coroutines
- https://docs.python.org/3/library/asyncio-task.html#asyncio.run