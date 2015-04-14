/**
 * jQuery Plugin to lay out the html5 range element
 *
 * @author wensink-ian-0901291
 * @licence Licensed under the MIT license
 */
(function ($) {
    var settings = {
        width:              "100%",
        min:                0,
        max:                100,
        step:               0,
        value:              50,
        valueDivider:       10,
        thumbColor:         "teal",
        valuePosition:      "none",
        valueBgColor:       "teal",
        valueColor:         "#fff",
        bubbleAlwaysActive: false,
        dividerColor:       "#c2c0c2",
        dividerLabels:      [],
        dividerLabelColor:  "#000000",
        labelType:          "value"
    };

    var resultStylesheet = false;
    $('head link').each(function (k, v) { // Loop through all stylesheets searching for the plugin stylesheet
        if (v.href.indexOf("jquery.rangify.css") > -1) {
            resultStylesheet = true;
            return false;
        }
    });
    if (!resultStylesheet) { // Plugin stylesheet is not found
        var link = "http://stud.cmi.hro.nl/0901291/jquery.rangify/scripts/plugins/jquery.rangify/style/jquery.rangify.css"
        console.warn("Oops! Stylesheet is not found in the <head> section! I included it for now, but a real programmer includes it himself! Link: " + link);
        $("head").append($("<link />", {
            rel: "stylesheet", 
            type: "text/css", 
            href: link
        }));
    }

    var timer;

    var methods = {
        /**
         * Initialize elements
         * @param  {object} $selector jQuery element where rangify was called upon
         */
        init: function ($selector) {
            $selector
                .addClass("rf-slider")
                .css({
                    width: settings.width
                })
                .attr("min",    settings.min)
                .attr("max",    settings.max)
                .attr("step",   settings.step)
                .attr("value",  settings.value)
                .after($("<div>", {
                    class: "rf-container"
                }))
                .appendTo($selector.next())
                // .after($("<audio>").append($("<source>", {
                    // src: "data/click.mp3", 
                    // type: "audio/mpeg"
                // })));
            $('link').each(function (k, v) { // Loop through all stylesheets searching for the plugin stylesheet
                if (v.href.indexOf("jquery.rangify.css") > -1) {
                    methods.addCssRules(k, $selector);
                }
            });
            if (settings.valueDivider > 0) { // Slider has dividers
                methods.divideSteps($selector, JSON.stringify(settings));
                $(window).on("resize", {$selector: $selector, settings: JSON.stringify(settings)}, methods.launchOnResize);
            }
            if (settings.valuePosition !== "none") { // Slider has a value display
                methods.initializeValuePosition($selector);
            }
            if (settings.bubbleAlwaysActive || settings.valuePosition === "right") { // Slider has a value display at the beginning
                $selector.trigger("mousedown");
            }
        },

        /**
         * To be launched whenever the window resizes
         * @param  {event} e Information about the event that occured
         */
        launchOnResize: function (e) {
            methods.divideSteps(e.data.$selector, e.data.settings);
            e.data.$selector.trigger("mousedown");
        },

        /**
         * divideSteps will add dividers at every set point, including a potential label
         * @param  {object} $selector jQuery element where rangify was called upon
         */
        divideSteps: function ($selector, indiSettings) {
            var indiSettings                = JSON.parse(indiSettings);
            var sliderWidth                 = $selector.width() - 20;
            var stepWidth                   = sliderWidth / (indiSettings.max - indiSettings.min) * indiSettings.valueDivider; // Convert set point to pixels
            var $stepDividerContainer       = $("<div>", {class: "rf-step-divider-container"}); // Create new jQuery element

            for (var numberOfLabels = 0; numberOfLabels * stepWidth <= sliderWidth; numberOfLabels ++) {} // Get number of labels needed
            var hasEnoughLabels             = (indiSettings.dividerLabels.length >= numberOfLabels);

            for (var i = 0; i * stepWidth <= sliderWidth; i ++) { // Loop for every divider
                if (hasEnoughLabels && indiSettings.labelType === "text") { // Slider with text labels
                    var dividerLabelText    = indiSettings.dividerLabels[i];
                    var labelClasses        = "";
                }
                else if (hasEnoughLabels && indiSettings.labelType === "class") { // Slider with different class labels
                    var dividerLabelText    = "";
                    var labelClasses        = indiSettings.dividerLabels[i];
                }
                else if (indiSettings.labelType === "class") { // Slider with the same class labels
                    var dividerLabelText    = "";
                    var labelClasses        = indiSettings.dividerLabels[0];
                }
                else if (indiSettings.labelType !== "none") { // Slider with value labels
                    var dividerLabelText    = i * indiSettings.valueDivider + indiSettings.min;
                }
                else { // Slider has no labels
                    var dividerLabelText    = "";
                    var labelClasses        = "";
                }
                $stepDividerContainer
                    .append($("<div>", {
                        class:      "rf-step-divider-inner-container"
                    }).css({
                        marginLeft: i * stepWidth
                    })
                        .append($("<span>", {
                            text:   "|", 
                            class:  "rf-step-divider"
                        }).css({
                            color:  indiSettings.dividerColor
                        }))
                        .append($("<span>", {
                            text:   dividerLabelText,
                            class:  "rf-step-divider-label " + labelClasses
                        }).css({
                            color:  indiSettings.dividerLabelColor
                        })));
            }
            $selector.parent().find(".rf-step-divider-container").remove(); // Remove previous set dividers
            $selector.parent().append($stepDividerContainer); // Append built jQuery object
        },

        /**
         * Adds rules to a given CSS-file
         * @param {number} index     Index of stylesheet to be editted
         * @param {object} $selector jQuery element where rangify was called upon
         */
        addCssRules: function (index, $selector) {
            document.styleSheets[index].addRule($selector.selector + "::-webkit-slider-thumb", "background-color: " + settings.thumbColor + ";");
        },

        /**
         * See what value display is chosen and initialize that
         * @param  {object} $selector jQuery element where rangify was called upon
         */
        initializeValuePosition: function ($selector) {
            switch (settings.valuePosition) {
                case "bubble":
                    $selector
                        .on("mousedown mousemove mouseover touchstart touchmove", {$selector: $selector, settings: JSON.stringify(settings)}, methods.setValueBubble)
                        .on("mouseout mouseup touchend", {$selector: $selector, settings: JSON.stringify(settings)}, methods.handleClickEnd);
                    break;
                case "right":
                    $selector
                        .css({
                            // width: $selector.width() - "50"
                            width: "calc(" + (100 * parseFloat($selector.css('width')) / parseFloat($selector.parent().css('width')) ) + '%' + " - 50px)"
                        })
                        .on("mousedown mousemove mouseover touchstart touchmove", {$selector: $selector, valueBgColor: settings.valueBgColor, valueColor: settings.valueColor}, methods.setValueRight);
                    methods.divideSteps($selector, JSON.stringify(settings));
                    break;
                default:
                    break;
            }
        },

        /**
         * Positions and sets the bubble in which the value is displayed
         * @param  {event} e Information about the event that occured
         */
        setValueBubble: function (e) {
            var indiSettings = JSON.parse(e.data.settings);
            if (!e.data.$selector.parent().find('.rf-value-bubble').length) { // If bubble does not exist yet, add it
                e.data.$selector.before($("<span>", {
                    class:  "rf-value-bubble rf-value"
                }))
            }
            var sliderWidth          = e.data.$selector.width() - 14;
            if (indiSettings.step > 0) { // Slider has steps
                var stepWidth        = sliderWidth / (indiSettings.max - indiSettings.min) * indiSettings.step;
                var marginLeftBubble = stepWidth * (e.data.$selector.val() / indiSettings.step);
            }
            else { // Slider does not have steps
                var marginLeftBubble = sliderWidth / ((indiSettings.max - indiSettings.min) / (e.data.$selector.val() - indiSettings.min));
            }
            e.data.$selector.parent().find('.rf-value-bubble')
                .text($(e.target).val())
                .css({
                    marginLeft: marginLeftBubble - 8,
                    background: indiSettings.valueBgColor,
                    color:      indiSettings.valueColor
                });
        },

        /**
         * Sets the value in the bubble on the right
         * @param  {event} e Information about the event that occured
         */
        setValueRight: function (e) {
            if (!e.data.$selector.parent().find('.rf-value-right').length) { // If bubble does not exist yet, add it
                e.data.$selector.after($("<span>", {
                    class:  "rf-value-right rf-value"
                }))
            }
            e.data.$selector.parent().find('.rf-value-right')
                .text($(e.target).val())
                .css({
                    background: e.data.valueBgColor,
                    color:      e.data.valueColor
                });

        },

        /**
         * Handles what to do when click is released
         * @param  {event} e Information about the event that occured
         */
        handleClickEnd: function (e) {
            // clearInterval(timer);
            // var audioElement = document.getElementsByTagName('audio');
            // timer = setInterval(function () {
            //     methods.startMetronome (audioElement);
            // }, Math.round(((60 / $(e.currentTarget).val()) * 1000) * 100000) / 100000);
            // setTimeout(function () {
            //     clearInterval(timer)
            // }, 4000);
            methods.setValueBubble(e);
            var indiSettings = JSON.parse(e.data.settings);
            if (!indiSettings.bubbleAlwaysActive && e.type === "mouseout" || e.type === "touchend") { // Removes the bubble if the bubble is not set to stay active
                e.data.$selector.parent().find('.rf-value-bubble').remove();
            }
        },

        // startMetronome: function (audioElement) {
        //     // audioElement.pause();
        //     // audioElement.currentTime = 0;
        //     audioElement[0].play();
        // }
    };

    /**
     * Actual plugin call from the outside world
     * @param options
     *            :width                Default: "100%"
     *            :min                  Default: 0
     *            :max                  Default: 100
     *            :step                 Default: 0
     *            :value                Default: 50
     *            :valueDivider         Default: 10
     *            :thumbColor           Default: "teal"
     *            :valuePosition        Default: "none"
     *            :valueBgColor         Default: "teal"
     *            :valueColor           Default: "#ffffff"
     *            :dividerColor         Default: "#c2c0c2"
     *            :bubbleAlwaysActive   Default: false
     *            :dividerLabels        Default: []
     *            :dividerLabelColor    Default: "#000000"
     *            :labelType            Default: "value"     
     * @returns {*}
     */
    $.fn.rangify = function (options) {
        if (options) { // Options are passed
            settings = $.extend(settings, options);
        }

        methods.init(this); // Init plugin with this scope (this == selector on which plugin is called on)

        return this; // Return this for jQuery chaining
    };
})(jQuery);