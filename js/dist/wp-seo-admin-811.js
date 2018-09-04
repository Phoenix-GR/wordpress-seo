yoastWebpackJsonp([13],{

/***/ 2558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(42);\n\nvar _a11ySpeak = __webpack_require__(471);\n\nvar _a11ySpeak2 = _interopRequireDefault(_a11ySpeak);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* global wpseoAdminGlobalL10n, ajaxurl, wpseoSelect2Locale */\n\n(function () {\n\t\"use strict\";\n\n\t/**\n  * Detects the wrong use of variables in title and description templates\n  *\n  * @param {element} e The element to verify.\n  *\n  * @returns {void}\n  */\n\n\tfunction wpseoDetectWrongVariables(e) {\n\t\tvar warn = false;\n\t\tvar errorId = \"\";\n\t\tvar wrongVariables = [];\n\t\tvar authorVariables = [\"userid\", \"name\", \"user_description\"];\n\t\tvar dateVariables = [\"date\"];\n\t\tvar postVariables = [\"title\", \"parent_title\", \"excerpt\", \"excerpt_only\", \"caption\", \"focuskw\", \"pt_single\", \"pt_plural\", \"modified\", \"id\"];\n\t\tvar specialVariables = [\"term404\", \"searchphrase\"];\n\t\tvar taxonomyVariables = [\"term_title\", \"term_description\"];\n\t\tvar taxonomyPostVariables = [\"category\", \"category_description\", \"tag\", \"tag_description\"];\n\t\tif (e.hasClass(\"posttype-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(specialVariables, taxonomyVariables);\n\t\t} else if (e.hasClass(\"homepage-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"taxonomy-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, specialVariables);\n\t\t} else if (e.hasClass(\"author-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(postVariables, dateVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"date-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, postVariables, specialVariables, taxonomyVariables, taxonomyPostVariables);\n\t\t} else if (e.hasClass(\"search-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, taxonomyVariables, taxonomyPostVariables, [\"term404\"]);\n\t\t} else if (e.hasClass(\"error404-template\")) {\n\t\t\twrongVariables = wrongVariables.concat(authorVariables, dateVariables, postVariables, taxonomyVariables, taxonomyPostVariables, [\"searchphrase\"]);\n\t\t}\n\t\tjQuery.each(wrongVariables, function (index, variable) {\n\t\t\terrorId = e.attr(\"id\") + \"-\" + variable + \"-warning\";\n\t\t\tif (e.val().search(\"%%\" + variable + \"%%\") !== -1) {\n\t\t\t\te.addClass(\"wpseo-variable-warning-element\");\n\t\t\t\tvar msg = wpseoAdminGlobalL10n.variable_warning.replace(\"%s\", \"%%\" + variable + \"%%\");\n\t\t\t\tif (jQuery(\"#\" + errorId).length) {\n\t\t\t\t\tjQuery(\"#\" + errorId).html(msg);\n\t\t\t\t} else {\n\t\t\t\t\te.after(' <div id=\"' + errorId + '\" class=\"wpseo-variable-warning\">' + msg + \"</div>\");\n\t\t\t\t}\n\n\t\t\t\t(0, _a11ySpeak2.default)(wpseoAdminGlobalL10n.variable_warning.replace(\"%s\", variable), \"assertive\");\n\n\t\t\t\twarn = true;\n\t\t\t} else {\n\t\t\t\tif (jQuery(\"#\" + errorId).length) {\n\t\t\t\t\tjQuery(\"#\" + errorId).remove();\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t\tif (warn === false) {\n\t\t\te.removeClass(\"wpseo-variable-warning-element\");\n\t\t}\n\t}\n\n\t/**\n  * Sets a specific WP option\n  *\n  * @param {string} option The option to update.\n  * @param {string} newval The new value for the option.\n  * @param {string} hide   The ID of the element to hide on success.\n  * @param {string} nonce  The nonce for the action.\n  *\n  * @returns {void}\n  */\n\tfunction setWPOption(option, newval, hide, nonce) {\n\t\tjQuery.post(ajaxurl, {\n\t\t\taction: \"wpseo_set_option\",\n\t\t\toption: option,\n\t\t\tnewval: newval,\n\t\t\t_wpnonce: nonce\n\t\t}, function (data) {\n\t\t\tif (data) {\n\t\t\t\tjQuery(\"#\" + hide).hide();\n\t\t\t}\n\t\t});\n\t}\n\n\t/**\n  * Copies the meta description for the homepage.\n  *\n  * @returns {void}\n  */\n\tfunction wpseoCopyHomeMeta() {\n\t\tjQuery(\"#copy-home-meta-description\").on(\"click\", function () {\n\t\t\tjQuery(\"#og_frontpage_desc\").val(jQuery(\"#meta_description\").val());\n\t\t});\n\t}\n\n\t/**\n  * Makes sure we store the action hash so we can return to the right hash\n  *\n  * @returns {void}\n  */\n\tfunction wpseoSetTabHash() {\n\t\tvar conf = jQuery(\"#wpseo-conf\");\n\t\tif (conf.length) {\n\t\t\tvar currentUrl = conf.attr(\"action\").split(\"#\")[0];\n\t\t\tconf.attr(\"action\", currentUrl + window.location.hash);\n\t\t}\n\t}\n\n\t/**\n  * When the hash changes, get the base url from the action and then add the current hash\n  */\n\tjQuery(window).on(\"hashchange\", wpseoSetTabHash);\n\n\t/**\n  * Adds select2 for selected fields.\n  *\n  * @returns {void}\n  */\n\tfunction initSelect2() {\n\t\tvar select2Width = \"400px\";\n\n\t\t// Select2 for General settings: your info: company or person. Width is the same as the width for the other fields on this page.\n\t\tjQuery(\"#company_or_person\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for Twitter card meta data in Settings\n\t\tjQuery(\"#twitter_card_type\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for taxonomy breadcrumbs in Advanced\n\t\tjQuery(\"#breadcrumbs select\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\n\t\t// Select2 for profile in Search Console\n\t\tjQuery(\"#profile\").select2({\n\t\t\twidth: select2Width,\n\t\t\tlanguage: wpseoSelect2Locale\n\t\t});\n\t}\n\n\t/**\n  * Set the initial active tab in the settings pages.\n  *\n  * @returns {void}\n  */\n\tfunction setInitialActiveTab() {\n\t\tvar activeTabId = window.location.hash.replace(\"#top#\", \"\");\n\t\t/* In some cases, the second # gets replace by %23, which makes the tab\n   * switching not work unless we do this. */\n\t\tif (activeTabId.search(\"#top\") !== -1) {\n\t\t\tactiveTabId = window.location.hash.replace(\"#top%23\", \"\");\n\t\t}\n\t\t/*\n   * WordPress uses fragment identifiers for its own in-page links, e.g.\n   * `#wpbody-content` and other plugins may do that as well. Also, facebook\n   * adds a `#_=_` see PR 506. In these cases and when it's empty, default\n   * to the first tab.\n   */\n\t\tif (\"\" === activeTabId || \"#\" === activeTabId.charAt(0)) {\n\t\t\t/*\n    * Reminder: jQuery attr() gets the attribute value for only the first\n    * element in the matched set so this will always be the first tab id.\n    */\n\t\t\tactiveTabId = jQuery(\".wpseotab\").attr(\"id\");\n\t\t}\n\n\t\tjQuery(\"#\" + activeTabId).addClass(\"active\");\n\t\tjQuery(\"#\" + activeTabId + \"-tab\").addClass(\"nav-tab-active\").click();\n\t}\n\n\twindow.wpseoDetectWrongVariables = wpseoDetectWrongVariables;\n\twindow.setWPOption = setWPOption;\n\twindow.wpseoCopyHomeMeta = wpseoCopyHomeMeta;\n\t// eslint-disable-next-line\n\twindow.wpseoSetTabHash = wpseoSetTabHash;\n\n\tjQuery(document).ready(function () {\n\t\t/**\n   * When the hash changes, get the base url from the action and then add the current hash.\n   */\n\t\twpseoSetTabHash();\n\n\t\t// Toggle the Author archives section.\n\t\tjQuery(\"#disable-author input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#author-archives-titles-metas-content\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Date archives section.\n\t\tjQuery(\"#disable-date input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#date-archives-titles-metas-content\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Media section.\n\t\tjQuery(\"#disable-attachment input[type='radio']\").change(function () {\n\t\t\t// The value on is disabled, off is enabled.\n\t\t\tif (jQuery(this).is(\":checked\")) {\n\t\t\t\tjQuery(\"#media_settings\").toggle(jQuery(this).val() === \"off\");\n\t\t\t}\n\t\t}).change();\n\n\t\t// Toggle the Format-based archives section.\n\t\tjQuery(\"#disable-post_format\").change(function () {\n\t\t\tjQuery(\"#post_format-titles-metas\").toggle(jQuery(this).is(\":not(:checked)\"));\n\t\t}).change();\n\n\t\t// Toggle the Breadcrumbs section.\n\t\tjQuery(\"#breadcrumbs-enable\").change(function () {\n\t\t\tjQuery(\"#breadcrumbsinfo\").toggle(jQuery(this).is(\":checked\"));\n\t\t}).change();\n\n\t\t// Handle the settings pages tabs.\n\t\tjQuery(\"#wpseo-tabs\").find(\"a\").click(function () {\n\t\t\tjQuery(\"#wpseo-tabs\").find(\"a\").removeClass(\"nav-tab-active\");\n\t\t\tjQuery(\".wpseotab\").removeClass(\"active\");\n\n\t\t\tvar id = jQuery(this).attr(\"id\").replace(\"-tab\", \"\");\n\t\t\tvar activeTab = jQuery(\"#\" + id);\n\t\t\tactiveTab.addClass(\"active\");\n\t\t\tjQuery(this).addClass(\"nav-tab-active\");\n\t\t\tif (activeTab.hasClass(\"nosave\")) {\n\t\t\t\tjQuery(\"#submit\").hide();\n\t\t\t} else {\n\t\t\t\tjQuery(\"#submit\").show();\n\t\t\t}\n\t\t});\n\n\t\t// Handle the Company or Person select.\n\t\tjQuery(\"#company_or_person\").change(function () {\n\t\t\tvar companyOrPerson = jQuery(this).val();\n\t\t\tif (\"company\" === companyOrPerson) {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").show();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").hide();\n\t\t\t} else if (\"person\" === companyOrPerson) {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").hide();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").show();\n\t\t\t} else {\n\t\t\t\tjQuery(\"#knowledge-graph-company\").hide();\n\t\t\t\tjQuery(\"#knowledge-graph-person\").hide();\n\t\t\t}\n\t\t}).change();\n\n\t\t// Check correct variables usage in title and description templates.\n\t\tjQuery(\".template\").on(\"input\", function () {\n\t\t\twpseoDetectWrongVariables(jQuery(this));\n\t\t});\n\n\t\t// Prevent form submission when pressing Enter on the switch-toggles.\n\t\tjQuery(\".switch-yoast-seo input\").on(\"keydown\", function (event) {\n\t\t\tif (\"keydown\" === event.type && 13 === event.which) {\n\t\t\t\tevent.preventDefault();\n\t\t\t}\n\t\t});\n\n\t\t// Allow collapsing of the content types sections.\n\t\tjQuery(\"body\").on(\"click\", \"button.toggleable-container-trigger\", function (event) {\n\t\t\tvar target = jQuery(event.currentTarget);\n\t\t\tvar toggleableContainer = target.parent().siblings(\".toggleable-container\");\n\n\t\t\ttoggleableContainer.toggleClass(\"toggleable-container-hidden\");\n\t\t\ttarget.attr(\"aria-expanded\", !toggleableContainer.hasClass(\"toggleable-container-hidden\")).find(\"span\").toggleClass(\"dashicons-arrow-up-alt2 dashicons-arrow-down-alt2\");\n\t\t});\n\n\t\twpseoCopyHomeMeta();\n\t\tsetInitialActiveTab();\n\t\tinitSelect2();\n\t});\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjU1OC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9qcy9zcmMvd3Atc2VvLWFkbWluLmpzPzAzYWMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdwc2VvQWRtaW5HbG9iYWxMMTBuLCBhamF4dXJsLCB3cHNlb1NlbGVjdDJMb2NhbGUgKi9cblxuaW1wb3J0IFwiLi9oZWxwZXJzL2JhYmVsLXBvbHlmaWxsXCI7XG5pbXBvcnQgYTExeVNwZWFrIGZyb20gXCJhMTF5LXNwZWFrXCI7XG5cbiggZnVuY3Rpb24oKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdC8qKlxuXHQgKiBEZXRlY3RzIHRoZSB3cm9uZyB1c2Ugb2YgdmFyaWFibGVzIGluIHRpdGxlIGFuZCBkZXNjcmlwdGlvbiB0ZW1wbGF0ZXNcblx0ICpcblx0ICogQHBhcmFtIHtlbGVtZW50fSBlIFRoZSBlbGVtZW50IHRvIHZlcmlmeS5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb0RldGVjdFdyb25nVmFyaWFibGVzKCBlICkge1xuXHRcdHZhciB3YXJuID0gZmFsc2U7XG5cdFx0dmFyIGVycm9ySWQgPSBcIlwiO1xuXHRcdHZhciB3cm9uZ1ZhcmlhYmxlcyA9IFtdO1xuXHRcdHZhciBhdXRob3JWYXJpYWJsZXMgPSBbIFwidXNlcmlkXCIsIFwibmFtZVwiLCBcInVzZXJfZGVzY3JpcHRpb25cIiBdO1xuXHRcdHZhciBkYXRlVmFyaWFibGVzID0gWyBcImRhdGVcIiBdO1xuXHRcdHZhciBwb3N0VmFyaWFibGVzID0gWyBcInRpdGxlXCIsIFwicGFyZW50X3RpdGxlXCIsIFwiZXhjZXJwdFwiLCBcImV4Y2VycHRfb25seVwiLCBcImNhcHRpb25cIiwgXCJmb2N1c2t3XCIsIFwicHRfc2luZ2xlXCIsIFwicHRfcGx1cmFsXCIsIFwibW9kaWZpZWRcIiwgXCJpZFwiIF07XG5cdFx0dmFyIHNwZWNpYWxWYXJpYWJsZXMgPSBbIFwidGVybTQwNFwiLCBcInNlYXJjaHBocmFzZVwiIF07XG5cdFx0dmFyIHRheG9ub215VmFyaWFibGVzID0gWyBcInRlcm1fdGl0bGVcIiwgXCJ0ZXJtX2Rlc2NyaXB0aW9uXCIgXTtcblx0XHR2YXIgdGF4b25vbXlQb3N0VmFyaWFibGVzID0gWyBcImNhdGVnb3J5XCIsIFwiY2F0ZWdvcnlfZGVzY3JpcHRpb25cIiwgXCJ0YWdcIiwgXCJ0YWdfZGVzY3JpcHRpb25cIiBdO1xuXHRcdGlmICggZS5oYXNDbGFzcyggXCJwb3N0dHlwZS10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggc3BlY2lhbFZhcmlhYmxlcywgdGF4b25vbXlWYXJpYWJsZXMgKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGUuaGFzQ2xhc3MoIFwiaG9tZXBhZ2UtdGVtcGxhdGVcIiApICkge1xuXHRcdFx0d3JvbmdWYXJpYWJsZXMgPSB3cm9uZ1ZhcmlhYmxlcy5jb25jYXQoIGF1dGhvclZhcmlhYmxlcywgZGF0ZVZhcmlhYmxlcywgcG9zdFZhcmlhYmxlcywgc3BlY2lhbFZhcmlhYmxlcywgdGF4b25vbXlWYXJpYWJsZXMsIHRheG9ub215UG9zdFZhcmlhYmxlcyApO1xuXHRcdH1cblx0XHRlbHNlIGlmICggZS5oYXNDbGFzcyggXCJ0YXhvbm9teS10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggYXV0aG9yVmFyaWFibGVzLCBkYXRlVmFyaWFibGVzLCBwb3N0VmFyaWFibGVzLCBzcGVjaWFsVmFyaWFibGVzICk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCBlLmhhc0NsYXNzKCBcImF1dGhvci10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggcG9zdFZhcmlhYmxlcywgZGF0ZVZhcmlhYmxlcywgc3BlY2lhbFZhcmlhYmxlcywgdGF4b25vbXlWYXJpYWJsZXMsIHRheG9ub215UG9zdFZhcmlhYmxlcyApO1xuXHRcdH1cblx0XHRlbHNlIGlmICggZS5oYXNDbGFzcyggXCJkYXRlLXRlbXBsYXRlXCIgKSApIHtcblx0XHRcdHdyb25nVmFyaWFibGVzID0gd3JvbmdWYXJpYWJsZXMuY29uY2F0KCBhdXRob3JWYXJpYWJsZXMsIHBvc3RWYXJpYWJsZXMsIHNwZWNpYWxWYXJpYWJsZXMsIHRheG9ub215VmFyaWFibGVzLCB0YXhvbm9teVBvc3RWYXJpYWJsZXMgKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGUuaGFzQ2xhc3MoIFwic2VhcmNoLXRlbXBsYXRlXCIgKSApIHtcblx0XHRcdHdyb25nVmFyaWFibGVzID0gd3JvbmdWYXJpYWJsZXMuY29uY2F0KCBhdXRob3JWYXJpYWJsZXMsIGRhdGVWYXJpYWJsZXMsIHBvc3RWYXJpYWJsZXMsIHRheG9ub215VmFyaWFibGVzLCB0YXhvbm9teVBvc3RWYXJpYWJsZXMsIFsgXCJ0ZXJtNDA0XCIgXSApO1xuXHRcdH1cblx0XHRlbHNlIGlmICggZS5oYXNDbGFzcyggXCJlcnJvcjQwNC10ZW1wbGF0ZVwiICkgKSB7XG5cdFx0XHR3cm9uZ1ZhcmlhYmxlcyA9IHdyb25nVmFyaWFibGVzLmNvbmNhdCggYXV0aG9yVmFyaWFibGVzLCBkYXRlVmFyaWFibGVzLCBwb3N0VmFyaWFibGVzLCB0YXhvbm9teVZhcmlhYmxlcywgdGF4b25vbXlQb3N0VmFyaWFibGVzLCBbIFwic2VhcmNocGhyYXNlXCIgXSApO1xuXHRcdH1cblx0XHRqUXVlcnkuZWFjaCggd3JvbmdWYXJpYWJsZXMsIGZ1bmN0aW9uKCBpbmRleCwgdmFyaWFibGUgKSB7XG5cdFx0XHRlcnJvcklkID0gZS5hdHRyKCBcImlkXCIgKSArIFwiLVwiICsgdmFyaWFibGUgKyBcIi13YXJuaW5nXCI7XG5cdFx0XHRpZiAoIGUudmFsKCkuc2VhcmNoKCBcIiUlXCIgKyB2YXJpYWJsZSArIFwiJSVcIiApICE9PSAtMSApIHtcblx0XHRcdFx0ZS5hZGRDbGFzcyggXCJ3cHNlby12YXJpYWJsZS13YXJuaW5nLWVsZW1lbnRcIiApO1xuXHRcdFx0XHR2YXIgbXNnID0gd3BzZW9BZG1pbkdsb2JhbEwxMG4udmFyaWFibGVfd2FybmluZy5yZXBsYWNlKCBcIiVzXCIsIFwiJSVcIiArIHZhcmlhYmxlICsgXCIlJVwiICk7XG5cdFx0XHRcdGlmICggalF1ZXJ5KCBcIiNcIiArIGVycm9ySWQgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCBcIiNcIiArIGVycm9ySWQgKS5odG1sKCBtc2cgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRlLmFmdGVyKCAnIDxkaXYgaWQ9XCInICsgZXJyb3JJZCArICdcIiBjbGFzcz1cIndwc2VvLXZhcmlhYmxlLXdhcm5pbmdcIj4nICsgbXNnICsgXCI8L2Rpdj5cIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YTExeVNwZWFrKCB3cHNlb0FkbWluR2xvYmFsTDEwbi52YXJpYWJsZV93YXJuaW5nLnJlcGxhY2UoIFwiJXNcIiwgdmFyaWFibGUgKSwgXCJhc3NlcnRpdmVcIiApO1xuXG5cdFx0XHRcdHdhcm4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5KCBcIiNcIiArIGVycm9ySWQgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0alF1ZXJ5KCBcIiNcIiArIGVycm9ySWQgKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQpO1xuXHRcdGlmICggd2FybiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRlLnJlbW92ZUNsYXNzKCBcIndwc2VvLXZhcmlhYmxlLXdhcm5pbmctZWxlbWVudFwiICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYSBzcGVjaWZpYyBXUCBvcHRpb25cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbiBUaGUgb3B0aW9uIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IG5ld3ZhbCBUaGUgbmV3IHZhbHVlIGZvciB0aGUgb3B0aW9uLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaGlkZSAgIFRoZSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlIG9uIHN1Y2Nlc3MuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBub25jZSAgVGhlIG5vbmNlIGZvciB0aGUgYWN0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHNldFdQT3B0aW9uKCBvcHRpb24sIG5ld3ZhbCwgaGlkZSwgbm9uY2UgKSB7XG5cdFx0alF1ZXJ5LnBvc3QoIGFqYXh1cmwsIHtcblx0XHRcdGFjdGlvbjogXCJ3cHNlb19zZXRfb3B0aW9uXCIsXG5cdFx0XHRvcHRpb246IG9wdGlvbixcblx0XHRcdG5ld3ZhbDogbmV3dmFsLFxuXHRcdFx0X3dwbm9uY2U6IG5vbmNlLFxuXHRcdH0sIGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdFx0aWYgKCBkYXRhICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI1wiICsgaGlkZSApLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb3BpZXMgdGhlIG1ldGEgZGVzY3JpcHRpb24gZm9yIHRoZSBob21lcGFnZS5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiB3cHNlb0NvcHlIb21lTWV0YSgpIHtcblx0XHRqUXVlcnkoIFwiI2NvcHktaG9tZS1tZXRhLWRlc2NyaXB0aW9uXCIgKS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggXCIjb2dfZnJvbnRwYWdlX2Rlc2NcIiApLnZhbCggalF1ZXJ5KCBcIiNtZXRhX2Rlc2NyaXB0aW9uXCIgKS52YWwoKSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYWtlcyBzdXJlIHdlIHN0b3JlIHRoZSBhY3Rpb24gaGFzaCBzbyB3ZSBjYW4gcmV0dXJuIHRvIHRoZSByaWdodCBoYXNoXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gd3BzZW9TZXRUYWJIYXNoKCkge1xuXHRcdHZhciBjb25mID0galF1ZXJ5KCBcIiN3cHNlby1jb25mXCIgKTtcblx0XHRpZiAoIGNvbmYubGVuZ3RoICkge1xuXHRcdFx0dmFyIGN1cnJlbnRVcmwgPSBjb25mLmF0dHIoIFwiYWN0aW9uXCIgKS5zcGxpdCggXCIjXCIgKVsgMCBdO1xuXHRcdFx0Y29uZi5hdHRyKCBcImFjdGlvblwiLCBjdXJyZW50VXJsICsgd2luZG93LmxvY2F0aW9uLmhhc2ggKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogV2hlbiB0aGUgaGFzaCBjaGFuZ2VzLCBnZXQgdGhlIGJhc2UgdXJsIGZyb20gdGhlIGFjdGlvbiBhbmQgdGhlbiBhZGQgdGhlIGN1cnJlbnQgaGFzaFxuXHQgKi9cblx0alF1ZXJ5KCB3aW5kb3cgKS5vbiggXCJoYXNoY2hhbmdlXCIsIHdwc2VvU2V0VGFiSGFzaCApO1xuXG5cdC8qKlxuXHQgKiBBZGRzIHNlbGVjdDIgZm9yIHNlbGVjdGVkIGZpZWxkcy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBpbml0U2VsZWN0MigpIHtcblx0XHR2YXIgc2VsZWN0MldpZHRoID0gXCI0MDBweFwiO1xuXG5cdFx0Ly8gU2VsZWN0MiBmb3IgR2VuZXJhbCBzZXR0aW5nczogeW91ciBpbmZvOiBjb21wYW55IG9yIHBlcnNvbi4gV2lkdGggaXMgdGhlIHNhbWUgYXMgdGhlIHdpZHRoIGZvciB0aGUgb3RoZXIgZmllbGRzIG9uIHRoaXMgcGFnZS5cblx0XHRqUXVlcnkoIFwiI2NvbXBhbnlfb3JfcGVyc29uXCIgKS5zZWxlY3QyKCB7XG5cdFx0XHR3aWR0aDogc2VsZWN0MldpZHRoLFxuXHRcdFx0bGFuZ3VhZ2U6IHdwc2VvU2VsZWN0MkxvY2FsZSxcblx0XHR9ICk7XG5cblx0XHQvLyBTZWxlY3QyIGZvciBUd2l0dGVyIGNhcmQgbWV0YSBkYXRhIGluIFNldHRpbmdzXG5cdFx0alF1ZXJ5KCBcIiN0d2l0dGVyX2NhcmRfdHlwZVwiICkuc2VsZWN0Migge1xuXHRcdFx0d2lkdGg6IHNlbGVjdDJXaWR0aCxcblx0XHRcdGxhbmd1YWdlOiB3cHNlb1NlbGVjdDJMb2NhbGUsXG5cdFx0fSApO1xuXG5cdFx0Ly8gU2VsZWN0MiBmb3IgdGF4b25vbXkgYnJlYWRjcnVtYnMgaW4gQWR2YW5jZWRcblx0XHRqUXVlcnkoIFwiI2JyZWFkY3J1bWJzIHNlbGVjdFwiICkuc2VsZWN0Migge1xuXHRcdFx0d2lkdGg6IHNlbGVjdDJXaWR0aCxcblx0XHRcdGxhbmd1YWdlOiB3cHNlb1NlbGVjdDJMb2NhbGUsXG5cdFx0fSApO1xuXG5cdFx0Ly8gU2VsZWN0MiBmb3IgcHJvZmlsZSBpbiBTZWFyY2ggQ29uc29sZVxuXHRcdGpRdWVyeSggXCIjcHJvZmlsZVwiICkuc2VsZWN0Migge1xuXHRcdFx0d2lkdGg6IHNlbGVjdDJXaWR0aCxcblx0XHRcdGxhbmd1YWdlOiB3cHNlb1NlbGVjdDJMb2NhbGUsXG5cdFx0fSApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgaW5pdGlhbCBhY3RpdmUgdGFiIGluIHRoZSBzZXR0aW5ncyBwYWdlcy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRJbml0aWFsQWN0aXZlVGFiKCkge1xuXHRcdHZhciBhY3RpdmVUYWJJZCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoIFwiI3RvcCNcIiwgXCJcIiApO1xuXHRcdC8qIEluIHNvbWUgY2FzZXMsIHRoZSBzZWNvbmQgIyBnZXRzIHJlcGxhY2UgYnkgJTIzLCB3aGljaCBtYWtlcyB0aGUgdGFiXG5cdFx0ICogc3dpdGNoaW5nIG5vdCB3b3JrIHVubGVzcyB3ZSBkbyB0aGlzLiAqL1xuXHRcdGlmICggYWN0aXZlVGFiSWQuc2VhcmNoKCBcIiN0b3BcIiApICE9PSAtMSApIHtcblx0XHRcdGFjdGl2ZVRhYklkID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSggXCIjdG9wJTIzXCIsIFwiXCIgKTtcblx0XHR9XG5cdFx0Lypcblx0XHQgKiBXb3JkUHJlc3MgdXNlcyBmcmFnbWVudCBpZGVudGlmaWVycyBmb3IgaXRzIG93biBpbi1wYWdlIGxpbmtzLCBlLmcuXG5cdFx0ICogYCN3cGJvZHktY29udGVudGAgYW5kIG90aGVyIHBsdWdpbnMgbWF5IGRvIHRoYXQgYXMgd2VsbC4gQWxzbywgZmFjZWJvb2tcblx0XHQgKiBhZGRzIGEgYCNfPV9gIHNlZSBQUiA1MDYuIEluIHRoZXNlIGNhc2VzIGFuZCB3aGVuIGl0J3MgZW1wdHksIGRlZmF1bHRcblx0XHQgKiB0byB0aGUgZmlyc3QgdGFiLlxuXHRcdCAqL1xuXHRcdGlmICggXCJcIiA9PT0gYWN0aXZlVGFiSWQgfHwgXCIjXCIgPT09IGFjdGl2ZVRhYklkLmNoYXJBdCggMCApICkge1xuXHRcdFx0Lypcblx0XHRcdCAqIFJlbWluZGVyOiBqUXVlcnkgYXR0cigpIGdldHMgdGhlIGF0dHJpYnV0ZSB2YWx1ZSBmb3Igb25seSB0aGUgZmlyc3Rcblx0XHRcdCAqIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0IHNvIHRoaXMgd2lsbCBhbHdheXMgYmUgdGhlIGZpcnN0IHRhYiBpZC5cblx0XHRcdCAqL1xuXHRcdFx0YWN0aXZlVGFiSWQgPSBqUXVlcnkoIFwiLndwc2VvdGFiXCIgKS5hdHRyKCBcImlkXCIgKTtcblx0XHR9XG5cblx0XHRqUXVlcnkoIFwiI1wiICsgYWN0aXZlVGFiSWQgKS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXHRcdGpRdWVyeSggXCIjXCIgKyBhY3RpdmVUYWJJZCArIFwiLXRhYlwiICkuYWRkQ2xhc3MoIFwibmF2LXRhYi1hY3RpdmVcIiApLmNsaWNrKCk7XG5cdH1cblxuXHR3aW5kb3cud3BzZW9EZXRlY3RXcm9uZ1ZhcmlhYmxlcyA9IHdwc2VvRGV0ZWN0V3JvbmdWYXJpYWJsZXM7XG5cdHdpbmRvdy5zZXRXUE9wdGlvbiA9IHNldFdQT3B0aW9uO1xuXHR3aW5kb3cud3BzZW9Db3B5SG9tZU1ldGEgPSB3cHNlb0NvcHlIb21lTWV0YTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cdHdpbmRvdy53cHNlb1NldFRhYkhhc2ggPSB3cHNlb1NldFRhYkhhc2g7XG5cblx0alF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcblx0XHQvKipcblx0XHQgKiBXaGVuIHRoZSBoYXNoIGNoYW5nZXMsIGdldCB0aGUgYmFzZSB1cmwgZnJvbSB0aGUgYWN0aW9uIGFuZCB0aGVuIGFkZCB0aGUgY3VycmVudCBoYXNoLlxuXHRcdCAqL1xuXHRcdHdwc2VvU2V0VGFiSGFzaCgpO1xuXG5cdFx0Ly8gVG9nZ2xlIHRoZSBBdXRob3IgYXJjaGl2ZXMgc2VjdGlvbi5cblx0XHRqUXVlcnkoIFwiI2Rpc2FibGUtYXV0aG9yIGlucHV0W3R5cGU9J3JhZGlvJ11cIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBUaGUgdmFsdWUgb24gaXMgZGlzYWJsZWQsIG9mZiBpcyBlbmFibGVkLlxuXHRcdFx0aWYgKCBqUXVlcnkoIHRoaXMgKS5pcyggXCI6Y2hlY2tlZFwiICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggXCIjYXV0aG9yLWFyY2hpdmVzLXRpdGxlcy1tZXRhcy1jb250ZW50XCIgKS50b2dnbGUoIGpRdWVyeSggdGhpcyApLnZhbCgpID09PSBcIm9mZlwiICk7XG5cdFx0XHR9XG5cdFx0fSApLmNoYW5nZSgpO1xuXG5cdFx0Ly8gVG9nZ2xlIHRoZSBEYXRlIGFyY2hpdmVzIHNlY3Rpb24uXG5cdFx0alF1ZXJ5KCBcIiNkaXNhYmxlLWRhdGUgaW5wdXRbdHlwZT0ncmFkaW8nXVwiICkuY2hhbmdlKCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFRoZSB2YWx1ZSBvbiBpcyBkaXNhYmxlZCwgb2ZmIGlzIGVuYWJsZWQuXG5cdFx0XHRpZiAoIGpRdWVyeSggdGhpcyApLmlzKCBcIjpjaGVja2VkXCIgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCBcIiNkYXRlLWFyY2hpdmVzLXRpdGxlcy1tZXRhcy1jb250ZW50XCIgKS50b2dnbGUoIGpRdWVyeSggdGhpcyApLnZhbCgpID09PSBcIm9mZlwiICk7XG5cdFx0XHR9XG5cdFx0fSApLmNoYW5nZSgpO1xuXG5cdFx0Ly8gVG9nZ2xlIHRoZSBNZWRpYSBzZWN0aW9uLlxuXHRcdGpRdWVyeSggXCIjZGlzYWJsZS1hdHRhY2htZW50IGlucHV0W3R5cGU9J3JhZGlvJ11cIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBUaGUgdmFsdWUgb24gaXMgZGlzYWJsZWQsIG9mZiBpcyBlbmFibGVkLlxuXHRcdFx0aWYgKCBqUXVlcnkoIHRoaXMgKS5pcyggXCI6Y2hlY2tlZFwiICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggXCIjbWVkaWFfc2V0dGluZ3NcIiApLnRvZ2dsZSggalF1ZXJ5KCB0aGlzICkudmFsKCkgPT09IFwib2ZmXCIgKTtcblx0XHRcdH1cblx0XHR9ICkuY2hhbmdlKCk7XG5cblx0XHQvLyBUb2dnbGUgdGhlIEZvcm1hdC1iYXNlZCBhcmNoaXZlcyBzZWN0aW9uLlxuXHRcdGpRdWVyeSggXCIjZGlzYWJsZS1wb3N0X2Zvcm1hdFwiICkuY2hhbmdlKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggXCIjcG9zdF9mb3JtYXQtdGl0bGVzLW1ldGFzXCIgKS50b2dnbGUoIGpRdWVyeSggdGhpcyApLmlzKCBcIjpub3QoOmNoZWNrZWQpXCIgKSApO1xuXHRcdH0gKS5jaGFuZ2UoKTtcblxuXHRcdC8vIFRvZ2dsZSB0aGUgQnJlYWRjcnVtYnMgc2VjdGlvbi5cblx0XHRqUXVlcnkoIFwiI2JyZWFkY3J1bWJzLWVuYWJsZVwiICkuY2hhbmdlKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeSggXCIjYnJlYWRjcnVtYnNpbmZvXCIgKS50b2dnbGUoIGpRdWVyeSggdGhpcyApLmlzKCBcIjpjaGVja2VkXCIgKSApO1xuXHRcdH0gKS5jaGFuZ2UoKTtcblxuXHRcdC8vIEhhbmRsZSB0aGUgc2V0dGluZ3MgcGFnZXMgdGFicy5cblx0XHRqUXVlcnkoIFwiI3dwc2VvLXRhYnNcIiApLmZpbmQoIFwiYVwiICkuY2xpY2soIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5KCBcIiN3cHNlby10YWJzXCIgKS5maW5kKCBcImFcIiApLnJlbW92ZUNsYXNzKCBcIm5hdi10YWItYWN0aXZlXCIgKTtcblx0XHRcdGpRdWVyeSggXCIud3BzZW90YWJcIiApLnJlbW92ZUNsYXNzKCBcImFjdGl2ZVwiICk7XG5cblx0XHRcdHZhciBpZCA9IGpRdWVyeSggdGhpcyApLmF0dHIoIFwiaWRcIiApLnJlcGxhY2UoIFwiLXRhYlwiLCBcIlwiICk7XG5cdFx0XHR2YXIgYWN0aXZlVGFiID0galF1ZXJ5KCBcIiNcIiArIGlkICk7XG5cdFx0XHRhY3RpdmVUYWIuYWRkQ2xhc3MoIFwiYWN0aXZlXCIgKTtcblx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCBcIm5hdi10YWItYWN0aXZlXCIgKTtcblx0XHRcdGlmICggYWN0aXZlVGFiLmhhc0NsYXNzKCBcIm5vc2F2ZVwiICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggXCIjc3VibWl0XCIgKS5oaWRlKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIFwiI3N1Ym1pdFwiICkuc2hvdygpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdC8vIEhhbmRsZSB0aGUgQ29tcGFueSBvciBQZXJzb24gc2VsZWN0LlxuXHRcdGpRdWVyeSggXCIjY29tcGFueV9vcl9wZXJzb25cIiApLmNoYW5nZSggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY29tcGFueU9yUGVyc29uID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cdFx0XHRpZiAoIFwiY29tcGFueVwiID09PSBjb21wYW55T3JQZXJzb24gKSB7XG5cdFx0XHRcdGpRdWVyeSggXCIja25vd2xlZGdlLWdyYXBoLWNvbXBhbnlcIiApLnNob3coKTtcblx0XHRcdFx0alF1ZXJ5KCBcIiNrbm93bGVkZ2UtZ3JhcGgtcGVyc29uXCIgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggXCJwZXJzb25cIiA9PT0gY29tcGFueU9yUGVyc29uICkge1xuXHRcdFx0XHRqUXVlcnkoIFwiI2tub3dsZWRnZS1ncmFwaC1jb21wYW55XCIgKS5oaWRlKCk7XG5cdFx0XHRcdGpRdWVyeSggXCIja25vd2xlZGdlLWdyYXBoLXBlcnNvblwiICkuc2hvdygpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGpRdWVyeSggXCIja25vd2xlZGdlLWdyYXBoLWNvbXBhbnlcIiApLmhpZGUoKTtcblx0XHRcdFx0alF1ZXJ5KCBcIiNrbm93bGVkZ2UtZ3JhcGgtcGVyc29uXCIgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSApLmNoYW5nZSgpO1xuXG5cdFx0Ly8gQ2hlY2sgY29ycmVjdCB2YXJpYWJsZXMgdXNhZ2UgaW4gdGl0bGUgYW5kIGRlc2NyaXB0aW9uIHRlbXBsYXRlcy5cblx0XHRqUXVlcnkoIFwiLnRlbXBsYXRlXCIgKS5vbiggXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHdwc2VvRGV0ZWN0V3JvbmdWYXJpYWJsZXMoIGpRdWVyeSggdGhpcyApICk7XG5cdFx0fSApO1xuXG5cdFx0Ly8gUHJldmVudCBmb3JtIHN1Ym1pc3Npb24gd2hlbiBwcmVzc2luZyBFbnRlciBvbiB0aGUgc3dpdGNoLXRvZ2dsZXMuXG5cdFx0alF1ZXJ5KCBcIi5zd2l0Y2gteW9hc3Qtc2VvIGlucHV0XCIgKS5vbiggXCJrZXlkb3duXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdGlmICggXCJrZXlkb3duXCIgPT09IGV2ZW50LnR5cGUgJiYgMTMgPT09IGV2ZW50LndoaWNoICkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdC8vIEFsbG93IGNvbGxhcHNpbmcgb2YgdGhlIGNvbnRlbnQgdHlwZXMgc2VjdGlvbnMuXG5cdFx0alF1ZXJ5KCBcImJvZHlcIiApLm9uKCBcImNsaWNrXCIsIFwiYnV0dG9uLnRvZ2dsZWFibGUtY29udGFpbmVyLXRyaWdnZXJcIiwgKCBldmVudCApID0+IHtcblx0XHRcdGxldCB0YXJnZXQgPSBqUXVlcnkoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKTtcblx0XHRcdGxldCB0b2dnbGVhYmxlQ29udGFpbmVyID0gdGFyZ2V0LnBhcmVudCgpLnNpYmxpbmdzKCBcIi50b2dnbGVhYmxlLWNvbnRhaW5lclwiICk7XG5cblx0XHRcdHRvZ2dsZWFibGVDb250YWluZXIudG9nZ2xlQ2xhc3MoIFwidG9nZ2xlYWJsZS1jb250YWluZXItaGlkZGVuXCIgKTtcblx0XHRcdHRhcmdldFxuXHRcdFx0XHQuYXR0ciggXCJhcmlhLWV4cGFuZGVkXCIsICEgdG9nZ2xlYWJsZUNvbnRhaW5lci5oYXNDbGFzcyggXCJ0b2dnbGVhYmxlLWNvbnRhaW5lci1oaWRkZW5cIiApIClcblx0XHRcdFx0LmZpbmQoIFwic3BhblwiICkudG9nZ2xlQ2xhc3MoIFwiZGFzaGljb25zLWFycm93LXVwLWFsdDIgZGFzaGljb25zLWFycm93LWRvd24tYWx0MlwiICk7XG5cdFx0fSApO1xuXG5cdFx0d3BzZW9Db3B5SG9tZU1ldGEoKTtcblx0XHRzZXRJbml0aWFsQWN0aXZlVGFiKCk7XG5cdFx0aW5pdFNlbGVjdDIoKTtcblx0fSApO1xufSgpICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3dwLXNlby1hZG1pbi5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFKQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2558\n");

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// The babel polyfill sets the _babelPolyfill to true. So only load it ourselves if the variable is undefined or false.\nif (typeof window._babelPolyfill === \"undefined\" || !window._babelPolyfill) {\n\t// eslint-disable-next-line global-require\n\t__webpack_require__(112);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvc3JjL2hlbHBlcnMvYmFiZWwtcG9seWZpbGwuanM/MTdiOSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgYmFiZWwgcG9seWZpbGwgc2V0cyB0aGUgX2JhYmVsUG9seWZpbGwgdG8gdHJ1ZS4gU28gb25seSBsb2FkIGl0IG91cnNlbHZlcyBpZiB0aGUgdmFyaWFibGUgaXMgdW5kZWZpbmVkIG9yIGZhbHNlLlxuaWYgKCB0eXBlb2Ygd2luZG93Ll9iYWJlbFBvbHlmaWxsID09PSBcInVuZGVmaW5lZFwiIHx8ICEgd2luZG93Ll9iYWJlbFBvbHlmaWxsICkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0cmVxdWlyZSggXCJiYWJlbC1wb2x5ZmlsbFwiICk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL2hlbHBlcnMvYmFiZWwtcG9seWZpbGwuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///42\n");

/***/ }),

