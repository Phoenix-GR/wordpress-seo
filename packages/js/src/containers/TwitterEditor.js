/* External dependencies */
import { compose } from "@wordpress/compose";
import { withDispatch, withSelect, dispatch as wpDataDispatch } from "@wordpress/data";
import { validateTwitterImage } from "@yoast/helpers";

/* Internal dependencies */
import TwitterWrapper from "../components/social/TwitterWrapper";
import getL10nObject from "../analysis/getL10nObject";
import withLocation from "../helpers/withLocation";
import { openMedia } from "../helpers/selectMedia";

const socialMediumName = "Twitter";

/**
 * Callback function for selectMedia. Performs actions with the 'image' Object that it gets as an argument.
 *
 * @param {Object} image Object containing data about the selected image.
 *
 * @param {Function} onSelect Callback function received from openMedia. Gets object image' as an argument.
 *
 * @returns {void}
 */
const imageCallback = ( image ) => {
	wpDataDispatch( "yoast-seo/editor" ).setTwitterPreviewImage( {
		url: image.url,
		id: image.id,
		warnings: validateTwitterImage( image ),
	} );
};

/**
 * Lazy function to open the media instance.
 *
 * @returns {void}
 */
const selectMedia = () => {
	openMedia( imageCallback );
};

/* eslint-disable complexity */
export default compose( [
	withSelect( select => {
		const {
			getTwitterDescription,
			getTwitterTitle,
			getTwitterImageUrl,
			getFacebookImageUrl,
			getFacebookTitle,
			getFacebookDescription,
			getDescription,
			getSeoTitle,
			getTwitterWarnings,
			getTwitterImageType,
			getImageFallback,
			getRecommendedReplaceVars,
			getReplaceVars,
			getSiteUrl,
			getSeoTitleTemplate,
			getSeoTitleTemplateNoFallback,
			getSocialTitleTemplate,
			getSeoDescriptionTemplate,
			getSocialDescriptionTemplate,
			getReplacedExcerpt,
		} = select( "yoast-seo/editor" );

		const titleInputPlaceholder  = "";

		const descriptionInputPlaceholder  = "";

		return {
			imageUrl: getTwitterImageUrl(),
			imageFallbackUrl: getFacebookImageUrl() || getImageFallback(),
			recommendedReplacementVariables: getRecommendedReplaceVars(),
			replacementVariables: getReplaceVars(),
			description: getTwitterDescription(),
			descriptionPreviewFallback: getSocialDescriptionTemplate() ||
				getFacebookDescription() ||
				getDescription() ||
				getSeoDescriptionTemplate() ||
				getReplacedExcerpt() ||
				descriptionInputPlaceholder,
			title: getTwitterTitle(),
			titlePreviewFallback: getSocialTitleTemplate() ||
				getFacebookTitle() ||
				getSeoTitle() ||
				getSeoTitleTemplateNoFallback() ||
				getSeoTitleTemplate() ||
				titleInputPlaceholder,
			imageWarnings: getTwitterWarnings(),
			siteUrl: getSiteUrl(),
			isPremium: !! getL10nObject().isPremium,
			isLarge: getTwitterImageType() !== "summary",
			titleInputPlaceholder,
			descriptionInputPlaceholder,
			socialMediumName,
		};
	} ),

	withDispatch( dispatch => {
		const {
			setTwitterPreviewTitle,
			setTwitterPreviewDescription,
			clearTwitterPreviewImage,
			loadTwitterPreviewData,
		} = dispatch( "yoast-seo/editor" );

		return {
			onSelectImageClick: selectMedia,
			onRemoveImageClick:	clearTwitterPreviewImage,
			onDescriptionChange: setTwitterPreviewDescription,
			onTitleChange: setTwitterPreviewTitle,
			onLoad: loadTwitterPreviewData,
		};
	} ),

	withLocation(),
] )( TwitterWrapper );
/* eslint-enable complexity */
