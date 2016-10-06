(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* browser:true */
/* global tb_show, wpseoSelect2Locale */
(function ($) {
	"use strict";

	window.wpseo_init_tabs = function () {
		if (jQuery(".wpseo-metabox-tabs-div").length > 0) {
			jQuery(".wpseo-metabox-tabs").on("click", "a.wpseo_tablink", function (ev) {
				ev.preventDefault();

				jQuery(".wpseo-meta-section.active .wpseo-metabox-tabs li").removeClass("active");
				jQuery(".wpseo-meta-section.active .wpseotab").removeClass("active");

				// Hide the Yoast tooltip when the element gets clicked.
				jQuery(this).addClass("yoast-tooltip-hidden");

				var targetElem = jQuery(jQuery(this).attr("href"));
				targetElem.addClass("active");
				jQuery(this).parent("li").addClass("active");

				if (jQuery(this).hasClass("scroll")) {
					jQuery("html, body").animate({
						scrollTop: jQuery(targetElem).offset().top
					}, 500);
				}
			}).on("mouseleave", "a.wpseo_tablink", function () {
				// The element can still have focus, ensure to hide the tooltip.
				jQuery(this).addClass("yoast-tooltip-hidden");
			}).on("blur mouseenter", "a.wpseo_tablink", function () {
				// Make the element tooltip-able again.
				jQuery(this).removeClass("yoast-tooltip-hidden");
			});
		};

		if (jQuery(".wpseo-meta-section").length > 0) {
			jQuery("#wpseo-meta-section-content").addClass("active");
			jQuery(".wpseo-metabox-sidebar li").filter(function () {
				return jQuery(this).find(".wpseo-meta-section-link").attr("href") === "#wpseo-meta-section-content";
			}).addClass("active");

			jQuery("a.wpseo-meta-section-link").on("click", function (ev) {
				ev.preventDefault();

				jQuery(".wpseo-metabox-sidebar li").removeClass("active");
				jQuery(".wpseo-meta-section").removeClass("active");

				// Hide the Yoast tooltip when the element gets clicked.
				jQuery(this).addClass("yoast-tooltip-hidden");

				var targetElem = jQuery(jQuery(this).attr("href"));
				targetElem.addClass("active");

				jQuery(this).parent("li").addClass("active");
			}).on("mouseleave", function () {
				// The element can still have focus, ensure to hide the tooltip.
				jQuery(this).addClass("yoast-tooltip-hidden");
			}).on("blur mouseenter", function () {
				// Make the element tooltip-able again.
				jQuery(this).removeClass("yoast-tooltip-hidden");
			});
		};

		jQuery(".wpseo-heading").hide();
		jQuery(".wpseo-metabox-tabs").show();
		// End Tabs code.
	};

	/**
  * Adds select2 for selected fields.
  */
	function initSelect2() {
		// Select2 for Yoast SEO Metabox Advanced tab
		$("#yoast_wpseo_meta-robots-noindex").select2({ width: "100%", language: wpseoSelect2Locale });
		$("#yoast_wpseo_meta-robots-adv").select2({ width: "100%", language: wpseoSelect2Locale });
	}

	/**
  * Shows a informational popup if someone click the add keyword button
  */
	function addKeywordPopup() {
		var $buyButton = $("#wpseo-add-keyword-popup-button"),
		    title = $buyButton.text(),
		    $popupWindow,
		    $closeButton;

		tb_show(title, "#TB_inline?width=650&height=350&inlineId=wpseo-add-keyword-popup", "group");

		// The thicbox popup UI is now available.
		$popupWindow = $("#TB_window");
		$closeButton = $("#TB_closeWindowButton");

		// The container window isn't the correct size, rectify this and also the centering.
		$popupWindow.css({ width: 680, height: 235, "margin-left": -340 });

		// Accessibility improvements.
		$popupWindow.attr({
			role: "dialog",
			"aria-labelledby": "TB_ajaxWindowTitle",
			"aria-describedby": "TB_ajaxContent"
		}).on("keydown", function (event) {
			var id;

			// Constrain tabbing within the modal.
			if (9 === event.which) {
				id = event.target.id;

				if (id === "wpseo-add-keyword-popup-button" && !event.shiftKey) {
					$closeButton.focus();
					event.preventDefault();
				} else if (id === "TB_closeWindowButton" && event.shiftKey) {
					$buyButton.focus();
					event.preventDefault();
				}
			}
		});

		// Move focus back to the element that opened the modal.
		$("body").on("thickbox:removed", function () {
			$(".wpseo-add-keyword").focus();
		});
	}

	/**
  * Adds keyword popup if the template for it is found
  */
	function initAddKeywordPopup() {
		// If add keyword popup exists bind it to the add keyword button
		if (1 === $("#wpseo-add-keyword-popup").length) {
			$(".wpseo-add-keyword").on("click", addKeywordPopup);
		}
	}

	/**
  * Move the help elements by injecting them into the h3 elements.
  *
  * @returns {void}
  */
	function moveHelpElements() {

		jQuery(" #wpseo-focuskeyword-section").find("h3").append(jQuery("#help-yoast-focuskeyword").detach().removeClass("wpseo_hidden"));

		jQuery(" #wpseo-pageanalysis-section").find("h3").append(jQuery("#help-yoast-pageanalysis").detach().removeClass("wpseo_hidden"));

		var snippetHelp = jQuery("#help-yoast-snippetpreview").detach().removeClass("wpseo_hidden");
		jQuery(" #wpseosnippet").find("h3").append(snippetHelp);
		jQuery(" #wpseo_snippet").find("h3").append(snippetHelp);
	}

	jQuery(document).ready(function () {
		jQuery(".wpseo-meta-section").each(function (_, el) {
			jQuery(el).find(".wpseo-metabox-tabs li:first").addClass("active");
			jQuery(el).find(".wpseotab:first").addClass("active");
		});
		window.wpseo_init_tabs();

		initAddKeywordPopup();
		initSelect2();

		jQuery(window).on("YoastSEO:ready", moveHelpElements);
	});
})(jQuery);

/* eslint-disable */
/* jshint ignore:start */
/**
 * Cleans up a string, removing script tags etc.
 *
 * @deprecated since version 3.0
 *
 * @param {string} str
 * @returns {string}
 */
function ystClean(str) {
	console.error("ystClean is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return str;
}

/**
 * Tests whether given element `str` matches `p`.
 *
 * @deprecated since version 3.0
 *
 * @param {string} str The string to match
 * @param {RegExp} p The regex to match
 * @returns {string}
 */
function ystFocusKwTest(str, p) {
	console.error("ystFocusKwTest is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return "";
}

/**
 * The function name says it all, removes lower case diacritics
 *
 * @deprecated since version 3.0
 *
 * @param {string} str
 * @returns {string}
 */
function ystRemoveLowerCaseDiacritics(str) {
	console.error("ystRemoveLowerCaseDiacritics is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return str;
}

/**
 * Tests whether the focus keyword is used in title, body and description
 *
 * @deprecated since version 3.0
 */
function ystTestFocusKw() {
	console.error("ystTestFocusKw is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * This callback is used for variable replacement
 *
 * This is done through a callback as it _could_ be that `ystReplaceVariables` has to do an AJAX request.
 *
 * @callback replaceVariablesCallback
 * @param {string} str The string with the replaced variables in it
 */

/**
 * Replaces variables either with values from wpseoMetaboxL10n, by grabbing them from the page or (ultimately) getting them through AJAX
 *
 * @deprecated since version 3.0
 *
 * @param {string} str The string with variables to be replaced
 * @param {replaceVariablesCallback} callback Callback function for when the
 */
function ystReplaceVariables(str, callback) {
	console.error("ystReplaceVariables is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	callback(str);
}

/**
 * Replace a variable with a string, through an AJAX call to WP
 *
 * @deprecated since version 3.0
 *
 * @param {string} replaceableVar
 * @param {replaceVariablesCallback} callback
 */
function ystAjaxReplaceVariables(replaceableVar, callback) {
	console.error("ystAjaxReplaceVariables is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * Updates the title in the snippet preview
 *
 * @deprecated since version 3.0
 *
 * @param {boolean} [force = false]
 */
function ystUpdateTitle(force) {
	console.error("ystUpdateTitle is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * Cleans the title before use
 *
 * @deprecated since version 3.0
 *
 * @param {string} title
 * @returns {string}
 */
function ystSanitizeTitle(title) {
	console.error("ystSanitizeTitle is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return title;
}

/**
 * Updates the meta description in the snippet preview
 *
 * @deprecated since version 3.0
 */
function ystUpdateDesc() {
	console.error("ystUpdateDesc is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * Sanitized the description
 *
 * @deprecated since version 3.0
 *
 * @param {string} desc
 * @returns {string}
 */
function ystSanitizeDesc(desc) {
	console.error("ystSanitizeDesc is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return desc;
}

/**
 * Trims the description to the desired length
 *
 * @deprecated since version 3.0
 *
 * @param {string} desc
 * @returns {string}
 */
function ystTrimDesc(desc) {
	console.error("ystTrimDesc is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return desc;
}

/**
 * Updates the URL in the snippet preview
 *
 * @deprecated since version 3.0
 */
function ystUpdateURL() {
	console.error("ystUpdateURL is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * Bolds the keywords in a string
 *
 * @deprecated since version 3.0
 *
 * @param {string} str
 * @param {boolean} url
 * @returns {string}
 */
function ystBoldKeywords(str, url) {
	console.error("ystBoldKeywords is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return str;
}

/**
 * Updates the entire snippet preview
 *
 * @deprecated since version 3.0
 */
function ystUpdateSnippet() {
	console.error("ystUpdateSnippet is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");
}

/**
 * Escapres the focus keyword
 *
 * @deprecated since version 3.0
 *
 * @param {string} str
 * @returns {string}
 */
function ystEscapeFocusKw(str) {
	console.error("ystEscapeFocusKw is deprecated since Yoast SEO 3.0, use YoastSEO.js functionality instead.");

	return str;
}

window.ystClean = ystClean;
window.ystFocusKwTest = ystFocusKwTest;
window.ystRemoveLowerCaseDiacritics = ystRemoveLowerCaseDiacritics;
window.ystTestFocusKw = ystTestFocusKw;
window.ystReplaceVariables = ystReplaceVariables;
window.ystAjaxReplaceVariables = ystAjaxReplaceVariables;
window.ystUpdateTitle = ystUpdateTitle;
window.ystSanitizeTitle = ystSanitizeTitle;
window.ystUpdateDesc = ystUpdateDesc;
window.ystSanitizeDesc = ystSanitizeDesc;
window.ystTrimDesc = ystTrimDesc;
window.ystUpdateURL = ystUpdateURL;
window.ystBoldKeywords = ystBoldKeywords;
window.ystUpdateSnippet = ystUpdateSnippet;
window.ystEscapeFocusKw = ystEscapeFocusKw;
/* jshint ignore:end */
/* eslint-enable */

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvd3Atc2VvLW1ldGFib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDRSxXQUFVLENBQVYsRUFBYztBQUNmOztBQUVBLFFBQU8sZUFBUCxHQUF5QixZQUFXO0FBQ25DLE1BQUssT0FBUSx5QkFBUixFQUFvQyxNQUFwQyxHQUE2QyxDQUFsRCxFQUFzRDtBQUNyRCxVQUFRLHFCQUFSLEVBQ0UsRUFERixDQUNNLE9BRE4sRUFDZSxpQkFEZixFQUNrQyxVQUFVLEVBQVYsRUFBZTtBQUMvQyxPQUFHLGNBQUg7O0FBRUEsV0FBUSxtREFBUixFQUE4RCxXQUE5RCxDQUEyRSxRQUEzRTtBQUNBLFdBQVEsc0NBQVIsRUFBaUQsV0FBakQsQ0FBOEQsUUFBOUQ7O0FBRUE7QUFDQSxXQUFRLElBQVIsRUFBZSxRQUFmLENBQXlCLHNCQUF6Qjs7QUFFQSxRQUFJLGFBQWEsT0FBUSxPQUFRLElBQVIsRUFBZSxJQUFmLENBQXFCLE1BQXJCLENBQVIsQ0FBakI7QUFDQSxlQUFXLFFBQVgsQ0FBcUIsUUFBckI7QUFDQSxXQUFRLElBQVIsRUFBZSxNQUFmLENBQXVCLElBQXZCLEVBQThCLFFBQTlCLENBQXdDLFFBQXhDOztBQUVBLFFBQUssT0FBUSxJQUFSLEVBQWUsUUFBZixDQUF5QixRQUF6QixDQUFMLEVBQTJDO0FBQzFDLFlBQVEsWUFBUixFQUF1QixPQUF2QixDQUFnQztBQUMvQixpQkFBVyxPQUFRLFVBQVIsRUFBcUIsTUFBckIsR0FBOEI7QUFEVixNQUFoQyxFQUVHLEdBRkg7QUFHQTtBQUNELElBbkJGLEVBb0JFLEVBcEJGLENBb0JNLFlBcEJOLEVBb0JvQixpQkFwQnBCLEVBb0J1QyxZQUFXO0FBQ2hEO0FBQ0EsV0FBUSxJQUFSLEVBQWUsUUFBZixDQUF5QixzQkFBekI7QUFDQSxJQXZCRixFQXdCRSxFQXhCRixDQXdCTSxpQkF4Qk4sRUF3QnlC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QUNBLE9BQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNBLE9BQU8sWUFBUCxHQUFzQixZQUF0QjtBQUNBLE9BQU8sZUFBUCxHQUF5QixlQUF6QjtBQUNBLE9BQU8sZ0JBQVAsR0FBMEIsZ0JBQTFCO0FBQ0EsT0FBTyxnQkFBUCxHQUEwQixnQkFBMUI7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGJyb3dzZXI6dHJ1ZSAqL1xuLyogZ2xvYmFsIHRiX3Nob3csIHdwc2VvU2VsZWN0MkxvY2FsZSAqL1xuKCBmdW5jdGlvbiggJCApIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0d2luZG93Lndwc2VvX2luaXRfdGFicyA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggalF1ZXJ5KCBcIi53cHNlby1tZXRhYm94LXRhYnMtZGl2XCIgKS5sZW5ndGggPiAwICkge1xuXHRcdFx0alF1ZXJ5KCBcIi53cHNlby1tZXRhYm94LXRhYnNcIiApXG5cdFx0XHRcdC5vbiggXCJjbGlja1wiLCBcImEud3BzZW9fdGFibGlua1wiLCBmdW5jdGlvbiggZXYgKSB7XG5cdFx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdGpRdWVyeSggXCIud3BzZW8tbWV0YS1zZWN0aW9uLmFjdGl2ZSAud3BzZW8tbWV0YWJveC10YWJzIGxpXCIgKS5yZW1vdmVDbGFzcyggXCJhY3RpdmVcIiApO1xuXHRcdFx0XHRcdGpRdWVyeSggXCIud3BzZW8tbWV0YS1zZWN0aW9uLmFjdGl2ZSAud3BzZW90YWJcIiApLnJlbW92ZUNsYXNzKCBcImFjdGl2ZVwiICk7XG5cblx0XHRcdFx0XHQvLyBIaWRlIHRoZSBZb2FzdCB0b29sdGlwIHdoZW4gdGhlIGVsZW1lbnQgZ2V0cyBjbGlja2VkLlxuXHRcdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCBcInlvYXN0LXRvb2x0aXAtaGlkZGVuXCIgKTtcblxuXHRcdFx0XHRcdHZhciB0YXJnZXRFbGVtID0galF1ZXJ5KCBqUXVlcnkoIHRoaXMgKS5hdHRyKCBcImhyZWZcIiApICk7XG5cdFx0XHRcdFx0dGFyZ2V0RWxlbS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXHRcdFx0XHRcdGpRdWVyeSggdGhpcyApLnBhcmVudCggXCJsaVwiICkuYWRkQ2xhc3MoIFwiYWN0aXZlXCIgKTtcblxuXHRcdFx0XHRcdGlmICggalF1ZXJ5KCB0aGlzICkuaGFzQ2xhc3MoIFwic2Nyb2xsXCIgKSApIHtcblx0XHRcdFx0XHRcdGpRdWVyeSggXCJodG1sLCBib2R5XCIgKS5hbmltYXRlKCB7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbFRvcDogalF1ZXJ5KCB0YXJnZXRFbGVtICkub2Zmc2V0KCkudG9wLFxuXHRcdFx0XHRcdFx0fSwgNTAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IClcblx0XHRcdFx0Lm9uKCBcIm1vdXNlbGVhdmVcIiwgXCJhLndwc2VvX3RhYmxpbmtcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gVGhlIGVsZW1lbnQgY2FuIHN0aWxsIGhhdmUgZm9jdXMsIGVuc3VyZSB0byBoaWRlIHRoZSB0b29sdGlwLlxuXHRcdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCBcInlvYXN0LXRvb2x0aXAtaGlkZGVuXCIgKTtcblx0XHRcdFx0fSApXG5cdFx0XHRcdC5vbiggXCJibHVyIG1vdXNlZW50ZXJcIiwgXCJhLndwc2VvX3RhYmxpbmtcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgZWxlbWVudCB0b29sdGlwLWFibGUgYWdhaW4uXG5cdFx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIFwieW9hc3QtdG9vbHRpcC1oaWRkZW5cIiApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fTtcblxuXHRcdGlmICggalF1ZXJ5KCBcIi53cHNlby1tZXRhLXNlY3Rpb25cIiApLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRqUXVlcnkoIFwiI3dwc2VvLW1ldGEtc2VjdGlvbi1jb250ZW50XCIgKS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXHRcdFx0alF1ZXJ5KCBcIi53cHNlby1tZXRhYm94LXNpZGViYXIgbGlcIiApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkoIHRoaXMgKS5maW5kKCBcIi53cHNlby1tZXRhLXNlY3Rpb24tbGlua1wiICkuYXR0ciggXCJocmVmXCIgKSA9PT0gXCIjd3BzZW8tbWV0YS1zZWN0aW9uLWNvbnRlbnRcIjtcblx0XHRcdH0gKS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXG5cdFx0XHRqUXVlcnkoIFwiYS53cHNlby1tZXRhLXNlY3Rpb24tbGlua1wiIClcblx0XHRcdFx0Lm9uKCBcImNsaWNrXCIsIGZ1bmN0aW9uKCBldiApIHtcblx0XHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0alF1ZXJ5KCBcIi53cHNlby1tZXRhYm94LXNpZGViYXIgbGlcIiApLnJlbW92ZUNsYXNzKCBcImFjdGl2ZVwiICk7XG5cdFx0XHRcdFx0alF1ZXJ5KCBcIi53cHNlby1tZXRhLXNlY3Rpb25cIiApLnJlbW92ZUNsYXNzKCBcImFjdGl2ZVwiICk7XG5cblx0XHRcdFx0XHQvLyBIaWRlIHRoZSBZb2FzdCB0b29sdGlwIHdoZW4gdGhlIGVsZW1lbnQgZ2V0cyBjbGlja2VkLlxuXHRcdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCBcInlvYXN0LXRvb2x0aXAtaGlkZGVuXCIgKTtcblxuXHRcdFx0XHRcdHZhciB0YXJnZXRFbGVtID0galF1ZXJ5KCBqUXVlcnkoIHRoaXMgKS5hdHRyKCBcImhyZWZcIiApICk7XG5cdFx0XHRcdFx0dGFyZ2V0RWxlbS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXG5cdFx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucGFyZW50KCBcImxpXCIgKS5hZGRDbGFzcyggXCJhY3RpdmVcIiApO1xuXHRcdFx0XHR9IClcblx0XHRcdFx0Lm9uKCBcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gVGhlIGVsZW1lbnQgY2FuIHN0aWxsIGhhdmUgZm9jdXMsIGVuc3VyZSB0byBoaWRlIHRoZSB0b29sdGlwLlxuXHRcdFx0XHRcdGpRdWVyeSggdGhpcyApLmFkZENsYXNzKCBcInlvYXN0LXRvb2x0aXAtaGlkZGVuXCIgKTtcblx0XHRcdFx0fSApXG5cdFx0XHRcdC5vbiggXCJibHVyIG1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgZWxlbWVudCB0b29sdGlwLWFibGUgYWdhaW4uXG5cdFx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIFwieW9hc3QtdG9vbHRpcC1oaWRkZW5cIiApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fTtcblxuXHRcdGpRdWVyeSggXCIud3BzZW8taGVhZGluZ1wiICkuaGlkZSgpO1xuXHRcdGpRdWVyeSggXCIud3BzZW8tbWV0YWJveC10YWJzXCIgKS5zaG93KCk7XG5cdFx0Ly8gRW5kIFRhYnMgY29kZS5cblx0fTtcblxuXHQvKipcblx0ICogQWRkcyBzZWxlY3QyIGZvciBzZWxlY3RlZCBmaWVsZHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBpbml0U2VsZWN0MigpIHtcblx0XHQvLyBTZWxlY3QyIGZvciBZb2FzdCBTRU8gTWV0YWJveCBBZHZhbmNlZCB0YWJcblx0XHQkKCBcIiN5b2FzdF93cHNlb19tZXRhLXJvYm90cy1ub2luZGV4XCIgKS5zZWxlY3QyKCB7IHdpZHRoOiBcIjEwMCVcIiwgbGFuZ3VhZ2U6IHdwc2VvU2VsZWN0MkxvY2FsZSB9ICk7XG5cdFx0JCggXCIjeW9hc3Rfd3BzZW9fbWV0YS1yb2JvdHMtYWR2XCIgKS5zZWxlY3QyKCB7IHdpZHRoOiBcIjEwMCVcIiwgbGFuZ3VhZ2U6IHdwc2VvU2VsZWN0MkxvY2FsZSB9ICk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvd3MgYSBpbmZvcm1hdGlvbmFsIHBvcHVwIGlmIHNvbWVvbmUgY2xpY2sgdGhlIGFkZCBrZXl3b3JkIGJ1dHRvblxuXHQgKi9cblx0ZnVuY3Rpb24gYWRkS2V5d29yZFBvcHVwKCkge1xuXHRcdHZhciAkYnV5QnV0dG9uID0gJCggXCIjd3BzZW8tYWRkLWtleXdvcmQtcG9wdXAtYnV0dG9uXCIgKSxcblx0XHRcdHRpdGxlID0gJGJ1eUJ1dHRvbi50ZXh0KCksXG5cdFx0XHQkcG9wdXBXaW5kb3csXG5cdFx0XHQkY2xvc2VCdXR0b247XG5cblx0XHR0Yl9zaG93KCB0aXRsZSwgXCIjVEJfaW5saW5lP3dpZHRoPTY1MCZoZWlnaHQ9MzUwJmlubGluZUlkPXdwc2VvLWFkZC1rZXl3b3JkLXBvcHVwXCIsIFwiZ3JvdXBcIiApO1xuXG5cdFx0Ly8gVGhlIHRoaWNib3ggcG9wdXAgVUkgaXMgbm93IGF2YWlsYWJsZS5cblx0XHQkcG9wdXBXaW5kb3cgPSAkKCBcIiNUQl93aW5kb3dcIiApO1xuXHRcdCRjbG9zZUJ1dHRvbiA9ICQoIFwiI1RCX2Nsb3NlV2luZG93QnV0dG9uXCIgKTtcblxuXHRcdC8vIFRoZSBjb250YWluZXIgd2luZG93IGlzbid0IHRoZSBjb3JyZWN0IHNpemUsIHJlY3RpZnkgdGhpcyBhbmQgYWxzbyB0aGUgY2VudGVyaW5nLlxuXHRcdCRwb3B1cFdpbmRvdy5jc3MoIHsgd2lkdGg6IDY4MCwgaGVpZ2h0OiAyMzUsIFwibWFyZ2luLWxlZnRcIjogLTM0MCB9ICk7XG5cblx0XHQvLyBBY2Nlc3NpYmlsaXR5IGltcHJvdmVtZW50cy5cblx0XHQkcG9wdXBXaW5kb3dcblx0XHRcdC5hdHRyKCB7XG5cdFx0XHRcdHJvbGU6IFwiZGlhbG9nXCIsXG5cdFx0XHRcdFwiYXJpYS1sYWJlbGxlZGJ5XCI6IFwiVEJfYWpheFdpbmRvd1RpdGxlXCIsXG5cdFx0XHRcdFwiYXJpYS1kZXNjcmliZWRieVwiOiBcIlRCX2FqYXhDb250ZW50XCIsXG5cdFx0XHR9IClcblx0XHRcdC5vbiggXCJrZXlkb3duXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0dmFyIGlkO1xuXG5cdFx0XHRcdC8vIENvbnN0cmFpbiB0YWJiaW5nIHdpdGhpbiB0aGUgbW9kYWwuXG5cdFx0XHRcdGlmICggOSA9PT0gZXZlbnQud2hpY2ggKSB7XG5cdFx0XHRcdFx0aWQgPSBldmVudC50YXJnZXQuaWQ7XG5cblx0XHRcdFx0XHRpZiAoIGlkID09PSBcIndwc2VvLWFkZC1rZXl3b3JkLXBvcHVwLWJ1dHRvblwiICYmICEgZXZlbnQuc2hpZnRLZXkgKSB7XG5cdFx0XHRcdFx0XHQkY2xvc2VCdXR0b24uZm9jdXMoKTtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggaWQgPT09IFwiVEJfY2xvc2VXaW5kb3dCdXR0b25cIiAmJiBldmVudC5zaGlmdEtleSApIHtcblx0XHRcdFx0XHRcdCRidXlCdXR0b24uZm9jdXMoKTtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cblx0XHQvLyBNb3ZlIGZvY3VzIGJhY2sgdG8gdGhlIGVsZW1lbnQgdGhhdCBvcGVuZWQgdGhlIG1vZGFsLlxuXHRcdCQoIFwiYm9keVwiICkub24oIFwidGhpY2tib3g6cmVtb3ZlZFwiLCBmdW5jdGlvbigpIHtcblx0XHRcdCQoIFwiLndwc2VvLWFkZC1rZXl3b3JkXCIgKS5mb2N1cygpO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGtleXdvcmQgcG9wdXAgaWYgdGhlIHRlbXBsYXRlIGZvciBpdCBpcyBmb3VuZFxuXHQgKi9cblx0ZnVuY3Rpb24gaW5pdEFkZEtleXdvcmRQb3B1cCgpIHtcblx0XHQvLyBJZiBhZGQga2V5d29yZCBwb3B1cCBleGlzdHMgYmluZCBpdCB0byB0aGUgYWRkIGtleXdvcmQgYnV0dG9uXG5cdFx0aWYgKCAxID09PSAkKCBcIiN3cHNlby1hZGQta2V5d29yZC1wb3B1cFwiICkubGVuZ3RoICkge1xuXHRcdFx0JCggXCIud3BzZW8tYWRkLWtleXdvcmRcIiApLm9uKCBcImNsaWNrXCIsIGFkZEtleXdvcmRQb3B1cCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIHRoZSBoZWxwIGVsZW1lbnRzIGJ5IGluamVjdGluZyB0aGVtIGludG8gdGhlIGgzIGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIG1vdmVIZWxwRWxlbWVudHMoKSB7XG5cblx0XHRqUXVlcnkoIFwiICN3cHNlby1mb2N1c2tleXdvcmQtc2VjdGlvblwiICkuZmluZCggXCJoM1wiICkuYXBwZW5kKFxuXHRcdFx0alF1ZXJ5KCBcIiNoZWxwLXlvYXN0LWZvY3Vza2V5d29yZFwiICkuZGV0YWNoKCkucmVtb3ZlQ2xhc3MoIFwid3BzZW9faGlkZGVuXCIgKVxuXHRcdCk7XG5cblx0XHRqUXVlcnkoIFwiICN3cHNlby1wYWdlYW5hbHlzaXMtc2VjdGlvblwiICkuZmluZCggXCJoM1wiICkuYXBwZW5kKFxuXHRcdFx0alF1ZXJ5KCBcIiNoZWxwLXlvYXN0LXBhZ2VhbmFseXNpc1wiICkuZGV0YWNoKCkucmVtb3ZlQ2xhc3MoIFwid3BzZW9faGlkZGVuXCIgKVxuXHRcdCk7XG5cblx0XHR2YXIgc25pcHBldEhlbHAgPSBqUXVlcnkoIFwiI2hlbHAteW9hc3Qtc25pcHBldHByZXZpZXdcIiApLmRldGFjaCgpLnJlbW92ZUNsYXNzKCBcIndwc2VvX2hpZGRlblwiICk7XG5cdFx0alF1ZXJ5KCBcIiAjd3BzZW9zbmlwcGV0XCIgKS5maW5kKCBcImgzXCIgKS5hcHBlbmQoIHNuaXBwZXRIZWxwICk7XG5cdFx0alF1ZXJ5KCBcIiAjd3BzZW9fc25pcHBldFwiICkuZmluZCggXCJoM1wiICkuYXBwZW5kKCBzbmlwcGV0SGVscCApO1xuXHR9XG5cblx0alF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkoIFwiLndwc2VvLW1ldGEtc2VjdGlvblwiICkuZWFjaCggZnVuY3Rpb24oIF8sIGVsICkge1xuXHRcdFx0alF1ZXJ5KCBlbCApLmZpbmQoIFwiLndwc2VvLW1ldGFib3gtdGFicyBsaTpmaXJzdFwiICkuYWRkQ2xhc3MoIFwiYWN0aXZlXCIgKTtcblx0XHRcdGpRdWVyeSggZWwgKS5maW5kKCBcIi53cHNlb3RhYjpmaXJzdFwiICkuYWRkQ2xhc3MoIFwiYWN0aXZlXCIgKTtcblx0XHR9ICk7XG5cdFx0d2luZG93Lndwc2VvX2luaXRfdGFicygpO1xuXG5cdFx0aW5pdEFkZEtleXdvcmRQb3B1cCgpO1xuXHRcdGluaXRTZWxlY3QyKCk7XG5cblx0XHRqUXVlcnkoIHdpbmRvdyApLm9uKCBcIllvYXN0U0VPOnJlYWR5XCIsIG1vdmVIZWxwRWxlbWVudHMgKTtcblx0fSApO1xufSggalF1ZXJ5ICkgKTtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8qKlxuICogQ2xlYW5zIHVwIGEgc3RyaW5nLCByZW1vdmluZyBzY3JpcHQgdGFncyBldGMuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB5c3RDbGVhbiggc3RyICkge1xuXHRjb25zb2xlLmVycm9yKCBcInlzdENsZWFuIGlzIGRlcHJlY2F0ZWQgc2luY2UgWW9hc3QgU0VPIDMuMCwgdXNlIFlvYXN0U0VPLmpzIGZ1bmN0aW9uYWxpdHkgaW5zdGVhZC5cIiApO1xuXG5cdHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBnaXZlbiBlbGVtZW50IGBzdHJgIG1hdGNoZXMgYHBgLlxuICpcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMy4wXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcCBUaGUgcmVnZXggdG8gbWF0Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHlzdEZvY3VzS3dUZXN0KCBzdHIsIHAgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0Rm9jdXNLd1Rlc3QgaXMgZGVwcmVjYXRlZCBzaW5jZSBZb2FzdCBTRU8gMy4wLCB1c2UgWW9hc3RTRU8uanMgZnVuY3Rpb25hbGl0eSBpbnN0ZWFkLlwiICk7XG5cblx0cmV0dXJuIFwiXCI7XG59XG5cbi8qKlxuICogVGhlIGZ1bmN0aW9uIG5hbWUgc2F5cyBpdCBhbGwsIHJlbW92ZXMgbG93ZXIgY2FzZSBkaWFjcml0aWNzXG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB5c3RSZW1vdmVMb3dlckNhc2VEaWFjcml0aWNzKCBzdHIgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0UmVtb3ZlTG93ZXJDYXNlRGlhY3JpdGljcyBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcblxuXHRyZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgdGhlIGZvY3VzIGtleXdvcmQgaXMgdXNlZCBpbiB0aXRsZSwgYm9keSBhbmQgZGVzY3JpcHRpb25cbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMFxuICovXG5mdW5jdGlvbiB5c3RUZXN0Rm9jdXNLdygpIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RUZXN0Rm9jdXNLdyBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcbn1cblxuLyoqXG4gKiBUaGlzIGNhbGxiYWNrIGlzIHVzZWQgZm9yIHZhcmlhYmxlIHJlcGxhY2VtZW50XG4gKlxuICogVGhpcyBpcyBkb25lIHRocm91Z2ggYSBjYWxsYmFjayBhcyBpdCBfY291bGRfIGJlIHRoYXQgYHlzdFJlcGxhY2VWYXJpYWJsZXNgIGhhcyB0byBkbyBhbiBBSkFYIHJlcXVlc3QuXG4gKlxuICogQGNhbGxiYWNrIHJlcGxhY2VWYXJpYWJsZXNDYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHdpdGggdGhlIHJlcGxhY2VkIHZhcmlhYmxlcyBpbiBpdFxuICovXG5cbi8qKlxuICogUmVwbGFjZXMgdmFyaWFibGVzIGVpdGhlciB3aXRoIHZhbHVlcyBmcm9tIHdwc2VvTWV0YWJveEwxMG4sIGJ5IGdyYWJiaW5nIHRoZW0gZnJvbSB0aGUgcGFnZSBvciAodWx0aW1hdGVseSkgZ2V0dGluZyB0aGVtIHRocm91Z2ggQUpBWFxuICpcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMy4wXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHdpdGggdmFyaWFibGVzIHRvIGJlIHJlcGxhY2VkXG4gKiBAcGFyYW0ge3JlcGxhY2VWYXJpYWJsZXNDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIHdoZW4gdGhlXG4gKi9cbmZ1bmN0aW9uIHlzdFJlcGxhY2VWYXJpYWJsZXMoIHN0ciwgY2FsbGJhY2sgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0UmVwbGFjZVZhcmlhYmxlcyBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcblxuXHRjYWxsYmFjayggc3RyICk7XG59XG5cbi8qKlxuICogUmVwbGFjZSBhIHZhcmlhYmxlIHdpdGggYSBzdHJpbmcsIHRocm91Z2ggYW4gQUpBWCBjYWxsIHRvIFdQXG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZWFibGVWYXJcbiAqIEBwYXJhbSB7cmVwbGFjZVZhcmlhYmxlc0NhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiB5c3RBamF4UmVwbGFjZVZhcmlhYmxlcyggcmVwbGFjZWFibGVWYXIsIGNhbGxiYWNrICkge1xuXHRjb25zb2xlLmVycm9yKCBcInlzdEFqYXhSZXBsYWNlVmFyaWFibGVzIGlzIGRlcHJlY2F0ZWQgc2luY2UgWW9hc3QgU0VPIDMuMCwgdXNlIFlvYXN0U0VPLmpzIGZ1bmN0aW9uYWxpdHkgaW5zdGVhZC5cIiApO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHRpdGxlIGluIHRoZSBzbmlwcGV0IHByZXZpZXdcbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlID0gZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHlzdFVwZGF0ZVRpdGxlKCBmb3JjZSApIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RVcGRhdGVUaXRsZSBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdGhlIHRpdGxlIGJlZm9yZSB1c2VcbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24geXN0U2FuaXRpemVUaXRsZSggdGl0bGUgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0U2FuaXRpemVUaXRsZSBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcblxuXHRyZXR1cm4gdGl0bGU7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgbWV0YSBkZXNjcmlwdGlvbiBpbiB0aGUgc25pcHBldCBwcmV2aWV3XG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqL1xuZnVuY3Rpb24geXN0VXBkYXRlRGVzYygpIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RVcGRhdGVEZXNjIGlzIGRlcHJlY2F0ZWQgc2luY2UgWW9hc3QgU0VPIDMuMCwgdXNlIFlvYXN0U0VPLmpzIGZ1bmN0aW9uYWxpdHkgaW5zdGVhZC5cIiApO1xufVxuXG4vKipcbiAqIFNhbml0aXplZCB0aGUgZGVzY3JpcHRpb25cbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB5c3RTYW5pdGl6ZURlc2MoIGRlc2MgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0U2FuaXRpemVEZXNjIGlzIGRlcHJlY2F0ZWQgc2luY2UgWW9hc3QgU0VPIDMuMCwgdXNlIFlvYXN0U0VPLmpzIGZ1bmN0aW9uYWxpdHkgaW5zdGVhZC5cIiApO1xuXG5cdHJldHVybiBkZXNjO1xufVxuXG4vKipcbiAqIFRyaW1zIHRoZSBkZXNjcmlwdGlvbiB0byB0aGUgZGVzaXJlZCBsZW5ndGhcbiAqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDMuMFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB5c3RUcmltRGVzYyggZGVzYyApIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RUcmltRGVzYyBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcblxuXHRyZXR1cm4gZGVzYztcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBVUkwgaW4gdGhlIHNuaXBwZXQgcHJldmlld1xuICpcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMy4wXG4gKi9cbmZ1bmN0aW9uIHlzdFVwZGF0ZVVSTCgpIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RVcGRhdGVVUkwgaXMgZGVwcmVjYXRlZCBzaW5jZSBZb2FzdCBTRU8gMy4wLCB1c2UgWW9hc3RTRU8uanMgZnVuY3Rpb25hbGl0eSBpbnN0ZWFkLlwiICk7XG59XG5cbi8qKlxuICogQm9sZHMgdGhlIGtleXdvcmRzIGluIGEgc3RyaW5nXG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVybFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24geXN0Qm9sZEtleXdvcmRzKCBzdHIsIHVybCApIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RCb2xkS2V5d29yZHMgaXMgZGVwcmVjYXRlZCBzaW5jZSBZb2FzdCBTRU8gMy4wLCB1c2UgWW9hc3RTRU8uanMgZnVuY3Rpb25hbGl0eSBpbnN0ZWFkLlwiICk7XG5cblx0cmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBlbnRpcmUgc25pcHBldCBwcmV2aWV3XG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqL1xuZnVuY3Rpb24geXN0VXBkYXRlU25pcHBldCgpIHtcblx0Y29uc29sZS5lcnJvciggXCJ5c3RVcGRhdGVTbmlwcGV0IGlzIGRlcHJlY2F0ZWQgc2luY2UgWW9hc3QgU0VPIDMuMCwgdXNlIFlvYXN0U0VPLmpzIGZ1bmN0aW9uYWxpdHkgaW5zdGVhZC5cIiApO1xufVxuXG4vKipcbiAqIEVzY2FwcmVzIHRoZSBmb2N1cyBrZXl3b3JkXG4gKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAzLjBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB5c3RFc2NhcGVGb2N1c0t3KCBzdHIgKSB7XG5cdGNvbnNvbGUuZXJyb3IoIFwieXN0RXNjYXBlRm9jdXNLdyBpcyBkZXByZWNhdGVkIHNpbmNlIFlvYXN0IFNFTyAzLjAsIHVzZSBZb2FzdFNFTy5qcyBmdW5jdGlvbmFsaXR5IGluc3RlYWQuXCIgKTtcblxuXHRyZXR1cm4gc3RyO1xufVxuXG53aW5kb3cueXN0Q2xlYW4gPSB5c3RDbGVhbjtcbndpbmRvdy55c3RGb2N1c0t3VGVzdCA9IHlzdEZvY3VzS3dUZXN0O1xud2luZG93LnlzdFJlbW92ZUxvd2VyQ2FzZURpYWNyaXRpY3MgPSB5c3RSZW1vdmVMb3dlckNhc2VEaWFjcml0aWNzO1xud2luZG93LnlzdFRlc3RGb2N1c0t3ID0geXN0VGVzdEZvY3VzS3c7XG53aW5kb3cueXN0UmVwbGFjZVZhcmlhYmxlcyA9IHlzdFJlcGxhY2VWYXJpYWJsZXM7XG53aW5kb3cueXN0QWpheFJlcGxhY2VWYXJpYWJsZXMgPSB5c3RBamF4UmVwbGFjZVZhcmlhYmxlcztcbndpbmRvdy55c3RVcGRhdGVUaXRsZSA9IHlzdFVwZGF0ZVRpdGxlO1xud2luZG93LnlzdFNhbml0aXplVGl0bGUgPSB5c3RTYW5pdGl6ZVRpdGxlO1xud2luZG93LnlzdFVwZGF0ZURlc2MgPSB5c3RVcGRhdGVEZXNjO1xud2luZG93LnlzdFNhbml0aXplRGVzYyA9IHlzdFNhbml0aXplRGVzYztcbndpbmRvdy55c3RUcmltRGVzYyA9IHlzdFRyaW1EZXNjO1xud2luZG93LnlzdFVwZGF0ZVVSTCA9IHlzdFVwZGF0ZVVSTDtcbndpbmRvdy55c3RCb2xkS2V5d29yZHMgPSB5c3RCb2xkS2V5d29yZHM7XG53aW5kb3cueXN0VXBkYXRlU25pcHBldCA9IHlzdFVwZGF0ZVNuaXBwZXQ7XG53aW5kb3cueXN0RXNjYXBlRm9jdXNLdyA9IHlzdEVzY2FwZUZvY3VzS3c7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuLyogZXNsaW50LWVuYWJsZSAqL1xuIl19
