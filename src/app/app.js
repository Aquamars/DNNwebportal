import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import Main from './Main'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
	<I18nextProvider i18n={ i18n }>
		<Main />
	</I18nextProvider>,
	document.getElementById('app')
);