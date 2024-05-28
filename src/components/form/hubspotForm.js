import { useEffect } from 'react';

const HubspotForm = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        script.async = true;
        script.onload = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: 'na1',
                    portalId: '43645170',
                    formId: '413867fb-a30d-4415-81e5-61473799df46',
                    target: '#hubspotForm'
                });
            }
        };
        document.body.appendChild(script);
    }, []);
    return <div id="hubspotForm"></div>;
};
export default HubspotForm;