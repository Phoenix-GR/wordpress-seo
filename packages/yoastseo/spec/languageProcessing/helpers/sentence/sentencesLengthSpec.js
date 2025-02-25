import sentencesLength from "../../../../src/languageProcessing/helpers/sentence/sentencesLength";
import JapaneseResearcher from "../../../../src/languageProcessing/languages/ja/Researcher";
import EnglishResearcher from "../../../../src/languageProcessing/languages/en/Researcher";

describe( "A test to count the sentence length.", function() {
	it( "doesn't return a length for an empty sentence", function() {
		const sentences = [ "", "A sentence" ];

		const lengths = sentencesLength( sentences, new EnglishResearcher() );

		expect( lengths ).toEqual( [ { sentence: "A sentence", sentenceLength: 2 } ] );
	} );

	it( "returns the string and the length of each sentence (the HTML tags should be stripped if present)", function() {
		const sentences = [ "A good text", "this is a <span>textstring</span>" ];

		const lengths = sentencesLength( sentences, new EnglishResearcher() );

		expect( lengths ).toEqual( [ { sentence: "A good text", sentenceLength: 3 }, { sentence: "this is a textstring", sentenceLength: 4 } ] );
	} );

	it( "returns the string and the length of each sentence (the HTML tags should be stripped if present) in Japanese", function() {
		const sentences = [ "自然おのずから存在しているもの", "歩くさわやかな森 <span>自然</span>" ];

		const lengths = sentencesLength( sentences, new JapaneseResearcher() );

		expect( lengths ).toEqual( [ { sentence: "自然おのずから存在しているもの", sentenceLength: 15 }, { sentence: "歩くさわやかな森 自然", sentenceLength: 11 } ] );
	} );
} );
