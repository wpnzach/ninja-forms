<?php if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Adds Ninja Forms widget.
 */
class NF_FormBlock {
	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		add_action( 'ninja_forms_loaded', array($this, 'nf_form_block_load' ) );
	}

	function nf_form_block_load() {
		add_action( 'enqueue_block_editor_assets', array ( $this, 'nf_form_block' ) );
	}

	function nf_form_block() {

		$js_dir  = Ninja_Forms::$url . 'assets/js/min/';

		wp_enqueue_script(
			'nf-block',
			$js_dir . 'block.js',
			array( 'wp-blocks', 'wp-element' )
		);

		$forms = Ninja_Forms()->form()->get_forms();

		$nf_forms = array();

		foreach ( $forms as $nf_form ) {
			$tmpArray = array( 'id' => $nf_form->get_id(), 'title' =>
				$nf_form->get_setting( 'title' ) );
			$nf_forms[] = $tmpArray;
		}

		wp_localize_script( 'nf-block', 'ninja_forms', $nf_forms );
	}
}
