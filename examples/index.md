# Demo

---

## Normal usage
<link rel="stylesheet" href="/src/psm.css">
````javascript
var PSM = require('index');
var meter = new PSM({
    target:'#password',
    maxChar:14,
    errorMessages:{
        password_to_long:"密码请勿大于14个字符",
        password_to_short: "密码太短了",
        same_as_username: "密码不能和用户名一致",
    },
    onKeyUp: {"method":"outputErrorList"}
})
````

<form>
        <fieldset>
            <legend>Please type in your password</legend>
            User: <input type="text" id="username" /><br />
            Pass: <input type="password" id="password" />
            <div id="messages"></div>
        </fieldset>
</form>

## destroy
<link rel="stylesheet" href="/src/psm.css">
````javascript
var PSM = require('index');
var options = {
    target:'#password_addRule',
    ruleScores:{
        wordNotSequence:5
    }
}
var ameter = new PSM(options);
ameter.pwstrength('destroy')
````

<form>
        <fieldset>
            <legend>Please type in your password</legend>
            User: <input type="text" id="username_destroy" /><br />
            Pass: <input type="password" id="password_destroy" />
            <div id="messages"></div>
        </fieldset>
</form>

## Error message
<link rel="stylesheet" href="/src/psm.css">
````javascript
var ermPSM = require('index');
var ermoptions = {
    target:'#password_errormsg',
    usernameField:'#username_errormsg',
    ruleScores:{
        wordNotSequence:5
    },
    onKeyUp: {"method":"outputErrorList"}
}
var erm = new ermPSM(ermoptions);
````

<form>
        <fieldset>
            <legend>Please type in your password</legend>
            User: <input type="text" id="username_errormsg" /><br />
            Pass: <input type="password" id="password_errormsg" />
            <div id="messages"></div>
        </fieldset>
</form>
