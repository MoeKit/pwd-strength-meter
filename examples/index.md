# Demo

---

## Normal usage
<link rel="stylesheet" href="/src/psm.css">
````javascript
var PSM = require('index');
var meter = new PSM({
    target:'#password',
    maxChar:14
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
var PSM = require('index');
var options = {
    target:'#password_errormsg',
    ruleScores:{
        wordNotSequence:5
    },
    onKeyUp: function (evt) {
        console.log(evt);
        $(evt.target).pwstrength("outputErrorList");
    }
}
var ameter = new PSM(options);
ameter.pwstrength('destroy')
````

<form>
        <fieldset>
            <legend>Please type in your password</legend>
            User: <input type="text" id="username_destroy" /><br />
            Pass: <input type="password" id="password_errormsg" />
            <div id="messages"></div>
        </fieldset>
</form>
