"use strict";

var $ = require('jquery');

var pwdStrengthMeter=function(options){
    this.$el = $(options.target);
    this.options = $.extend({}, defaults, options);
    this.pwstrength(this.options);
};

var defaults = {
    target:[],
    errors: [],
    // Options
    minChar: 8,
    maxChar:undefined,
    errorMessages: {
        password_to_short: "密码太短了",
        same_as_username: "密码不能和用户名一致"
    },
    scores: [17, 26, 40, 50],
    verdicts: ["很弱", "普通", "中等", "较强", "很棒"],
    showVerdicts: true,
    raisePower: 1.4,
    usernameField: "#username",
    onLoad: undefined,
    onKeyUp: undefined,
    viewports: {
        progress: undefined,
        verdict: undefined,
        errors: undefined
    },
    // Rules stuff
    ruleScores: {
        wordNotEmail: -100,
        wordLength: -100,
        wordSimilarToUsername: -100,
        wordFormatType:-100,
        wordLowercase: 1,
        wordUppercase: 3,
        wordOneNumber: 3,
        wordThreeNumbers: 5,
        wordOneSpecialChar: 3,
        wordTwoSpecialChar: 5,
        wordUpperLowerCombo: 2,
        wordLetterNumberCombo: 2,
        wordLetterNumberCharCombo: 2
    },
    rules: {
        wordNotEmail: true,
        wordLength: true,
        wordSimilarToUsername: true,
        wordFormatType:true,
        wordLowercase: true,
        wordUppercase: true,
        wordOneNumber: true,
        wordThreeNumbers: true,
        wordOneSpecialChar: true,
        wordTwoSpecialChar: true,
        wordUpperLowerCombo: true,
        wordLetterNumberCombo: true,
        wordLetterNumberCharCombo: true
    },
    validationRules: {
        wordNotEmail: function (defaults, word, score) {
            return word.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i) && score;
        },
        wordLength: function (defaults, word, score) {
            var wordlen = word.length,
                lenScore = Math.pow(wordlen, defaults.raisePower);
            if (defaults.maxChar===undefined){
                if(wordlen < defaults.minChar) {
                    lenScore = (lenScore + score);
                    defaults.errors.push(defaults.errorMessages.password_to_short);
                }
            }else{
                if(wordlen>defaults.maxChar){
                    defaults.errors.push(defaults.errorMessages.password_to_short);
                }
                if(wordlen < defaults.minChar) {
                    lenScore = (lenScore + score);
                    defaults.errors.push(defaults.errorMessages.password_to_short);
                }
            }

            return lenScore;
        },
        wordSimilarToUsername: function (defaults, word, score) {
            var username = $(defaults.usernameField).val();
            if (username && word.toLowerCase().match(username.toLowerCase())) {
                defaults.errors.push(defaults.errorMessages.same_as_username);
                return score;
            }

            return true;
        },
        wordFormatType: function (defaults,word,score) {
            return (
                !(word.match(/([a-zA-Z])/) && word.match(/([0-9])/))
                &&
                !(word.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && word.match(/([0-9])/))
                &&
                !(word.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && word.match(/([a-zA-Z])/))
                )&& score;
        },
        wordNotSequence: function (defaults,word,score) {/*@todo:*/
            return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
        },
        wordLowercase: function (defaults, word, score) {
            return word.match(/[a-z]/) && score;
        },
        wordUppercase: function (defaults, word, score) {
            return word.match(/[A-Z]/) && score;
        },
        wordOneNumber: function (defaults, word, score) {
            return word.match(/\d+/) && score;
        },
        wordThreeNumbers: function (defaults, word, score) {
            return word.match(/(.*[0-9].*[0-9].*[0-9])/) && score;
        },
        wordOneSpecialChar: function (defaults, word, score) {
            return word.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/) && score;
        },
        wordTwoSpecialChar: function (defaults, word, score) {
            return word.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && score;
        },
        wordUpperLowerCombo: function (defaults, word, score) {
            return word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && score;
        },
        wordLetterNumberCombo: function (defaults, word, score) {
            return word.match(/([a-zA-Z])/) && word.match(/([0-9])/) && score;
        },
        wordLetterNumberCharCombo: function (defaults, word, score) {
            return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
        }
    },
    state:false
};

pwdStrengthMeter.prototype.setProgressBar = function ($el, score) {
    var defaults = $el.data("pwstrength"),
        progressbar = defaults.progressbar,
        $verdict;

    if (defaults.showVerdicts) {
        if (defaults.viewports.verdict) {
            $verdict = $(defaults.viewports.verdict).find(".password-verdict");
        } else {
            $verdict = $el.parent().find(".password-verdict");
            if ($verdict.length === 0) {
                $verdict = $('<span class="password-verdict"></span>');
                $verdict.insertAfter($el);
            }
        }
    }

    if (score < defaults.scores[0]) {
        progressbar.addClass("progress-bar-danger").removeClass("progress-bar-warning").removeClass("progress-bar-success");
        progressbar.find(".progress-bar").css("width", "5%");
        if (defaults.showVerdicts) {
            $verdict.text(defaults.verdicts[0]);
        }
    } else if (score >= defaults.scores[0] && score < defaults.scores[1]) {
        progressbar.addClass("progress-bar-danger").removeClass("progress-bar-warning").removeClass("progress-bar-success");
        progressbar.find(".progress-bar").css("width", "25%");
        if (defaults.showVerdicts) {
            $verdict.text(defaults.verdicts[1]);
        }
    } else if (score >= defaults.scores[1] && score < defaults.scores[2]) {
        progressbar.addClass("progress-bar-warning").removeClass("progress-bar-danger").removeClass("progress-bar-success");
        progressbar.find(".progress-bar").css("width", "50%");
        if (defaults.showVerdicts) {
            $verdict.text(defaults.verdicts[2]);
        }
    } else if (score >= defaults.scores[2] && score < defaults.scores[3]) {
        progressbar.addClass("progress-bar-warning").removeClass("progress-bar-danger").removeClass("progress-bar-success");
        progressbar.find(".progress-bar").css("width", "75%");
        if (defaults.showVerdicts) {
            $verdict.text(defaults.verdicts[3]);
        }
    } else if (score >= defaults.scores[3]) {
        progressbar.addClass("progress-bar-success").removeClass("progress-bar-warning").removeClass("progress-bar-danger");
        progressbar.find(".progress-bar").css("width", "100%");
        if (defaults.showVerdicts) {
            $verdict.text(defaults.verdicts[4]);
        }
    }
};

