<?php
/**
 * A helper object for the rel "next" and "prev" meta tags.
 *
 * @package Yoast\WP\Free\Helpers
 */

namespace Yoast\WP\Free\Helpers;

use Yoast\WP\Free\Wrappers\WP_Rewrite_Wrapper;

/**
 * Class Rel_Adjacent_Helper
 */
class Rel_Adjacent_Helper {

	/**
	 * Holds the WP rewrite wrapper instance.
	 *
	 * @var WP_Rewrite_Wrapper WP_Rewrite wrapper.
	 */
	private $wp_rewrite_wrapper;

	/**
	 * Rel_Adjacent_Helper constructor.
	 *
	 * @param WP_Rewrite_Wrapper $wp_rewrite_wrapper The rewrite wrapper.
	 *
	 * @codeCoverageIgnore
	 */
	public function __construct( WP_Rewrite_Wrapper $wp_rewrite_wrapper ) {
		$this->wp_rewrite_wrapper = $wp_rewrite_wrapper;
	}

	/**
	 * Checks whether adjacent rel links are disabled.
	 *
	 * @return bool Whether adjacent rel links are disabled or not.
	 */
	public function is_disabled() {
		/**
		 * Filter: 'wpseo_disable_adjacent_rel_links' - Allows disabling of Yoast adjacent links if this is being handled by other code.
		 *
		 * @api bool $links_generated Indicates if other code has handled adjacent links.
		 */
		return \apply_filters( 'wpseo_disable_adjacent_rel_links', false );
	}

	/**
	 * Builds a paginated URL.
	 *
	 * @param string $url                   The un-paginated URL of the current archive.
	 * @param string $page                  The page number to add on to $url for the $link tag.
	 * @param bool   $add_pagination_base   Optional. Whether to add the pagination base (`page`) to the url.
	 * @param string $pagination_query_name Optional. The name of the query argument that holds the current page.
	 *
	 * @return string The paginated URL.
	 */
	public function get_paginated_url( $url, $page, $add_pagination_base = true, $pagination_query_name = 'page' ) {
		$wp_rewrite = $this->wp_rewrite_wrapper->get();

		if ( $wp_rewrite->using_permalinks() ) {
			$url = \trailingslashit( $url );
			if ( $add_pagination_base ) {
				$url .= \trailingslashit( $wp_rewrite->pagination_base );
			}

			return \user_trailingslashit( $url . $page );
		}

		return \add_query_arg( $pagination_query_name, $page, \user_trailingslashit( $url ) );
	}
}
