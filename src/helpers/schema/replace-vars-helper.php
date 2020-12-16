<?php

namespace Yoast\WP\SEO\Helpers\Schema;

use WPSEO_Replace_Vars;
use Yoast\WP\SEO\Conditionals\No_Conditionals;
use Yoast\WP\SEO\Config\Schema_IDs;
use Yoast\WP\SEO\Memoizers\Meta_Tags_Context_Memoizer;
use Yoast\WP\SEO\Presentations\Indexable_Presentation;

/**
 * Registers the Schema replace variables and exposes a method to replace variables on a Schema graph.
 */
class Replace_Vars_Helper {

	use No_Conditionals;

	/**
	 * The meta tags context memoizer.
	 *
	 * @var Meta_Tags_Context_Memoizer
	 */
	protected $meta_tags_context_memoizer;

	/**
	 * The replace vars.
	 *
	 * @var WPSEO_Replace_Vars
	 */
	protected $replace_vars;

	/**
	 * The Schema ID helper.
	 *
	 * @var ID_Helper
	 */
	protected $id_helper;

	/**
	 * Schema_Replace_Vars constructor.
	 *
	 * @param Meta_Tags_Context_Memoizer $meta_tags_context_memoizer The meta tags context memoizer.
	 * @param WPSEO_Replace_Vars         $replace_vars               The replace vars.
	 * @param ID_Helper                  $id_helper                  The Schema ID helper.
	 */
	public function __construct(
		Meta_Tags_Context_Memoizer $meta_tags_context_memoizer,
		WPSEO_Replace_Vars $replace_vars,
		ID_Helper $id_helper
	) {
		$this->meta_tags_context_memoizer = $meta_tags_context_memoizer;
		$this->replace_vars               = $replace_vars;
		$this->id_helper                  = $id_helper;
	}

	/**
	 * Replaces the variables.
	 *
	 * @param array                  $schema_data  The Schema data.
	 * @param Indexable_Presentation $presentation The indexable presentation.
	 *
	 * @return array The array with replaced vars.
	 */
	public function replace( array $schema_data, Indexable_Presentation $presentation ) {
		foreach ( $schema_data as $key => $value ) {
			if ( \is_array( $value ) ) {
				$schema_data[ $key ] = $this->replace( $value, $presentation );

				continue;
			}

			$schema_data[ $key ] = $this->replace_vars->replace( $value, $presentation->source );
		}

		return $schema_data;
	}

	/**
	 * Registers the Schema related replace vars.
	 *
	 * @return void
	 */
	public function register_replace_vars() {
		$replace_vars = [
			'main_schema_id'   => function( $context ) {
				return $context->main_schema_id;
			},
			'author_id'        => function( $context ) {
				return $this->id_helper->get_user_schema_id( $context->indexable->author_id, $context );
			},
			'person_id'        => function( $context ) {
				return $context->site_url . Schema_IDs::PERSON_HASH;
			},
			'primary_image_id' => function( $context ) {
				return $context->canonical . Schema_IDs::PRIMARY_IMAGE_HASH;
			},
			'webpage_id'       => function( $context ) {
				return $context->canonical . Schema_IDs::WEBPAGE_HASH;
			},
			'website_id'       => function( $context ) {
				return $context->site_url . Schema_IDs::WEBSITE_HASH;
			},
		];

		foreach ( $replace_vars as $var => $value ) {
			$this->register_replacement( $var, $value, $this->meta_tags_context_memoizer );
		}
	}

	/**
	 * Registers a replace var and its replace function.
	 *
	 * @param string                     $variable                   The replace variable.
	 * @param Callable                   $replace_function           The value that the variable should be replaced with.
	 * @param Meta_Tags_Context_Memoizer $meta_tags_context_memoizer The meta tags context memoizer.
	 */
	protected function register_replacement( $variable, $replace_function, $meta_tags_context_memoizer ) {
		$this->replace_vars->safe_register_replacement(
			$variable,
			static function() use ( $replace_function, $meta_tags_context_memoizer ) {
				$context = $meta_tags_context_memoizer->for_current_page();

				return $replace_function( $context );
			}
		);
	}
}
