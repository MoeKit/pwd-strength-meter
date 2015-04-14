# Demo

---

<style>
input{
    margin-bottom:10px;
}
label {
  margin-bottom: 5px;
  display: block;
}
</style>

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
        password_format_simple:"密码必须至少包含字母、数字、特殊字符其中两项"
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
            <label>User: <input type="text" id="username_errormsg" /><br /></label>
            <label>Pass: <input type="password" id="password_errormsg" /></label>
            <div id="messages"></div>
        </fieldset>
</form>
