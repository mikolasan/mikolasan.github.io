
https://github.com/sematext/logagent-js/pull/277

After some old refactoring in `64f435872178ea16357e4bcad13b3a3db63f6802` the function `parseLine` became unused and still in the code, moreover `removeFields` parameter from configuration was not working. This PR returns usage of `removeFields` as it was before the refactoring.

Also fixed a bug with include/exclude parameter (hint: `log._SYSTEMD_UNIT !== log[_SYSTEMD_UNIT]`).

And also ignore messages in journald not coming from systemd services (I had audit and kernel syslog messages flooding my logs). This is a questionable change applied only to my setup, so please review it.