/***/ 471:
/***/ (function(module, exports) {

eval("var containerPolite, containerAssertive, previousMessage = \"\";\n\n/**\n * Build the live regions markup.\n *\n * @param {String} ariaLive Optional. Value for the \"aria-live\" attribute, default \"polite\".\n *\n * @returns {Object} $container The ARIA live region jQuery object.\n */\nvar addContainer = function( ariaLive ) {\n\tariaLive = ariaLive || \"polite\";\n\n\tvar container = document.createElement( \"div\" );\n\tcontainer.id = \"a11y-speak-\" + ariaLive;\n\tcontainer.className = \"a11y-speak-region\";\n\n\tvar screenReaderTextStyle = \"clip: rect(1px, 1px, 1px, 1px); position: absolute; height: 1px; width: 1px; overflow: hidden; word-wrap: normal;\";\n\tcontainer.setAttribute( \"style\", screenReaderTextStyle );\n\n\tcontainer.setAttribute( \"aria-live\", ariaLive );\n\tcontainer.setAttribute( \"aria-relevant\", \"additions text\" );\n\tcontainer.setAttribute( \"aria-atomic\", \"true\" );\n\n\tdocument.querySelector( \"body\" ).appendChild( container );\n\treturn container;\n};\n\n/**\n * Specify a function to execute when the DOM is fully loaded.\n *\n * @param {Function} callback A function to execute after the DOM is ready.\n *\n * @returns {void}\n */\nvar domReady = function( callback ) {\n\tif ( document.readyState === \"complete\" || ( document.readyState !== \"loading\" && !document.documentElement.doScroll ) ) {\n\t\treturn callback();\n\t}\n\n\tdocument.addEventListener( \"DOMContentLoaded\", callback );\n};\n\n/**\n * Create the live regions when the DOM is fully loaded.\n */\ndomReady( function() {\n\tcontainerPolite = document.getElementById( \"a11y-speak-polite\" );\n\tcontainerAssertive = document.getElementById( \"a11y-speak-assertive\" );\n\n\tif ( containerPolite === null ) {\n\t\tcontainerPolite = addContainer( \"polite\" );\n\t}\n\tif ( containerAssertive === null ) {\n\t\tcontainerAssertive = addContainer( \"assertive\" );\n\t}\n} );\n\n/**\n * Clear the live regions.\n */\nvar clear = function() {\n\tvar regions = document.querySelectorAll( \".a11y-speak-region\" );\n\tfor ( var i = 0; i < regions.length; i++ ) {\n\t\tregions[ i ].textContent = \"\";\n\t}\n};\n\n/**\n * Update the ARIA live notification area text node.\n *\n * @param {String} message  The message to be announced by Assistive Technologies.\n * @param {String} ariaLive Optional. The politeness level for aria-live. Possible values:\n *                          polite or assertive. Default polite.\n */\nvar A11ySpeak = function( message, ariaLive ) {\n\t// Clear previous messages to allow repeated strings being read out.\n\tclear();\n\n\t/*\n\t * Strip HTML tags (if any) from the message string. Ideally, messages should\n\t * be simple strings, carefully crafted for specific use with A11ySpeak.\n\t * When re-using already existing strings this will ensure simple HTML to be\n\t * stripped out and replaced with a space. Browsers will collapse multiple\n\t * spaces natively.\n\t */\n\tmessage = message.replace( /<[^<>]+>/g, \" \" );\n\n\tif ( previousMessage === message ) {\n\t\tmessage = message + \"\\u00A0\";\n\t}\n\n\tpreviousMessage = message;\n\n\tif ( containerAssertive && \"assertive\" === ariaLive ) {\n\t\tcontainerAssertive.textContent = message;\n\t} else if ( containerPolite ) {\n\t\tcontainerPolite.textContent = message;\n\t}\n};\n\nmodule.exports = A11ySpeak;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDcxLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ExMXktc3BlYWsvYTExeS1zcGVhay5qcz84MzE0Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb250YWluZXJQb2xpdGUsIGNvbnRhaW5lckFzc2VydGl2ZSwgcHJldmlvdXNNZXNzYWdlID0gXCJcIjtcblxuLyoqXG4gKiBCdWlsZCB0aGUgbGl2ZSByZWdpb25zIG1hcmt1cC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXJpYUxpdmUgT3B0aW9uYWwuIFZhbHVlIGZvciB0aGUgXCJhcmlhLWxpdmVcIiBhdHRyaWJ1dGUsIGRlZmF1bHQgXCJwb2xpdGVcIi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAkY29udGFpbmVyIFRoZSBBUklBIGxpdmUgcmVnaW9uIGpRdWVyeSBvYmplY3QuXG4gKi9cbnZhciBhZGRDb250YWluZXIgPSBmdW5jdGlvbiggYXJpYUxpdmUgKSB7XG5cdGFyaWFMaXZlID0gYXJpYUxpdmUgfHwgXCJwb2xpdGVcIjtcblxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXHRjb250YWluZXIuaWQgPSBcImExMXktc3BlYWstXCIgKyBhcmlhTGl2ZTtcblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYTExeS1zcGVhay1yZWdpb25cIjtcblxuXHR2YXIgc2NyZWVuUmVhZGVyVGV4dFN0eWxlID0gXCJjbGlwOiByZWN0KDFweCwgMXB4LCAxcHgsIDFweCk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgaGVpZ2h0OiAxcHg7IHdpZHRoOiAxcHg7IG92ZXJmbG93OiBoaWRkZW47IHdvcmQtd3JhcDogbm9ybWFsO1wiO1xuXHRjb250YWluZXIuc2V0QXR0cmlidXRlKCBcInN0eWxlXCIsIHNjcmVlblJlYWRlclRleHRTdHlsZSApO1xuXG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoIFwiYXJpYS1saXZlXCIsIGFyaWFMaXZlICk7XG5cdGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoIFwiYXJpYS1yZWxldmFudFwiLCBcImFkZGl0aW9ucyB0ZXh0XCIgKTtcblx0Y29udGFpbmVyLnNldEF0dHJpYnV0ZSggXCJhcmlhLWF0b21pY1wiLCBcInRydWVcIiApO1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIFwiYm9keVwiICkuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXHRyZXR1cm4gY29udGFpbmVyO1xufTtcblxuLyoqXG4gKiBTcGVjaWZ5IGEgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgRE9NIGlzIHJlYWR5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG52YXIgZG9tUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8ICggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXHRcdHJldHVybiBjYWxsYmFjaygpO1xuXHR9XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgbGl2ZSByZWdpb25zIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWQuXG4gKi9cbmRvbVJlYWR5KCBmdW5jdGlvbigpIHtcblx0Y29udGFpbmVyUG9saXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIFwiYTExeS1zcGVhay1wb2xpdGVcIiApO1xuXHRjb250YWluZXJBc3NlcnRpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJhMTF5LXNwZWFrLWFzc2VydGl2ZVwiICk7XG5cblx0aWYgKCBjb250YWluZXJQb2xpdGUgPT09IG51bGwgKSB7XG5cdFx0Y29udGFpbmVyUG9saXRlID0gYWRkQ29udGFpbmVyKCBcInBvbGl0ZVwiICk7XG5cdH1cblx0aWYgKCBjb250YWluZXJBc3NlcnRpdmUgPT09IG51bGwgKSB7XG5cdFx0Y29udGFpbmVyQXNzZXJ0aXZlID0gYWRkQ29udGFpbmVyKCBcImFzc2VydGl2ZVwiICk7XG5cdH1cbn0gKTtcblxuLyoqXG4gKiBDbGVhciB0aGUgbGl2ZSByZWdpb25zLlxuICovXG52YXIgY2xlYXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIHJlZ2lvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBcIi5hMTF5LXNwZWFrLXJlZ2lvblwiICk7XG5cdGZvciAoIHZhciBpID0gMDsgaSA8IHJlZ2lvbnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0cmVnaW9uc1sgaSBdLnRleHRDb250ZW50ID0gXCJcIjtcblx0fVxufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIEFSSUEgbGl2ZSBub3RpZmljYXRpb24gYXJlYSB0ZXh0IG5vZGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgIFRoZSBtZXNzYWdlIHRvIGJlIGFubm91bmNlZCBieSBBc3Npc3RpdmUgVGVjaG5vbG9naWVzLlxuICogQHBhcmFtIHtTdHJpbmd9IGFyaWFMaXZlIE9wdGlvbmFsLiBUaGUgcG9saXRlbmVzcyBsZXZlbCBmb3IgYXJpYS1saXZlLiBQb3NzaWJsZSB2YWx1ZXM6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9saXRlIG9yIGFzc2VydGl2ZS4gRGVmYXVsdCBwb2xpdGUuXG4gKi9cbnZhciBBMTF5U3BlYWsgPSBmdW5jdGlvbiggbWVzc2FnZSwgYXJpYUxpdmUgKSB7XG5cdC8vIENsZWFyIHByZXZpb3VzIG1lc3NhZ2VzIHRvIGFsbG93IHJlcGVhdGVkIHN0cmluZ3MgYmVpbmcgcmVhZCBvdXQuXG5cdGNsZWFyKCk7XG5cblx0Lypcblx0ICogU3RyaXAgSFRNTCB0YWdzIChpZiBhbnkpIGZyb20gdGhlIG1lc3NhZ2Ugc3RyaW5nLiBJZGVhbGx5LCBtZXNzYWdlcyBzaG91bGRcblx0ICogYmUgc2ltcGxlIHN0cmluZ3MsIGNhcmVmdWxseSBjcmFmdGVkIGZvciBzcGVjaWZpYyB1c2Ugd2l0aCBBMTF5U3BlYWsuXG5cdCAqIFdoZW4gcmUtdXNpbmcgYWxyZWFkeSBleGlzdGluZyBzdHJpbmdzIHRoaXMgd2lsbCBlbnN1cmUgc2ltcGxlIEhUTUwgdG8gYmVcblx0ICogc3RyaXBwZWQgb3V0IGFuZCByZXBsYWNlZCB3aXRoIGEgc3BhY2UuIEJyb3dzZXJzIHdpbGwgY29sbGFwc2UgbXVsdGlwbGVcblx0ICogc3BhY2VzIG5hdGl2ZWx5LlxuXHQgKi9cblx0bWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSggLzxbXjw+XSs+L2csIFwiIFwiICk7XG5cblx0aWYgKCBwcmV2aW91c01lc3NhZ2UgPT09IG1lc3NhZ2UgKSB7XG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgKyBcIlxcdTAwQTBcIjtcblx0fVxuXG5cdHByZXZpb3VzTWVzc2FnZSA9IG1lc3NhZ2U7XG5cblx0aWYgKCBjb250YWluZXJBc3NlcnRpdmUgJiYgXCJhc3NlcnRpdmVcIiA9PT0gYXJpYUxpdmUgKSB7XG5cdFx0Y29udGFpbmVyQXNzZXJ0aXZlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcblx0fSBlbHNlIGlmICggY29udGFpbmVyUG9saXRlICkge1xuXHRcdGNvbnRhaW5lclBvbGl0ZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQTExeVNwZWFrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYTExeS1zcGVhay9hMTF5LXNwZWFrLmpzXG4vLyBtb2R1bGUgaWQgPSA0NzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAxMyAyMCAyMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///471\n");

/***/ })

},[2558]);