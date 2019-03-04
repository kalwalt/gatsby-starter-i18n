import React from 'react'
import ar from 'react-intl/locale-data/ar'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import es from 'react-intl/locale-data/es'
import it from 'react-intl/locale-data/it'
import { addLocaleData, IntlProvider } from 'react-intl'
import localEng from '../../../../data/en.json'
import localAr from '../../../../data/ar.json'
import localEs from '../../../../data/es.json'
import localDe from '../../../../data/de.json'
import localIt from '../../../../data/it.json'
import { Context } from '../Context'
import Provider from './Provider'
import { Global } from './styles'
import './layout.css'

addLocaleData([...ar, ...en, ...es, ...de, ...it])

const messages = {
	en: localEng,
	ar: localAr,
	es: localEs,
	de: localDe,
	it: localIt
}

const Layout = ({ children, location, i18nMessages }) => (
	<StaticQuery
		query={graphql`
			query LayoutQuery {
				site {
					siteMetadata {
						languages {
							defaultLangKey
							langs
						}
					}
				}
			}
		`}
		render={data => {
	const url = location.pathname;
	const { langs, defaultLangKey } = data.site.siteMetadata.languages;
	const langKey = getCurrentLangKey(langs, defaultLangKey, url);
	const homeLink = `/${langKey}`.replace(`/${defaultLangKey}/`, '/');
	const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url)).map((item) => ({ ...item, link: item.link.replace(`/${defaultLangKey}/`, '/') }));
	<Provider>
		<Context.Consumer>
			{({ lang }) => (
				<IntlProvider locale={langKey} messages={i18nMessages}>
					<Global lang={lang}>
						{children}
					</Global>
				</IntlProvider>
			)
			}
		</Context.Consumer>
	</Provider>
}}
/>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export { Layout }
