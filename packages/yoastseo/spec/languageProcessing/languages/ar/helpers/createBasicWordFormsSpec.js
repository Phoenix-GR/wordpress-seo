import createBasicWordForms from "../../../../../src/languageProcessing/languages/ar/helpers/createBasicWordForms";

const wordsToStem = [
	 // Creates prefixed forms based on an input word that starts with a valid prefix.
	 /*
	  * Prefix ل "to, because"
	  * To ignore "لتجاهل"
	  * Ignore "تجاهل"
	  */
	  {
		original: "لتجاهل",
		forms: [
			// Prefixed forms based on original:
			"للتجاهل",
			"بلتجاهل",
			"كلتجاهل",
			"ولتجاهل",
			"فلتجاهل",
			"سلتجاهل",
			"ألتجاهل",
			"اللتجاهل",
			"وبلتجاهل",
			"وللتجاهل",
			"لللتجاهل",
			"فسلتجاهل",
			"فبلتجاهل",
			"فللتجاهل",
			"وسلتجاهل",
			"واللتجاهل",
			"باللتجاهل",
			"فاللتجاهل",
			"كاللتجاهل",
			"ولللتجاهل",
			"وباللتجاهل",
			// De-prefixed form:
			"تجاهل",
			// Other prefixed forms based on de-prefixed form:
			"لتجاهل",
			"بتجاهل",
			"كتجاهل",
			"وتجاهل",
			"فتجاهل",
			"ستجاهل",
			"أتجاهل",
			"التجاهل",
			"وبتجاهل",
			"ولتجاهل",
			"للتجاهل",
			"فستجاهل",
			"فبتجاهل",
			"فلتجاهل",
			"وستجاهل",
			"والتجاهل",
			"بالتجاهل",
			"فالتجاهل",
			"كالتجاهل",
			"وللتجاهل",
			"وبالتجاهل",
		],
	  },
	  /*
	   * Prefix ب "with, in, by"
	   * With happiness "بسعادة"
	   * Happiness "سعادة"
	   */
	  {
		original: "بسعادة",
		forms: [
			// Prefixed forms based on original:
			"لبسعادة",
			"ببسعادة",
			"كبسعادة",
			"وبسعادة",
			"فبسعادة",
			"سبسعادة",
			"أبسعادة",
			"البسعادة",
			"وببسعادة",
			"ولبسعادة",
			"للبسعادة",
			"فسبسعادة",
			"فببسعادة",
			"فلبسعادة",
			"وسبسعادة",
			"والبسعادة",
			"بالبسعادة",
			"فالبسعادة",
			"كالبسعادة",
			"وللبسعادة",
			"وبالبسعادة",
			// De-prefixed form:
			"سعادة",
			// Other prefixed forms based on de-prefixed form:
			"لسعادة",
			"بسعادة",
			"كسعادة",
			"وسعادة",
			"فسعادة",
			"سسعادة",
			"أسعادة",
			"السعادة",
			"وبسعادة",
			"ولسعادة",
			"للسعادة",
			"فسسعادة",
			"فبسعادة",
			"فلسعادة",
			"وسسعادة",
			"والسعادة",
			"بالسعادة",
			"فالسعادة",
			"كالسعادة",
			"وللسعادة",
			"وبالسعادة",
		],
	  },
	  /*
	   * Prefix ال "the"
	   * The home "المنزل"
	   * Home "منزل"
	   */
	  {
		original: "المنزل",
		forms: [
			// Prefixed forms based on original:
			"لالمنزل",
			"بالمنزل",
			"كالمنزل",
			"والمنزل",
			"فالمنزل",
			"سالمنزل",
			"أالمنزل",
			"الالمنزل",
			"وبالمنزل",
			"ولالمنزل",
			"للالمنزل",
			"فسالمنزل",
			"فبالمنزل",
			"فلالمنزل",
			"وسالمنزل",
			"والالمنزل",
			"بالالمنزل",
			"فالالمنزل",
			"كالالمنزل",
			"وللالمنزل",
			"وبالالمنزل",
			// De-prefixed form:
			"منزل",
			// Other prefixed forms based on de-prefixed form:
			"لمنزل",
			"بمنزل",
			"كمنزل",
			"ومنزل",
			"فمنزل",
			"سمنزل",
			"أمنزل",
			"المنزل",
			"وبمنزل",
			"ولمنزل",
			"للمنزل",
			"فسمنزل",
			"فبمنزل",
			"فلمنزل",
			"وسمنزل",
			"والمنزل",
			"بالمنزل",
			"فالمنزل",
			"كالمنزل",
			"وللمنزل",
			"وبالمنزل",
		],
	  },
	  /*
	   * Prefix ك "like, as"
	   * Like a bird "كطائر"
	   * Bird "طائر"
	   */
	  {
		original: "كطائر",
		forms: [
			// Prefixed forms based on original:
			"لكطائر",
			"بكطائر",
			"ككطائر",
			"وكطائر",
			"فكطائر",
			"سكطائر",
			"أكطائر",
			"الكطائر",
			"وبكطائر",
			"ولكطائر",
			"للكطائر",
			"فسكطائر",
			"فبكطائر",
			"فلكطائر",
			"وسكطائر",
			"والكطائر",
			"بالكطائر",
			"فالكطائر",
			"كالكطائر",
			"وللكطائر",
			"وبالكطائر",
			// De-prefixed form:
			"طائر",
			// Other prefixed forms based on de-prefixed form:
			"لطائر",
			"بطائر",
			"كطائر",
			"وطائر",
			"فطائر",
			"سطائر",
			"أطائر",
			"الطائر",
			"وبطائر",
			"ولطائر",
			"للطائر",
			"فسطائر",
			"فبطائر",
			"فلطائر",
			"وسطائر",
			"والطائر",
			"بالطائر",
			"فالطائر",
			"كالطائر",
			"وللطائر",
			"وبالطائر",
		],
	  },
	  /*
	   * Prefix و "and"
	   * And key "ومفتاح"
	   * Key "مفتاح"
	   */
	  {
		original: "ومفتاح",
		forms: [
			// Prefixed forms based on original:
			"لومفتاح",
			"بومفتاح",
			"كومفتاح",
			"وومفتاح",
			"فومفتاح",
			"سومفتاح",
			"أومفتاح",
			"الومفتاح",
			"وبومفتاح",
			"ولومفتاح",
			"للومفتاح",
			"فسومفتاح",
			"فبومفتاح",
			"فلومفتاح",
			"وسومفتاح",
			"والومفتاح",
			"بالومفتاح",
			"فالومفتاح",
			"كالومفتاح",
			"وللومفتاح",
			"وبالومفتاح",
			// De-prefixed form:
			"مفتاح",
			// Other prefixed forms based on de-prefixed form:
			"لمفتاح",
			"بمفتاح",
			"كمفتاح",
			"ومفتاح",
			"فمفتاح",
			"سمفتاح",
			"أمفتاح",
			"المفتاح",
			"وبمفتاح",
			"ولمفتاح",
			"للمفتاح",
			"فسمفتاح",
			"فبمفتاح",
			"فلمفتاح",
			"وسمفتاح",
			"والمفتاح",
			"بالمفتاح",
			"فالمفتاح",
			"كالمفتاح",
			"وللمفتاح",
			"وبالمفتاح",
		],
	  },
	  /*
       * Prefix ف "so, then"
       * So I answered you "فأجبتك"
       * I answered you "أجبتك"
       */
	  {
		original: "فأجبتك",
		forms: [
			// Prefixed forms based on original:
			"لفأجبتك",
			"بفأجبتك",
			"كفأجبتك",
			"وفأجبتك",
			"ففأجبتك",
			"سفأجبتك",
			"أفأجبتك",
			"الفأجبتك",
			"وبفأجبتك",
			"ولفأجبتك",
			"للفأجبتك",
			"فسفأجبتك",
			"فبفأجبتك",
			"فلفأجبتك",
			"وسفأجبتك",
			"والفأجبتك",
			"بالفأجبتك",
			"فالفأجبتك",
			"كالفأجبتك",
			"وللفأجبتك",
			"وبالفأجبتك",
			// De-prefixed form:
			"أجبتك",
			// Other prefixed forms based on de-prefixed form:
			"لأجبتك",
			"بأجبتك",
			"كأجبتك",
			"وأجبتك",
			"فأجبتك",
			"سأجبتك",
			"أأجبتك",
			"الأجبتك",
			"وبأجبتك",
			"ولأجبتك",
			"للأجبتك",
			"فسأجبتك",
			"فبأجبتك",
			"فلأجبتك",
			"وسأجبتك",
			"والأجبتك",
			"بالأجبتك",
			"فالأجبتك",
			"كالأجبتك",
			"وللأجبتك",
			"وبالأجبتك",
		],
	  },
	  /*
       * Prefix س "will, being willing"
       * He will write "سيكتب"
       * He writes "يكتب"
       */
	  {
		original: "سيكتب",
		forms: [
			// Prefixed forms based on original:
			"لسيكتب",
			"بسيكتب",
			"كسيكتب",
			"وسيكتب",
			"فسيكتب",
			"سسيكتب",
			"أسيكتب",
			"السيكتب",
			"وبسيكتب",
			"ولسيكتب",
			"للسيكتب",
			"فسسيكتب",
			"فبسيكتب",
			"فلسيكتب",
			"وسسيكتب",
			"والسيكتب",
			"بالسيكتب",
			"فالسيكتب",
			"كالسيكتب",
			"وللسيكتب",
			"وبالسيكتب",
			// De-prefixed form:
			"يكتب",
			// Other prefixed forms based on de-prefixed form:
			"ليكتب",
			"بيكتب",
			"كيكتب",
			"ويكتب",
			"فيكتب",
			"سيكتب",
			"أيكتب",
			"اليكتب",
			"وبيكتب",
			"وليكتب",
			"لليكتب",
			"فسيكتب",
			"فبيكتب",
			"فليكتب",
			"وسيكتب",
			"واليكتب",
			"باليكتب",
			"فاليكتب",
			"كاليكتب",
			"ولليكتب",
			"وباليكتب",
		],
	  },
	  /*
       * Prefix أ "Questioning prefix"
       * Did you eat? "أأكلت"
       * You ate "أكلت"
       */
	  {
		original: "أأكلت",
		forms: [
			// Prefixed forms based on original:
			"لأأكلت",
			"بأأكلت",
			"كأأكلت",
			"وأأكلت",
			"فأأكلت",
			"سأأكلت",
			"أأأكلت",
			"الأأكلت",
			"وبأأكلت",
			"ولأأكلت",
			"للأأكلت",
			"فسأأكلت",
			"فبأأكلت",
			"فلأأكلت",
			"وسأأكلت",
			"والأأكلت",
			"بالأأكلت",
			"فالأأكلت",
			"كالأأكلت",
			"وللأأكلت",
			"وبالأأكلت",
			// De-prefixed form:
			"أكلت",
			// Other prefixed forms based on de-prefixed form:
			"لأكلت",
			"بأكلت",
			"كأكلت",
			"وأكلت",
			"فأكلت",
			"سأكلت",
			"أأكلت",
			"الأكلت",
			"وبأكلت",
			"ولأكلت",
			"للأكلت",
			"فسأكلت",
			"فبأكلت",
			"فلأكلت",
			"وسأكلت",
			"والأكلت",
			"بالأكلت",
			"فالأكلت",
			"كالأكلت",
			"وللأكلت",
			"وبالأكلت",
		],
	  },
	/*
	 * Prefix وب "and with"
	 * and with freedom "وبحرية"
	 * freedom "حرية"
	 *
	 */
	{
		original: "وبحرية",
		forms: [
			"لوبحرية",
			"بوبحرية",
			"كوبحرية",
			"ووبحرية",
			"فوبحرية",
			"سوبحرية",
			"أوبحرية",
			"الوبحرية",
			"وبوبحرية",
			"ولوبحرية",
			"للوبحرية",
			"فسوبحرية",
			"فبوبحرية",
			"فلوبحرية",
			"وسوبحرية",
			"والوبحرية",
			"بالوبحرية",
			"فالوبحرية",
			"كالوبحرية",
			"وللوبحرية",
			"وبالوبحرية",
			// De-prefixed form:
			"حرية",
			// Other prefixed forms based on de-prefixed form:
			"لحرية",
			"بحرية",
			"كحرية",
			"وحرية",
			"فحرية",
			"سحرية",
			"أحرية",
			"الحرية",
			"وبحرية",
			"ولحرية",
			"للحرية",
			"فسحرية",
			"فبحرية",
			"فلحرية",
			"وسحرية",
			"والحرية",
			"بالحرية",
			"فالحرية",
			"كالحرية",
			"وللحرية",
			"وبالحرية",
		],
	},
	 /*
      * Prefix لل and (to) for
      * and (to) for freedom "للحرية"
      * freedom "حرية"
      *
      */
	{
		original: "للحرية",
		forms: [
			"لللحرية",
			"بللحرية",
			"كللحرية",
			"وللحرية",
			"فللحرية",
			"سللحرية",
			"أللحرية",
			"الللحرية",
			"وبللحرية",
			"ولللحرية",
			"للللحرية",
			"فسللحرية",
			"فبللحرية",
			"فلللحرية",
			"وسللحرية",
			"والللحرية",
			"بالللحرية",
			"فالللحرية",
			"كالللحرية",
			"وللللحرية",
			"وبالللحرية",
			// De-prefixed form:
			"حرية",
			// Other prefixed forms based on de-prefixed form:
			"لحرية",
			"بحرية",
			"كحرية",
			"وحرية",
			"فحرية",
			"سحرية",
			"أحرية",
			"الحرية",
			"وبحرية",
			"ولحرية",
			"للحرية",
			"فسحرية",
			"فبحرية",
			"فلحرية",
			"وسحرية",
			"والحرية",
			"بالحرية",
			"فالحرية",
			"كالحرية",
			"وللحرية",
			"وبالحرية",
		],
	},
	/*
      * Prefix فس "then will"
      * then [we] will write "فسنكتب"
      * [we] write "نكتب"
      *
      */
	{
		original: "فسنكتب",
		forms: [
			"لفسنكتب",
			"بفسنكتب",
			"كفسنكتب",
			"وفسنكتب",
			"ففسنكتب",
			"سفسنكتب",
			"أفسنكتب",
			"الفسنكتب",
			"وبفسنكتب",
			"ولفسنكتب",
			"للفسنكتب",
			"فسفسنكتب",
			"فبفسنكتب",
			"فلفسنكتب",
			"وسفسنكتب",
			"والفسنكتب",
			"بالفسنكتب",
			"فالفسنكتب",
			"كالفسنكتب",
			"وللفسنكتب",
			"وبالفسنكتب",
			// De-prefixed form:
			"نكتب",
			// Other prefixed forms based on de-prefixed form:
			"لنكتب",
			"بنكتب",
			"كنكتب",
			"ونكتب",
			"فنكتب",
			"سنكتب",
			"أنكتب",
			"النكتب",
			"وبنكتب",
			"ولنكتب",
			"للنكتب",
			"فسنكتب",
			"فبنكتب",
			"فلنكتب",
			"وسنكتب",
			"والنكتب",
			"بالنكتب",
			"فالنكتب",
			"كالنكتب",
			"وللنكتب",
			"وبالنكتب",
		],
	},
	/*
     * Prefix وس "and will"
     * and [he] will choose "وسيخبار"
     * [he] choose "يخبار"
     *
     */
	{
		original: "وسيخبار",
		forms: [
			"لوسيخبار",
			"بوسيخبار",
			"كوسيخبار",
			"ووسيخبار",
			"فوسيخبار",
			"سوسيخبار",
			"أوسيخبار",
			"الوسيخبار",
			"وبوسيخبار",
			"ولوسيخبار",
			"للوسيخبار",
			"فسوسيخبار",
			"فبوسيخبار",
			"فلوسيخبار",
			"وسوسيخبار",
			"والوسيخبار",
			"بالوسيخبار",
			"فالوسيخبار",
			"كالوسيخبار",
			"وللوسيخبار",
			"وبالوسيخبار",
			// De-prefixed form:
			"يخبار",
			// Other prefixed forms based on de-prefixed form:
			"ليخبار",
			"بيخبار",
			"كيخبار",
			"ويخبار",
			"فيخبار",
			"سيخبار",
			"أيخبار",
			"اليخبار",
			"وبيخبار",
			"وليخبار",
			"لليخبار",
			"فسيخبار",
			"فبيخبار",
			"فليخبار",
			"وسيخبار",
			"واليخبار",
			"باليخبار",
			"فاليخبار",
			"كاليخبار",
			"ولليخبار",
			"وباليخبار",
		],
	},
	/*
 	* Prefix وال "and the"
	* and the hat "والقبعة"
	* hat "قبعة"
	*
 	*/
	{
		original: "والقبعة",
		forms: [
			"لوالقبعة",
			"بوالقبعة",
			"كوالقبعة",
			"ووالقبعة",
			"فوالقبعة",
			"سوالقبعة",
			"أوالقبعة",
			"الوالقبعة",
			"وبوالقبعة",
			"ولوالقبعة",
			"للوالقبعة",
			"فسوالقبعة",
			"فبوالقبعة",
			"فلوالقبعة",
			"وسوالقبعة",
			"والوالقبعة",
			"بالوالقبعة",
			"فالوالقبعة",
			"كالوالقبعة",
			"وللوالقبعة",
			"وبالوالقبعة",
			// De-prefixed form:
			"قبعة",
			// Other prefixed forms based on de-prefixed form:
			"لقبعة",
			"بقبعة",
			"كقبعة",
			"وقبعة",
			"فقبعة",
			"سقبعة",
			"أقبعة",
			"القبعة",
			"وبقبعة",
			"ولقبعة",
			"للقبعة",
			"فسقبعة",
			"فبقبعة",
			"فلقبعة",
			"وسقبعة",
			"والقبعة",
			"بالقبعة",
			"فالقبعة",
			"كالقبعة",
			"وللقبعة",
			"وبالقبعة",
		],
	},
	/*
	* Prefix ول "and to (for)"
	* and to mothers "ولأمهات"
	* mothers "أمهات"
	*
 	*/
	{
		original: "ولأمهات",
		forms: [
			"لولأمهات",
			"بولأمهات",
			"كولأمهات",
			"وولأمهات",
			"فولأمهات",
			"سولأمهات",
			"أولأمهات",
			"الولأمهات",
			"وبولأمهات",
			"ولولأمهات",
			"للولأمهات",
			"فسولأمهات",
			"فبولأمهات",
			"فلولأمهات",
			"وسولأمهات",
			"والولأمهات",
			"بالولأمهات",
			"فالولأمهات",
			"كالولأمهات",
			"وللولأمهات",
			"وبالولأمهات",
			// De-prefixed form:
			"أمهات",
			// Other prefixed forms based on de-prefixed form:
			"لأمهات",
			"بأمهات",
			"كأمهات",
			"وأمهات",
			"فأمهات",
			"سأمهات",
			"أأمهات",
			"الأمهات",
			"وبأمهات",
			"ولأمهات",
			"للأمهات",
			"فسأمهات",
			"فبأمهات",
			"فلأمهات",
			"وسأمهات",
			"والأمهات",
			"بالأمهات",
			"فالأمهات",
			"كالأمهات",
			"وللأمهات",
			"وبالأمهات",
		],
	},
	/*
	* Prefix وبال "and with the"
	* and with the bird "وبالطائر"
	* bird "طائر"
	*
	*/
	{
		original: "وبالطائر",
		forms: [
			// Prefixed forms based on original:
			"لوبالطائر",
			"بوبالطائر",
			"كوبالطائر",
			"ووبالطائر",
			"فوبالطائر",
			"سوبالطائر",
			"أوبالطائر",
			"الوبالطائر",
			"وبوبالطائر",
			"ولوبالطائر",
			"للوبالطائر",
			"فسوبالطائر",
			"فبوبالطائر",
			"فلوبالطائر",
			"وسوبالطائر",
			"والوبالطائر",
			"بالوبالطائر",
			"فالوبالطائر",
			"كالوبالطائر",
			"وللوبالطائر",
			"وبالوبالطائر",
			// De-prefixed form:
			"طائر",
			// Other prefixed forms based on de-prefixed form:
			"لطائر",
			"بطائر",
			"كطائر",
			"وطائر",
			"فطائر",
			"سطائر",
			"أطائر",
			"الطائر",
			"وبطائر",
			"ولطائر",
			"للطائر",
			"فسطائر",
			"فبطائر",
			"فلطائر",
			"وسطائر",
			"والطائر",
			"بالطائر",
			"فالطائر",
			"كالطائر",
			"وللطائر",
			"وبالطائر",
		],
	},
	/*
	* Prefix فال "then the"
	* hat "قبعة"
	* then the hat "فالقبعة"
	*/
	{
		original: "فالقبعة",
		forms: [
			"لفالقبعة",
			"بفالقبعة",
			"كفالقبعة",
			"وفالقبعة",
			"ففالقبعة",
			"سفالقبعة",
			"أفالقبعة",
			"الفالقبعة",
			"وبفالقبعة",
			"ولفالقبعة",
			"للفالقبعة",
			"فسفالقبعة",
			"فبفالقبعة",
			"فلفالقبعة",
			"وسفالقبعة",
			"والفالقبعة",
			"بالفالقبعة",
			"فالفالقبعة",
			"كالفالقبعة",
			"وللفالقبعة",
			"وبالفالقبعة",
			// De-prefixed form:
			"قبعة",
			// Other prefixed forms based on de-prefixed form:
			"لقبعة",
			"بقبعة",
			"كقبعة",
			"وقبعة",
			"فقبعة",
			"سقبعة",
			"أقبعة",
			"القبعة",
			"وبقبعة",
			"ولقبعة",
			"للقبعة",
			"فسقبعة",
			"فبقبعة",
			"فلقبعة",
			"وسقبعة",
			"والقبعة",
			"بالقبعة",
			"فالقبعة",
			"كالقبعة",
			"وللقبعة",
			"وبالقبعة",
		],
	},
	/*
	* Prefix ولل "and to (for) the"
	* hat "قبعة"
	* and to (for) the hat "وللقبعة"
	*/
	{
		original: "وللقبعة",
		forms: [
			// Prefixed forms based on original:
			"لوللقبعة",
			"بوللقبعة",
			"كوللقبعة",
			"ووللقبعة",
			"فوللقبعة",
			"سوللقبعة",
			"أوللقبعة",
			"الوللقبعة",
			"وبوللقبعة",
			"ولوللقبعة",
			"للوللقبعة",
			"فسوللقبعة",
			"فبوللقبعة",
			"فلوللقبعة",
			"وسوللقبعة",
			"والوللقبعة",
			"بالوللقبعة",
			"فالوللقبعة",
			"كالوللقبعة",
			"وللوللقبعة",
			"وبالوللقبعة",
			// De-prefixed form:
			"قبعة",
			// Other prefixed forms based on de-prefixed form:
			"لقبعة",
			"بقبعة",
			"كقبعة",
			"وقبعة",
			"فقبعة",
			"سقبعة",
			"أقبعة",
			"القبعة",
			"وبقبعة",
			"ولقبعة",
			"للقبعة",
			"فسقبعة",
			"فبقبعة",
			"فلقبعة",
			"وسقبعة",
			"والقبعة",
			"بالقبعة",
			"فالقبعة",
			"كالقبعة",
			"وللقبعة",
			"وبالقبعة",
		],
	},
	/*
	* Prefix  كال "as the"
	* hat "قبعة"
	* as the hat "كالقبعة"
	*/
	{
		original: "كالقبعة",
		forms: [
			// Prefixed forms based on original:
			"لكالقبعة",
			"بكالقبعة",
			"ككالقبعة",
			"وكالقبعة",
			"فكالقبعة",
			"سكالقبعة",
			"أكالقبعة",
			"الكالقبعة",
			"وبكالقبعة",
			"ولكالقبعة",
			"للكالقبعة",
			"فسكالقبعة",
			"فبكالقبعة",
			"فلكالقبعة",
			"وسكالقبعة",
			"والكالقبعة",
			"بالكالقبعة",
			"فالكالقبعة",
			"كالكالقبعة",
			"وللكالقبعة",
			"وبالكالقبعة",
			// De-prefixed form:
			"قبعة",
			// Other prefixed forms based on de-prefixed form:
			"لقبعة",
			"بقبعة",
			"كقبعة",
			"وقبعة",
			"فقبعة",
			"سقبعة",
			"أقبعة",
			"القبعة",
			"وبقبعة",
			"ولقبعة",
			"للقبعة",
			"فسقبعة",
			"فبقبعة",
			"فلقبعة",
			"وسقبعة",
			"والقبعة",
			"بالقبعة",
			"فالقبعة",
			"كالقبعة",
			"وللقبعة",
			"وبالقبعة",
		],
	},
	/*
	* Prefix ولل "and for the"
	* freedom "حرية"
	* and for the freedom "وللحرية"
	*/
	{
		original: "وللحرية",
		forms: [
			// Prefixed forms based on original:
			"لوللحرية",
			"بوللحرية",
			"كوللحرية",
			"ووللحرية",
			"فوللحرية",
			"سوللحرية",
			"أوللحرية",
			"الوللحرية",
			"وبوللحرية",
			"ولوللحرية",
			"للوللحرية",
			"فسوللحرية",
			"فبوللحرية",
			"فلوللحرية",
			"وسوللحرية",
			"والوللحرية",
			"بالوللحرية",
			"فالوللحرية",
			"كالوللحرية",
			"وللوللحرية",
			"وبالوللحرية",
			// De-prefixed form:
			"حرية",
			// Other prefixed forms based on de-prefixed form:
			"لحرية",
			"بحرية",
			"كحرية",
			"وحرية",
			"فحرية",
			"سحرية",
			"أحرية",
			"الحرية",
			"وبحرية",
			"ولحرية",
			"للحرية",
			"فسحرية",
			"فبحرية",
			"فلحرية",
			"وسحرية",
			"والحرية",
			"بالحرية",
			"فالحرية",
			"كالحرية",
			"وللحرية",
			"وبالحرية",
		],
	},
	// A word with a beginning that looks like a valid prefix, e.g "فرقان" (differences)
	{
		original: "فرقان",
		forms: [
			// Prefixed forms based on original:
			"لفرقان",
			"بفرقان",
			"كفرقان",
			"وفرقان",
			"ففرقان",
			"سفرقان",
			"أفرقان",
			"الفرقان",
			"وبفرقان",
			"ولفرقان",
			"للفرقان",
			"فسفرقان",
			"فبفرقان",
			"فلفرقان",
			"وسفرقان",
			"والفرقان",
			"بالفرقان",
			"فالفرقان",
			"كالفرقان",
			"وللفرقان",
			"وبالفرقان",
			// De-prefixed form:
			"رقان",
			// Other prefixed forms based on de-prefixed form:
			"لرقان",
			"برقان",
			"كرقان",
			"ورقان",
			"فرقان",
			"سرقان",
			"أرقان",
			"الرقان",
			"وبرقان",
			"ولرقان",
			"للرقان",
			"فسرقان",
			"فبرقان",
			"فلرقان",
			"وسرقان",
			"والرقان",
			"بالرقان",
			"فالرقان",
			"كالرقان",
			"وللرقان",
			"وبالرقان",
		],
	},

	// When a word doesn't start with one of the prefixes, the stemmer only creates prefixed words based on the original:
	{
		original: "قط",
		forms: [
			// Prefixed forms based on original:
			"لقط",
			"بقط",
			"كقط",
			"وقط",
			"فقط",
			"سقط",
			"أقط",
			"القط",
			"وبقط",
			"ولقط",
			"للقط",
			"فسقط",
			"فبقط",
			"فلقط",
			"وسقط",
			"والقط",
			"بالقط",
			"فالقط",
			"كالقط",
			"وللقط",
			"وبالقط",
		],
	},
];

describe( "Test for creating basic word forms for Arabic words", () => {
	it( "creates basic word forms for an Arabic word", () => {
		wordsToStem.forEach( wordToStem => expect( createBasicWordForms( wordToStem.original ) ).toEqual( wordToStem.forms ) );
	} );
} );
