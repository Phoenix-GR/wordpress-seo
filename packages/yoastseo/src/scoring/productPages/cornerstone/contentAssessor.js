import { createAnchorOpeningTag } from "../../../helpers/shortlinker";
import Assessor from "../../assessor.js";
import ContentAssessor from "../../contentAssessor";
import ParagraphTooLong from "../../assessments/readability/ParagraphTooLongAssessment.js";
import SentenceLengthInText from "../../assessments/readability/SentenceLengthInTextAssessment.js";
import SubheadingDistributionTooLong from "../../assessments/readability/SubheadingDistributionTooLongAssessment.js";
import TransitionWords from "../../assessments/readability/TransitionWordsAssessment.js";
import PassiveVoice from "../../assessments/readability/PassiveVoiceAssessment.js";
import TextPresence from "../../assessments/readability/TextPresenceAssessment.js";
import ListsPresence from "../../assessments/readability/ListAssessment.js";

/**
 * Creates the Assessor
 *
 * @param {object} researcher   The researcher to use for the analysis.
 * @param {Object} options      The options for this assessor.
 *
 * @constructor
 */
const ProductCornerstoneContentAssessor = function( researcher, options ) {
	Assessor.call( this, researcher, options );
	this.type = "productCornerstoneContentAssessor";

	this._assessments = [
		new SubheadingDistributionTooLong( {
			parameters:	{
				slightlyTooMany: 250,
				farTooMany: 300,
				recommendedMaximumWordCount: 250,
			},
			shouldNotAppearInShortText: true,
			urlTitle: createAnchorOpeningTag( options.subheadingUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.subheadingCTAUrl ),
		} ),
		new ParagraphTooLong( {
			parameters: {
				recommendedLength: 70,
				maximumRecommendedLength: 100,
			},
			urlTitle: createAnchorOpeningTag( options.paragraphUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.paragraphCTAUrl ),
		}, true ),
		new SentenceLengthInText( {
			slightlyTooMany: 15,
			farTooMany: 20,
			urlTitle: createAnchorOpeningTag( options.sentenceLengthUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.sentenceLengthCTAUrl ),
		}, true, true ),
		new TransitionWords( {
			urlTitle: createAnchorOpeningTag( options.transitionWordsUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.transitionWordsCTAUrl ),
		} ),
		new PassiveVoice( {
			urlTitle: createAnchorOpeningTag( options.passiveVoiceUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.passiveVoiceCTAUrl ),
		} ),
		new TextPresence( {
			urlTitle: createAnchorOpeningTag( options.textPresenceUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.textPresenceCTAUrl ),
		} ),
		new ListsPresence( {
			urlTitle: createAnchorOpeningTag( options.listsUrlTitle ),
			urlCallToAction: createAnchorOpeningTag( options.listsCTAUrl ),
		} ),
	];
};

require( "util" ).inherits( ProductCornerstoneContentAssessor, ContentAssessor );


export default ProductCornerstoneContentAssessor;

