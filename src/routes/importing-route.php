<?php

namespace Yoast\WP\SEO\Routes;

use WP_Error;
use WP_REST_Response;
use Yoast\WP\SEO\Actions\Importing\Importing_Action_Interface;
use Yoast\WP\SEO\Conditionals\No_Conditionals;
use Yoast\WP\SEO\Main;
use Yoast\WP\SEO\Services\Importing\Importer_Action_Filter_Trait;

/**
 * Importing_Route class.
 *
 * Importing route for importing from other SEO plugins.
 */
class Importing_Route extends Abstract_Action_Route {

	use No_Conditionals;

	use Importer_Action_Filter_Trait;

	/**
	 * The import route constant.
	 *
	 * @var string
	 */
	const ROUTE = '/import/(?P<plugin>[\w-]+)/(?P<type>[\w-]+)';

	/**
	 * List of available importers.
	 *
	 * @var Importing_Action_Interface[]
	 */
	protected $importers = [];

	/**
	 * Importing_Route constructor.
	 *
	 * @param Importing_Action_Interface ...$importers All available importers.
	 */
	public function __construct( Importing_Action_Interface ...$importers ) {
		$this->importers = $importers;
	}

	/**
	 * Registers routes with WordPress.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			Main::API_V1_NAMESPACE,
			self::ROUTE,
			[
				'callback'            => [ $this, 'execute' ],
				'permission_callback' => [ $this, 'is_user_permitted_to_import' ],
				'methods'             => [ 'POST' ],
			]
		);
	}

	/**
	 * Executes the rest request.
	 *
	 * @param mixed $data The request parameters.
	 *
	 * @return WP_REST_Response|false Response or false on non-existent route.
	 */
	public function execute( $data ) {
		$plugin = (string) $data['plugin'];
		$type   = (string) $data['type'];

		$next_url = $this->get_endpoint( $plugin, $type );

		try {
			$importer = $this->get_importer( $plugin, $type );

			if ( $importer === false ) {
				return new WP_Error(
					'rest_no_route',
					'Requested importer not found',
					[
						'status' => 404,
					]
				);
			}

			$result = $importer->index();

			if ( $result === false || count( $result ) === 0 ) {
				$next_url = false;
			}

			return $this->respond_with(
				$result,
				$next_url
			);
		} catch ( \Exception $exception ) {
			return new WP_Error(
				'wpseo_error_indexing',
				$exception->getMessage(),
				[ 'stackTrace' => $exception->getTraceAsString() ]
			);
		}
	}

	/**
	 * Gets the right importer for the given arguments.
	 *
	 * @param string $plugin The plugin to import from.
	 * @param string $type   The type of entity to import.
	 *
	 * @return Importing_Action_Interface|false The importer, or false if no importer was found.
	 */
	protected function get_importer( $plugin, $type ) {
		$importers = $this->filter_actions( $this->importers, $plugin, $type );

		if ( count( $importers ) !== 1 ) {
			return false;
		}

		return \current( $importers );
	}

	/**
	 * Gets the right endpoint for the given arguments.
	 *
	 * @param string $plugin The plugin to import from.
	 * @param string $type   The type of entity to import.
	 *
	 * @return string|false The endpoint for the given action or false on failure of finding the one.
	 */
	public function get_endpoint( $plugin, $type ) {
		if ( empty( $plugin ) || empty( $type ) ) {
			return false;
		}

		return Main::API_V1_NAMESPACE . "/import/{$plugin}/{$type}";
	}

	/**
	 * Whether or not the current user is allowed to import.
	 *
	 * @return bool Whether or not the current user is allowed to import.
	 */
	public function is_user_permitted_to_import() {
		return \current_user_can( 'edit_posts' );
	}
}
