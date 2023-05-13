---
title: BitBucket 101
subtitle: Get access token
date: 2022-07-21
published: 2022-07-22
lastModified: 2022-07-22
---

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

----

This was [my answer](https://stackoverflow.com/questions/70393902/how-do-i-obtain-an-http-access-token-from-a-bitbucket-repository-on-bitbucket-cl)


## Reference

- https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/
- https://developer.atlassian.com/cloud/bitbucket/rest/intro/
- https://developer.atlassian.com/cloud/bitbucket/rest/api-group-downloads/?utm_source=%2Fbitbucket%2Fapi%2F2%2Freference%2Fresource%2Frepositories%2F%257Bworkspace%257D%2F%257Brepo_slug%257D%2Fdownloads&utm_medium=302#post
- https://bitbucket.org/neupokoev/workspace/settings/api
- https://rauth.readthedocs.io/en/latest/ (addition to requests)
- https://requests.readthedocs.io/en/latest/api/#requests.Response.content
- https://stackoverflow.com/questions/47169474/parallel-asynchronous-io-in-pythons-coroutines
- https://docs.python.org/3/library/asyncio-task.html#asyncio.run