pwdStrengthMeter.prototype.calculateScore = function ($el) {
        var self = this,
            word = $el.val(),
            totalScore = 0,
            defaults = $el.data("pwstrength");

        $.each(defaults.rules, function (rule, active) {
            if (active === true) {
                var score = defaults.ruleScores[rule],
                    result = defaults.validationRules[rule](defaults, word, score);
                if (result) {
                    totalScore += result;
                }
            }
        });
        self.setProgressBar($el, totalScore);

        return totalScore;
    };

pwdStrengthMeter.prototype.progressWidget = function () {
        return '<div class="progress"><div class="progress-bar"></div></div>';
    };

pwdStrengthMeter.prototype.methods = {
    init: function (settings) {
        var self = this,
            allOptions = $.extend(defaults, settings);
        return $(self.options.target).each(function (idx, el) {
            var $el = $(el),
                $progressbar,
                verdict;

            $el.data("pwstrength", allOptions);
            console.log('init data ', $el.data("pwstrength"));
            $el.on("keyup", function (event) {
                var defaults = $el.data("pwstrength");
                defaults.errors = [];
                self.calculateScore.call(self, $el);
                if ($.isFunction(defaults.onKeyUp)) {
                    defaults.onKeyUp(event);
                }
            });

            $progressbar = $(self.progressWidget());

            if (allOptions.viewports.progress) {
                $(allOptions.viewports.progress).append($progressbar);
            } else {
                $progressbar.insertAfter($el);
            }
            $progressbar.find(".progress-bar").css("width", "0%");
            $el.data("pwstrength").progressbar = $progressbar;

            if (allOptions.showVerdicts) {
                verdict = $('<span class="password-verdict">' + allOptions.verdicts[0] + '</span>');
                if (allOptions.viewports.verdict) {
                    $(allOptions.viewports.verdict).append(verdict);
                } else {
                    verdict.insertAfter($el);
                }
            }

            if ($.isFunction(allOptions.onLoad)) {
                allOptions.onLoad();
            }
        });
    },

    destroy: function () {
        $(this.$el).each(function (idx, el) {
            var $el = $(el);
            $el.parent().find("span.password-verdict").remove();
            $el.parent().find("div.progress").remove();
            $el.parent().find("ul.error-list").remove();
            $el.removeData("pwstrength");
        });
    },

    forceUpdate: function () {
        var self = this;
        this.each(function (idx, el) {
            var $el = $(el),
                defaults = $el.data("pwstrength");
            defaults.errors = [];
            self.calculateScore.call(self, $el);
        });
    },

    outputErrorList: function () {
        var self = this;
        console.log('oel this',this);
        $(this.$el).each(function (idx, el) {

            console.log('output erlist el',el);
            var output = '<ul class="error-list">',
                $el = $(el),
                errors = $el.data("pwstrength").errors,
                viewports = $el.data("pwstrength").viewports,
                verdict;
            $el.parent().find("ul.error-list").remove();

            if (errors.length > 0) {
                $.each(errors, function (i, item) {
                    output += '<li>' + item + '</li>';
                });
                output += '</ul>';
                if (viewports.errors) {
                    $(viewports.errors).html(output);
                } else {
                    output = $(output);
                    verdict = $el.parent().find("span.password-verdict");
                    if (verdict.length > 0) {
                        el = verdict;
                    }
                    output.insertAfter(el);
                }
            }
        });
    },

    addRule: function (name, method, score, active) {
        this.each(function (idx, el) {
            var defaults = $(el).data("pwstrength");
            defaults.rules[name] = active;
            defaults.ruleScores[name] = score;
            defaults.validationRules[name] = method;
        });
    },

    changeScore: function (rule, score) {
        this.each(function (idx, el) {
            $(el).data("pwstrength").ruleScores[rule] = score;
        });
    },

    ruleActive: function (rule, active) {
        this.each(function (idx, el) {
            $(el).data("pwstrength").rules[rule] = active;
        });
    }
};

pwdStrengthMeter.prototype.pwstrength = function (method) {
    var result;
    if (this.methods[method]) {
        result = this.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
        result = this.methods.init.apply(this, arguments);
    } else {
        $.error("Method " + method + " does not exist on pwstrength");
    }
    return result;
};

module.exports = pwdStrengthMeter;