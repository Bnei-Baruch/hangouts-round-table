Hangout IDs generator
=====================

1. Install cookies.txt Chrome extension from [here](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg?hl=en).
2. Visit [https://plus.google.com/hangouts/_/](https://plus.google.com/hangouts/_/) and save cookies data to `hangouts-cookies.txt` file into `backend/scripts` directory.
3. Launch the generator: 
```bash
$ ./generate_hangout_ids.sh
```
⋅⋅⋅The script will generate `backend/consts.yaml` file.
4. Restart the backend.
