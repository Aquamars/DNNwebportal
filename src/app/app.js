import React from 'react';
import ReactDOM from 'react-dom';
// import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import Main from './Main'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(
// 	<AppContainer>
// 		<I18nextProvider i18n={ i18n }>
// 			<Main />
// 		</I18nextProvider>
// 	</AppContainer>,
// 	document.getElementById('app')
// );

const render = Component => {
  ReactDOM.render(
    <AppContainer>
    	<I18nextProvider i18n={ i18n }>
			<Component  />
		</I18nextProvider>
	</AppContainer>,
    document.getElementById('app')
  )
}

render(Main)

// if (module.hot) {
//   module.hot.accept('./Main', () => { render(Main) })
// }

console.log('module.hot:'+module.hot)

if(module.hot) {
    module.hot.accept('./Main', () => {
        const NextApp = require('./Main').default
        render(NextApp)
    })
}
 
// if(module.hot) {
//     module.hot.accept();
// }