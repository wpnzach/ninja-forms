// block.js
( function( blocks, element ) {
	var el = element.createElement,
		source = blocks.source;

	blocks.registerBlockType( 'ninja-forms/forms', {
		title: 'Ninja Forms',
		icon: 'edit',
		category: 'widgets',
		attributes: {
			nf_form_id: {
				type: 'string',
				source: source.children( 'div' ),
				default: ''
			},
		},

		edit: function( props ) {
			var nf_form_id = '',
				children,
				options;

			function setFormId( event ) {
				var selected = event.target.querySelector( 'option:checked' );

				props.setAttributes( { nf_form_id: "[ninja_form id=" + selected.value + "]" } );
				event.preventDefault();
			}

			function getElementValue( props ) {
				var tmpVal = props.attributes.nf_form_id;

				// Get the actual id value from the short code string
				if( 0 < tmpVal.length ) {
					tmpVal = tmpVal.split( '=' )[1];
					tmpVal = tmpVal.substring( 0, tmpVal.length - 1 );
				}

				return tmpVal;
			}

			children = [];

			children.push(el('label', {for: 'nf_form_id'}, 'Ninja Form'));

			options = [];

			options.push( el( 'option', null, '- Select -' ) );

			_.each( ninja_forms, function( nf_form ) {
				options.push( el( 'option' , { value: nf_form.id }, nf_form.title + " (ID: " + nf_form.id + ")" ) );

			});

			children.push( el( 'select', {
						name: 'nf_form_id',
						id: 'nf_form_id',
						value: getElementValue( props ),
						onChange: setFormId
					},
					options
				)
			);

			var form = el( 'form', { onSubmit: setFormId }, children );

			return el( 'div', { class: 'wp-block-shortcode' }, form );
		},

		save: function( props ) {
			return "<div>" + props.attributes.nf_form_id + "</div>";
		}
	} );
} )(
	window.wp.blocks,
	window.wp.element
);