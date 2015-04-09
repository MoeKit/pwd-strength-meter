# Demo

---

## Normal usage
<link rel="stylesheet" href="/src/psm.css">
````javascript
var PSM = require('index');
var meter = new PSM({
    target:'#password'
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

## Add rule 
<link rel="stylesheet" href="/src/psm.css">
````javascript
var PSM = require('index');
var options = {
    target:'#password_addRule',
    ruleScores:{
        wordNotSequence:5
    }
}
var meter = new PSM({
    
})
````

<form>
        <fieldset>
            <legend>Please type in your password</legend>
            User: <input type="text" id="username" /><br />
            Pass: <input type="password" id="password_addRule" />
            <div id="messages"></div>
        </fieldset>
</form>
