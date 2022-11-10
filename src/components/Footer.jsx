import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

function Footer() {
	const { t: i18n } = useTranslation();
	return (
		<>
			<div className="wrapper footer-wrapper" style={{ bottom: 0 }}>
				<footer className="grid-container">
					<div
						className="grid-50 tablet-grid-50 mobile-grid-100"
						id="footerLeft">
						<div className="footerLinks"></div>
						<div className="">
							© 2022 Knowledge Factor, Inc. All rights reserved.
						</div>
					</div>
					<div
						className="grid-50 tablet-grid-50 mobile-grid-100"
						id="footerRight">
						<div className="appLinks"></div>
						<div className="poweredBy">
							<img
								className="gwt-Image"
								alt="Powered By Amplifire"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAAAUCAYAAAC53B5UAAADjElEQVR42u1aO67qMBBlCbCD6K0A6W4gxV1AGvpU1OloU1K6paNORU+TBVBkA5FYAfIOcpP3xtzD4LHNP/AykkXwL/bM8ZnxwGj0htI0TdqWaPTm0u5h2payK6xedW3CvpUZg32kMR8v7aa/mn+yZPWdguIP2F9M+2ssdRw46+ZcYgBPJ5sBJP8BSKg+acuYMY6RPQEmRzZtnzMcc++FLujlW/rctWVCZQuLW1L/VVsObOx3W+bs+QDzTsDgW1c/eEcDbReDhBQbX6o417zX0LlrjAQSwc0Yia6081ga650TDD2j0lDdygKABfTp6msypOnfff9D7SsCR1e3BJAU9F6pn+1dwSAh36wZLVedoj1G2LMxJQHNxA1B83UKp5Numy8OcDcpj1OINXCek5gExijLPGtYf87eXfrWyEHyRcZqyFg7YIwJY5MDgGhFLFDT88ziOwsAyYLmkPotYT3B7oZOStW4peTMIvh6I9pibJTUAjbtWUPuAUnuqhNikpzHMcKYHA6SS5SLSeY+JqExBQGlpnbjGmYEqL8gor5zYg0OEqmfjdlCQIKnQsEpSxh4lEDja2KNsUXBmuaJ6FNz+qc2zdcgjIlvAEkMZRwIEk0xS0SfJ8xBe+Z6SmwgOcYGYMSzmAQMigavDetAu5mvJmOfgETqR/VbiFMOPpCgsvGksjGVxbAb4z4s/TdWhf0C74RN2OnMhJhA4/uuAYmwNx9IUFfadRMCPWmru3mjWwEHiVHI3jEm4UYH9lEOxUuG4RReBqwhwzmfBRLhlhT5guljnw8BSWnLLVxg2PyOIFl7blzcbTwaJKXgXkPkfdMMFpBsfCAhun8GSDYhV94XgSR5O5BQvFHc0d1oB41mTwLJXsrN8DlfAJKpFGf1mRHuBZLIc82dstvFI0FidTlsDeUrQMIC08qiJ0wjlH0CyQ5uOJhAMzenrn0XcAXOWeo6J/ZQjnzBo0BiwJoRxfM1TF8IkpjpKaM6xXJC016BBMBwgCv1DrKyi5CMqydJtH4SSCpPci69JZl2K0gCkn7alZ1+qbuBTOsEblwF5l8C0/IxKaiEtHQCisshmWV+dk8FRZYS7cL8KQccpOYrYBXF4yXbXwWEtLxvLa60vHL8fKCY+1G9+wuGhUlqlo09y7b29VdgFysNcp+Y5JjWh7ZCyt8MIBlkJAWsA0gGQYWbG87c4YOjnq05xXjnk+QHfBmjDQL/p0kAAAAASUVORK5CYII="
							/>
						</div>
					</div>
				</footer>
			</div>
			<CookieConsent
				cookieName="cookie_message_accepted"
				expires={3650}
				disableStyles="true"
				containerClasses="cookie-container"
				contentClasses="cookie-content"
				buttonClasses="cookie-button"
				buttonText="I ACCEPT">
				<p>
					{i18n('cookiesMessage')}
					<a
						className="white-text"
						href="https://amplifire.com/privacy-policy/"
						target="_blank"
						rel="noopener noreferrer">
						{i18n('privacyPolicy')}
					</a>
					and
					<a
						className="white-text"
						href="https://amplifire.com/terms-and-conditions/"
						target="_blank"
						rel="noopener noreferrer">
						{i18n('termsAndConditions')}
					</a>
				</p>
			</CookieConsent>
		</>
	);
}

export default Footer;
