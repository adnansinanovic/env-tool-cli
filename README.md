# env-tool-cli
.env to json converter and vice versa.

```sh
Tool created some time ago... and it was sitting on my hard drive.
Hopefully it still works.
```

## Install
`npm install -g env-tool-cli`

## Usage
Tool is used from command line:

**Example 1 - convert json to env file**

`env-tool-cli --input='test.json' --output='test.env'`

**Example 2 - convert env to json file**

`env-tool-cli --input='test.env' --output='test.json'`

**Example 3 - convert env to json and store results to clipboard**

`env-tool-cli --input='test.env'`

**Example 4 - convert json to env and store results to clipboard**

`env-tool-cli --input='test.json'`

### Help
`env-tool-cli --help`

### Input parameters


`-i` `--input`

- If input path is provided, it must be file path.
- If input path is not provided, then input is clipboard content. 

`-o` `--output` 

- If output is provided, it must be file path.
- If output is not provided, then output is copied to clipboard.

`-c` `--clipboard`
- If true, results will be copied to clipboard.
- If output not set, then `clipboard=true`
- If output set, then `clipboard=false`

`-e` `--encoding`
- utf8 by default

`-m` `--mode` 
- chocies: [`auto`, `e2j`, `j2e`]
- `auto` by default
- `auto`: will try to determine mode automatically.
- `e2j`: convert env to json
- `j2e`: convert json to env


## Miscellaneous
- Tested with `node 6.11.4`